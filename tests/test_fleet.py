"""
The fleet layer, against a REAL broker.

A fake MQTT client would prove our own mock behaves as we wrote it. What needs
proving is the part we do not control: that retained messages replay to a fresh
subscriber, that an empty retained payload is delivered at all (it is, and it
means "cleared"), and that our topic filters match what a real broker matches.

Skips itself — loudly — if mosquitto is absent, rather than passing quietly on a
machine that never ran the interesting half.
"""

from __future__ import annotations

import json
import shutil
import socket
import subprocess
import time

import pytest

from arra_memory import config, fleet

mosquitto = shutil.which("mosquitto")
pytestmark = pytest.mark.skipif(mosquitto is None, reason="mosquitto is not installed — the broker tests did NOT run")


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


@pytest.fixture
def broker():
    port = free_port()
    process = subprocess.Popen([mosquitto, "-p", str(port)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    deadline = time.time() + 10
    while time.time() < deadline:
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=0.3):
                break
        except OSError:
            time.sleep(0.1)
    else:
        process.kill()
        pytest.fail("mosquitto did not accept a connection")
    yield port
    process.kill()
    process.wait()


@pytest.fixture
def publisher(broker):
    import paho.mqtt.client as mqtt

    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.connect("127.0.0.1", broker, 30)
    client.loop_start()
    yield client
    client.loop_stop()
    client.disconnect()


@pytest.fixture
def connected_fleet(broker, monkeypatch):
    def start(**extra):
        monkeypatch.setenv("MQTT_URL", f"mqtt://127.0.0.1:{broker}")
        monkeypatch.setenv("MQTT_PREFIX", "oracle")
        monkeypatch.setenv("INSTANCE_NAME", "test-memory")
        for key, value in extra.items():
            monkeypatch.setenv(key, value)
        config.reload()
        fleet.reset_for_tests()
        fleet.start_fleet()
        deadline = time.time() + 10
        while time.time() < deadline and not fleet.fleet_status()["connected"]:
            time.sleep(0.05)
        assert fleet.fleet_status()["connected"], "the fleet never connected to the test broker"

    yield start
    fleet.reset_for_tests()


def wait_until(predicate, timeout: float = 5.0) -> bool:
    deadline = time.time() + timeout
    while time.time() < deadline:
        if predicate():
            return True
        time.sleep(0.05)
    return False


def test_retained_presence_replays_to_a_fresh_subscriber_and_empty_retain_means_departed(publisher, connected_fleet):
    publisher.publish("oracle/alpha/lwt", "online", qos=1, retain=True)
    publisher.publish("oracle/alpha/status", json.dumps({"online": True, "client": "oracle-channel"}), qos=1, retain=True)
    publisher.publish("oracle/ghost/lwt", "online", qos=1, retain=True)
    time.sleep(0.3)

    connected_fleet()  # connects AFTER the retained publishes — that is the point of retain
    assert wait_until(lambda: {m["name"] for m in fleet.list_fleet().get("members", [])} >= {"alpha", "ghost"})

    members = {m["name"]: m for m in fleet.list_fleet()["members"]}
    # alpha announced a channel; ghost did not. That is what says who can be MESSAGED.
    assert members["alpha"]["channel"] is True
    assert "channel" not in members["ghost"]

    publisher.publish("oracle/ghost/lwt", "", qos=1, retain=True)
    assert wait_until(lambda: "ghost" not in {m["name"] for m in fleet.list_fleet()["members"]})
    assert "alpha" in {m["name"] for m in fleet.list_fleet()["members"]}


def test_send_publishes_to_the_exact_contract_topic_and_waits_for_the_puback(broker, publisher, connected_fleet):
    import paho.mqtt.client as mqtt

    connected_fleet()
    received: list[tuple[str, dict]] = []
    subscriber = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    subscriber.on_message = lambda c, u, m: received.append((m.topic, json.loads(m.payload)))
    subscriber.connect("127.0.0.1", broker, 30)
    subscriber.subscribe("oracle/+/+/in", qos=1)
    subscriber.loop_start()
    try:
        publisher.publish("oracle/alpha/lwt", "online", qos=1, retain=True)
        assert wait_until(lambda: "alpha" in {m["name"] for m in fleet.list_fleet()["members"]})

        result = fleet.send_to_member("alpha", "ping from the corpus", "main")
        assert result["ok"] is True
        assert result["topic"] == "oracle/alpha/main/in"

        assert wait_until(lambda: len(received) > 0)
        topic, body = received[0]
        assert topic == "oracle/alpha/main/in"
        assert body["text"] == "ping from the corpus"
        assert body["user"] == "test-memory"
        assert isinstance(body["id"], str)
    finally:
        subscriber.loop_stop()
        subscriber.disconnect()


def test_a_crafted_name_or_room_cannot_escape_its_level_in_the_topic_tree(publisher, connected_fleet):
    connected_fleet()
    publisher.publish("oracle/alpha/lwt", "online", qos=1, retain=True)
    assert wait_until(lambda: "alpha" in {m["name"] for m in fleet.list_fleet()["members"]})

    for room in ("../#", "#", "+", "a/b", "", "x" * 65):
        result = fleet.send_to_member("alpha", "x", room)
        assert result["ok"] is False and "invalid room" in result["error"]
    for name in ("#", "+", "a/b", "../etc"):
        result = fleet.send_to_member(name, "x", "main")
        assert result["ok"] is False


def test_you_cannot_message_a_member_the_broker_has_never_heard_of(connected_fleet):
    connected_fleet()
    result = fleet.send_to_member("nobody", "hello")
    assert result["ok"] is False and "no member named nobody" in result["error"]


def test_replies_arrive_off_prefix_name_room_out_depth_exact(publisher, connected_fleet):
    connected_fleet()
    publisher.publish("oracle/alpha/main/out", json.dumps({"type": "msg", "text": "pong"}), qos=1)
    # A deeper topic must NOT be read as a reply.
    publisher.publish("oracle/alpha/main/out/img", json.dumps({"text": "not a reply"}), qos=1)

    assert wait_until(lambda: len(fleet.member_replies("alpha")) > 0)
    time.sleep(0.3)
    replies = fleet.member_replies("alpha")
    assert len(replies) == 1
    assert replies[0]["text"] == "pong"
    assert replies[0]["room"] == "main"
    assert fleet.member_replies("alpha", since=replies[0]["seq"]) == []


def test_the_fleet_says_it_cannot_see_rather_than_that_the_fleet_is_empty(monkeypatch):
    monkeypatch.setenv("MQTT_URL", "mqtt://127.0.0.1:1")
    config.reload()
    fleet.reset_for_tests()
    result = fleet.list_fleet()
    assert result["ok"] is False
    assert "cannot SEE the fleet" in result["error"]
