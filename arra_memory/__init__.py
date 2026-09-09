"""Arra Memory on LanceDB — a durable memory corpus with a web UI and an MCP door."""

from importlib.metadata import PackageNotFoundError, version as _version

try:
    VERSION = _version("arra-memory-lancedb")
except PackageNotFoundError:  # running from a checkout that was never installed
    # Kept in step with pyproject and with the add-on's config.yaml. It is the
    # number /api/health reports, which is what anyone checks to confirm what a
    # machine is actually running — so a stale value here does not look like a
    # forgotten constant, it looks like a deploy that did not happen.
    VERSION = "0.2.0"

__version__ = VERSION
