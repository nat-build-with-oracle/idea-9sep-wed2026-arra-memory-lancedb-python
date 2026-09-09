"""`arra-memory` — serve the corpus, the UI, and the MCP endpoint."""

from __future__ import annotations

import argparse
import logging
import os
import sys

from . import VERSION, config


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(prog="arra-memory", description="A durable memory corpus on LanceDB.")
    parser.add_argument("--host", default=os.environ.get("HOST", "127.0.0.1"), help="bind address (default 127.0.0.1; HOST env)")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8099")), help="bind port (default 8099; PORT env)")
    parser.add_argument("--data-dir", help="where the corpus and settings live (default ./data; DATA_DIR env)")
    parser.add_argument("--version", action="version", version=VERSION)
    args = parser.parse_args(argv)

    if args.data_dir:
        os.environ["DATA_DIR"] = args.data_dir
        config.reload()

    logging.basicConfig(level=logging.INFO, format="%(message)s")
    from .server import create_app

    try:
        app = create_app()
    except RuntimeError as error:
        print(f"[arra-memory] FATAL: {error}", file=sys.stderr)
        sys.exit(1)

    import uvicorn

    print(f"[arra-memory] v{VERSION} · data: {config.data_dir()} · listening on {args.host}:{args.port}")
    uvicorn.run(app, host=args.host, port=args.port, log_level="info")


if __name__ == "__main__":
    main()
