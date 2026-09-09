"""
The fleet, over MQTT, from inside the corpus.

claude.ai cannot open an MQTT connection, but it can call an MCP tool here — so
this process holds the broker connection on its behalf. Members publish their
state RETAINED, so a fresh subscriber receives the whole fleet in one burst; no
table, no sync. Blank `mqtt_url` disables the tools entirely.
"""

from __future__ import annotations

import json
import re
import threading
import uuid
from datetime import datetime, timezone
from urllib.parse import urlparse

from . import config

SEGMENT = re.compile(r"^[A-Za-z0-9_-]{1,64}$")
REPLY_RING = 200


def topics(prefix: str) -> dict:
    """The contract, in one place. Anything that changes the wire changes here."""
    return {
        "lwt": f"{prefix}/+/lwt",
        "meta": f"{prefix}/+/meta",
        "status": f"{prefix}/+/status",
        "out": f"{prefix}/+/+/out",
        "inbox": lambda name, room: f"{prefix}/{name}/{room}/in",
    }


_members: dict[str, dict] = {}
_replies: list[dict] = []
_reply_seq = 0
_client = None
_connected = False
_last_error = ""
_lock = threading.Lock()


def fleet_enabled() -> bool:
    return config.setting("mqtt_url").strip() != ""


def fleet_status() -> dict:
    return {"enabled": fleet_enabled(), "connected": _connected, "error": _last_error, "members": len(_members)}


def _prefix() -> str:
    return (config.setting("mqtt_prefix") or "oracle").rstrip("/")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def _upsert(name: str, patch: dict) -> None:
    with _lock:
        current = _members.get(name) or {"name": name, "state": "unknown"}
        current.update({k: v for k, v in patch.items() if v is not None})
        current["seen"] = _now()
        _members[name] = current


def _on_message(topic: str, payload: bytes) -> None:
    global _reply_seq
    parts = topic.split("/")
    if parts[0] != _prefix():
        return
    body = payload.decode("utf-8", "replace")

    if len(parts) == 3 and parts[2] == "lwt" and parts[1]:
        if body == "":
            with _lock:
                _members.pop(parts[1], None)
            return
        state = body.strip().lower()
        if state in ("online", "offline"):
            _upsert(parts[1], {"state": state})
        return

    if len(parts) == 3 and parts[2] == "meta" and parts[1]:
        if body == "":
            return
        try:
            meta = json.loads(body)
            if isinstance(meta, dict):
                _upsert(
                    parts[1],
                    {
                        "host": meta.get("host") if isinstance(meta.get("host"), str) else None,
                        "client": meta.get("client") if isinstance(meta.get("client"), str) else None,
                        "version": meta.get("version") if isinstance(meta.get("version"), str) else None,
                    },
                )
        except ValueError:
            pass
        return

    if len(parts) == 3 and parts[2] == "status" and parts[1]:
        if body == "":
            _upsert(parts[1], {"channel": False})
            return
        try:
            status = json.loads(body)
            if isinstance(status, dict) and isinstance(status.get("online"), bool) and isinstance(status.get("client"), str):
                _upsert(parts[1], {"channel": status["online"], "client": status["client"]})
        except ValueError:
            pass
        return

    if len(parts) == 4 and parts[3] == "out" and parts[1] and parts[2]:
        text = body
        try:
            message = json.loads(body)
            if isinstance(message, dict) and isinstance(message.get("text"), str):
                text = message["text"]
        except ValueError:
            pass
        with _lock:
            _reply_seq += 1
            _replies.append({"seq": _reply_seq, "name": parts[1], "room": parts[2], "text": text, "at": _now()})
            if len(_replies) > REPLY_RING:
                del _replies[: len(_replies) - REPLY_RING]


