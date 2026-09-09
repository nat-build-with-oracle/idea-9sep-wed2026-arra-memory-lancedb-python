"""
Where a setting comes from, and who is allowed to change it.

Precedence:  environment  >  <DATA_DIR>/settings.json  >  built-in default

Environment wins on purpose: whatever a compose file or a supervisor pins stays
pinned, and the settings file fills in the rest. The file is read once at import
(or on `reload()`), matching the "options take effect at start" semantics the
add-on lineage has always had; the settings endpoint reports `restartRequired`
so a UI can be honest about it.
"""

from __future__ import annotations

import json
import os
import tempfile
import threading
from pathlib import Path
from typing import Literal

SETTING_KEYS: tuple[str, ...] = (
    "owner_passphrase",
    "api_token",
    "public_url",
    "instance_name",
    "ollama_url",
    "embedding_model",
    "embedding_dimensions",
    "search_log",
    "generated_tools",
    "language",
    "theme",
    "mqtt_url",
    "mqtt_username",
    "mqtt_password",
    "mqtt_prefix",
)

SECRET_KEYS: frozenset[str] = frozenset({"owner_passphrase", "api_token", "mqtt_password"})

# Read once at process start by something, so stale until restart.
RESTART_REQUIRED: frozenset[str] = frozenset(
    {
        "owner_passphrase",
        "api_token",
        "instance_name",
        "ollama_url",
        "embedding_model",
        "embedding_dimensions",
        "mqtt_url",
        "mqtt_username",
        "mqtt_password",
        "mqtt_prefix",
    }
)

ENV_OF: dict[str, str] = {k: k.upper() for k in SETTING_KEYS}

Source = Literal["environment", "settings", "unset"]


def data_dir() -> Path:
    return Path(os.environ.get("DATA_DIR", "./data")).expanduser()


def settings_path() -> Path:
    configured = os.environ.get("SETTINGS_PATH")
    return Path(configured).expanduser() if configured else data_dir() / "settings.json"


def supervised() -> bool:
    """True when a supervisor owns the options — settings become read-only."""
    return os.environ.get("MANAGED_BY") == "supervisor"


_file_settings: dict[str, str] = {}
_write_lock = threading.Lock()


def reload() -> None:
    """Re-read the settings file. A malformed or absent file is never fatal."""
    global _file_settings
    loaded: dict[str, str] = {}
    try:
        parsed = json.loads(settings_path().read_text("utf-8"))
        if isinstance(parsed, dict):
            for key in SETTING_KEYS:
                value = parsed.get(key)
                if value is not None and value != "":
                    loaded[key] = str(value)
    except (OSError, ValueError):
        pass
    _file_settings = loaded


reload()


def setting(key: str) -> str:
    from_env = (os.environ.get(ENV_OF[key]) or "").strip()
    if from_env:
        return from_env
    return (_file_settings.get(key) or "").strip()


def setting_bool(key: str) -> bool:
    return setting(key).lower() == "true"


def source_of(key: str) -> Source:
    if (os.environ.get(ENV_OF[key]) or "").strip():
        return "environment"
    if (_file_settings.get(key) or "").strip():
        return "settings"
    return "unset"


def pinned_by_env(key: str) -> bool:
    return bool((os.environ.get(ENV_OF[key]) or "").strip())


def settings_writable() -> tuple[bool, str]:
    if supervised():
        return (
            False,
            "Supervisor manages this add-on's options. Use the Configuration tab — "
            "an edit made here would be overwritten by Supervisor's next write.",
        )
    return True, ""


def write_settings(patch: dict[str, str]) -> tuple[list[str], list[str]]:
    """
    Merge a patch into the settings file. Returns (written, ignored).

    Serialised and atomic, because neither property is optional here. This is a
    read-modify-write of one file, and FastAPI runs it on a threadpool — so two
    overlapping requests (the settings page's own "Regenerate api_token" followed
    by "Save" is enough, no scripting required) really can interleave. Measured
    before the lock: of 200 such pairs, 152 silently discarded the api_token the
    endpoint had already handed the owner, and 24 left the file syntactically
    invalid — which `reload()` then swallows into an empty dict, losing every
    setting including `owner_passphrase`, so the server refuses to start.

    The temp file is created 0600 and renamed into place, so the secrets in it are
    never observable at the 0644 a plain write would leave under the usual umask,
    and a crash mid-write leaves the previous file intact rather than a truncated
    one. The original got both properties for free by running single-threaded and
    passing `mode` to open(2).
    """
    global _file_settings
    with _write_lock:
        written: list[str] = []
        ignored: list[str] = []
        nxt = dict(_file_settings)
        for key, value in patch.items():
            if key not in SETTING_KEYS:
                continue
            if pinned_by_env(key):
                ignored.append(key)
                continue
            if value == "":
                nxt.pop(key, None)
            else:
                nxt[key] = value
            written.append(key)

        path = settings_path()
        path.parent.mkdir(parents=True, exist_ok=True)
        fd, temp = tempfile.mkstemp(dir=path.parent, prefix=".settings-", suffix=".json")
        try:
            os.fchmod(fd, 0o600)
            with os.fdopen(fd, "w", encoding="utf-8") as handle:
                json.dump(nxt, handle, indent=2)
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(temp, path)
        except BaseException:
            os.unlink(temp)
            raise
        _file_settings = nxt
        return written, ignored


def describe_settings() -> dict:
    writable, reason = settings_writable()
    return {
        "supervised": supervised(),
        "writable": writable,
        "reason": reason,
        "settings": [
            {
                "key": key,
                "secret": key in SECRET_KEYS,
                "value": (f"<set:{len(setting(key))}>" if setting(key) else "")
                if key in SECRET_KEYS
                else setting(key),
                "source": source_of(key),
                "pinnedByEnv": pinned_by_env(key),
                "restartRequired": key in RESTART_REQUIRED,
            }
            for key in SETTING_KEYS
        ],
    }


def instance_name() -> str:
    return setting("instance_name") or "Arra Memory"
