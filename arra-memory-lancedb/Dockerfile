# Home Assistant add-on image.
#
# DEBIAN, NOT ALPINE, and that is forced rather than preferred. lancedb ships
# manylinux wheels only — there is no musl build — so on the Alpine base pip
# falls through to compiling a large Rust project and fails minutes in. pyarrow
# is the same story. Checked against PyPI rather than assumed: lancedb 0.38.0
# publishes macosx_11_0_arm64, manylinux_2_28_aarch64, manylinux_2_28_x86_64 and
# win_amd64, and nothing else.
#
# BUILD_FROM is an ARG rather than a literal so the official Home Assistant
# builder can substitute the per-architecture base from build.yaml. A plain
# `docker build` with no argument still gets a real base, which is what makes a
# local verification build meaningful.
ARG BUILD_FROM=ghcr.io/home-assistant/aarch64-base-debian:bookworm
FROM ${BUILD_FROM}

ARG BUILD_VERSION="dev"
ARG BUILD_ARCH="aarch64"

LABEL \
    io.hass.version="${BUILD_VERSION}" \
    io.hass.type="addon" \
    io.hass.arch="${BUILD_ARCH}"

# python3-venv because Debian bookworm marks its system Python externally
# managed (PEP 668): pip refuses to install into it, and --break-system-packages
# is exactly the sort of flag that works until an OS upgrade moves something.
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      python3 python3-venv python3-dev ca-certificates \
 && rm -rf /var/lib/apt/lists/*

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv "${VIRTUAL_ENV}"
ENV PATH="${VIRTUAL_ENV}/bin:${PATH}"

WORKDIR /app

# The whole package before the install, and NOT a stub tree to win a
# dependency-cache layer. Installing from pyproject plus __init__.py put an
# arra_memory into site-packages containing only __init__.py; the console script
# then died on `No module named arra_memory.__main__` while /app held a complete
# source tree that nothing imported. Measured, on this exact project, 2026-09-09.
COPY pyproject.toml README.md ./
COPY arra_memory/ ./arra_memory/

RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir "." "paho-mqtt>=2.0" \
 && python -c "import arra_memory.__main__, arra_memory.server, lancedb; print('import check ok')"

# The built UI must be in the image — the server serves it from the package, and
# an add-on with no bundle is a working API behind a blank page.
RUN test -s arra_memory/static/main.js && test -s arra_memory/static/app.css

COPY run.sh /run.sh
RUN chmod 0755 /run.sh

CMD ["/run.sh"]