def start_fleet() -> None:
    """Never raises: a broker that is down must not stop the corpus from serving."""
    global _client, _last_error
    if not fleet_enabled() or _client is not None:
        return
    try:
        import paho.mqtt.client as mqtt
    except ImportError:
        _last_error = "paho-mqtt is not installed (pip install 'arra-memory-lancedb[fleet]')"
        return

    url = urlparse(config.setting("mqtt_url").strip())
    scheme = url.scheme or "mqtt"
    transport = "websockets" if scheme in ("ws", "wss") else "tcp"
    tls = scheme in ("mqtts", "ssl", "wss")
    port = url.port or (443 if scheme == "wss" else 80 if scheme == "ws" else 8883 if tls else 1883)
    t = topics(_prefix())

    client = mqtt.Client(
        mqtt.CallbackAPIVersion.VERSION2,
        client_id=f"arra-memory-{config.setting('instance_name') or 'unnamed'}",
        transport=transport,
    )
    username = config.setting("mqtt_username").strip() or None
    password = config.setting("mqtt_password").strip() or None
    if username:
        client.username_pw_set(username, password)
    if tls:
        client.tls_set()
    client.reconnect_delay_set(min_delay=5, max_delay=5)

    def on_connect(c, userdata, flags, reason_code, properties=None):
        global _connected, _last_error
        _connected = True
        _last_error = ""
        c.subscribe([(t["lwt"], 1), (t["meta"], 1), (t["status"], 1), (t["out"], 1)])

    def on_disconnect(c, userdata, *args):
        global _connected
        _connected = False

    def on_message(c, userdata, message):
        try:
            _on_message(message.topic, message.payload)
        except Exception:
            pass

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.on_message = on_message
    _client = client
    try:
        client.connect_async(url.hostname or "127.0.0.1", port, keepalive=30)
        client.loop_start()
    except Exception as error:
        _last_error = str(error)


def stop_fleet() -> None:
    global _client, _connected
    if _client is not None:
        try:
            _client.loop_stop()
            _client.disconnect()
        except Exception:
            pass
        _client = None
    _connected = False


def list_fleet() -> dict:
    if not fleet_enabled():
        return {"ok": False, "error": "mqtt_url is not set"}
    if not _connected:
        detail = f" ({_last_error})" if _last_error else ""
        return {
            "ok": False,
            "error": f"not connected to the broker{detail} — this means we cannot SEE the fleet, not that it is empty",
        }
    with _lock:
        members = sorted((dict(m) for m in _members.values()), key=lambda m: m["name"])
    return {"ok": True, "members": members}


def send_to_member(name: str, text: str, room: str = "main") -> dict:
    if not fleet_enabled():
        return {"ok": False, "error": "mqtt_url is not set"}
    if _client is None or not _connected:
        return {"ok": False, "error": "not connected to the broker"}
    if not SEGMENT.match(name or ""):
        return {"ok": False, "error": f"invalid name {json.dumps(name)}"}
    if not SEGMENT.match(room or ""):
        return {"ok": False, "error": f"invalid room {json.dumps(room)}"}
    if not (text or "").strip():
        return {"ok": False, "error": "empty message"}
    if len(text) > 8192:
        return {"ok": False, "error": "message too long (max 8192)"}
    with _lock:
        known = name in _members
    if not known:
        return {"ok": False, "error": f"no member named {name} is visible on the broker — call list_fleet to see who is"}
    topic = topics(_prefix())["inbox"](name, room)
    message_id = uuid.uuid4().hex[:16]
    payload = json.dumps({"text": text, "user": config.setting("instance_name") or "arra-memory", "id": message_id})
    try:
        info = _client.publish(topic, payload, qos=1)
        info.wait_for_publish(timeout=10)
        if not info.is_published():
            return {"ok": False, "error": "publish failed: no PUBACK from the broker"}
    except Exception as error:
        return {"ok": False, "error": f"publish failed: {error}"}
    return {"ok": True, "topic": topic, "id": message_id}


def member_replies(name: str | None = None, since: int = 0) -> list[dict]:
    with _lock:
        return [dict(r) for r in _replies if r["seq"] > since and (not name or r["name"] == name)]


def reset_for_tests() -> None:
    global _reply_seq, _last_error
    stop_fleet()
    with _lock:
        _members.clear()
        _replies.clear()
    _reply_seq = 0
    _last_error = ""
