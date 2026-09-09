"""
Settings resolve in the right order, and cannot be written where they would be
silently overwritten.

Environment wins because whatever pins it (a compose file, a supervisor) stays
authoritative; a settings file that could override it would be a second source
of truth for one value.
"""

from __future__ import annotations

from arra_memory import config


def test_environment_beats_the_settings_file(settings_file, monkeypatch):
    settings_file({"instance_name": "from-file", "ollama_url": "http://from-file:11434"})
    monkeypatch.setenv("INSTANCE_NAME", "from-env")
    assert config.setting("instance_name") == "from-env"
    assert config.source_of("instance_name") == "environment"
    assert config.pinned_by_env("instance_name") is True


def test_the_settings_file_fills_in_what_the_environment_does_not_set(settings_file):
    settings_file({"ollama_url": "http://from-file:11434"})
    assert config.setting("ollama_url") == "http://from-file:11434"
    assert config.source_of("ollama_url") == "settings"
    assert config.pinned_by_env("ollama_url") is False


def test_an_unset_option_resolves_to_empty_not_to_the_string_undefined():
    assert config.setting("mqtt_url") == ""
    assert config.source_of("mqtt_url") == "unset"


def test_writing_skips_keys_the_environment_pins_and_says_which(settings_file, monkeypatch):
    settings_file({})
    monkeypatch.setenv("INSTANCE_NAME", "from-env")
    written, ignored = config.write_settings({"instance_name": "should-be-ignored", "embedding_model": "written-model"})
    assert "instance_name" in ignored
    assert "embedding_model" in written
    assert config.setting("instance_name") == "from-env"  # the env value still wins after the write
    assert config.setting("embedding_model") == "written-model"


def test_secrets_are_described_by_length_never_returned(monkeypatch):
    import json

    monkeypatch.setenv("API_TOKEN", "super-secret-value")
    described = config.describe_settings()
    token = next(s for s in described["settings"] if s["key"] == "api_token")
    assert token["secret"] is True
    assert token["value"] == "<set:18>"
    assert "super-secret-value" not in json.dumps(described)


def test_without_a_supervisor_settings_are_writable():
    assert config.supervised() is False
    assert config.settings_writable()[0] is True


def test_under_a_supervisor_settings_are_refused_with_a_reason_that_points_somewhere(monkeypatch):
    monkeypatch.setenv("MANAGED_BY", "supervisor")
    writable, reason = config.settings_writable()
    assert writable is False
    assert "Configuration tab" in reason and "Supervisor" in reason
    described = config.describe_settings()
    assert described["supervised"] is True
    assert len(described["settings"]) == len(config.SETTING_KEYS)


def test_a_malformed_settings_file_is_ignored_never_fatal(tmp_path, monkeypatch):
    path = tmp_path / "broken.json"
    path.write_text("{not json at all", "utf-8")
    monkeypatch.setenv("SETTINGS_PATH", str(path))
    config.reload()
    assert config.setting("instance_name") == ""  # a bad settings file must not cost you the corpus
