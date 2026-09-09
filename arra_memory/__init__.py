"""Arra Memory on LanceDB — a durable memory corpus with a web UI and an MCP door."""

from importlib.metadata import PackageNotFoundError, version as _version

try:
    VERSION = _version("arra-memory-lancedb")
except PackageNotFoundError:  # running from a checkout that was never installed
    VERSION = "0.1.0"

__version__ = VERSION
