# The UI is built in its own stage, so bun never ships in the runtime image.
#
# It is built from source rather than copied from the repo's arra_memory/static
# because a stale committed bundle and a fresh source tree would produce an
# image that disagrees with itself, and the disagreement is invisible until
# someone opens the page.
FROM oven/bun:1-alpine AS ui
WORKDIR /ui
COPY ui/package.json ui/bun.lock ./
RUN bun install --frozen-lockfile
COPY ui/ ./
# The package scripts write to ../arra_memory/static, which is the checkout
# layout. This stage has no checkout, so the output directory is named
# explicitly rather than relying on a relative path that means something else
# here than it does on a developer's disk.
RUN mkdir -p /static && \
    bun build src/ui/main.tsx --outdir /static --minify --target browser && \
    bun node_modules/@tailwindcss/cli/dist/index.mjs -i src/ui/app.css -o /static/app.css --minify && \
    cp public/index.html /static/index.html && \
    test -s /static/main.js && test -s /static/app.css

FROM python:3.12-slim
WORKDIR /app

# The whole package is copied before the install, and that is deliberate rather
# than lazy. Installing from a stub tree to win a dependency-cache layer put an
# arra_memory into site-packages that contained only __init__.py — the console
# script then died on `No module named arra_memory.__main__`, while /app held a
# complete source tree that nothing imported. One source of truth, one install.
COPY pyproject.toml README.md ./
COPY arra_memory/ ./arra_memory/
COPY --from=ui /static/ ./arra_memory/static/
RUN test -s arra_memory/static/main.js && test -s arra_memory/static/app.css
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir "." "paho-mqtt>=2.0" \
 && python -c "import arra_memory.__main__, arra_memory.server; print('import check ok')"

# The corpus lives here. Mount it, or the memories die with the container.
ENV DATA_DIR=/data \
    HOST=0.0.0.0 \
    PORT=8099 \
    PYTHONUNBUFFERED=1
VOLUME ["/data"]
EXPOSE 8099

# No default passphrase, deliberately: the server refuses to start without one,
# and a baked-in default would be a published credential.
# Shell form, so it follows PORT rather than pinning the default in two places.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD python -c "import os,sys,urllib.request; sys.exit(0 if urllib.request.urlopen(f\"http://127.0.0.1:{os.environ['PORT']}/api/health\", timeout=4).status==200 else 1)"

CMD ["arra-memory"]
