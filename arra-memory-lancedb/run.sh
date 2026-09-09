#!/usr/bin/with-contenv bashio
# shellcheck shell=bash
#
# Reads this add-on's Supervisor options and starts the server.
#
# Options are read HERE, at container start, and passed as environment
# variables — never baked into the image. A secret in an image layer is a secret
# in every registry and every backup of that image.

set -eu

OWNER_PASSPHRASE="$(bashio::config 'owner_passphrase')"
API_TOKEN="$(bashio::config 'api_token')"
PUBLIC_URL="$(bashio::config 'public_url')"
INSTANCE_NAME="$(bashio::config 'instance_name')"
OLLAMA_URL="$(bashio::config 'ollama_url')"
EMBEDDING_MODEL="$(bashio::config 'embedding_model')"
EMBEDDING_DIMENSIONS="$(bashio::config 'embedding_dimensions')"
SEARCH_LOG="$(bashio::config 'search_log')"
TRACE_LOG="$(bashio::config 'trace_log')"
GENERATED_TOOLS="$(bashio::config 'generated_tools')"
LANGUAGE="$(bashio::config 'language')"
THEME="$(bashio::config 'theme')"
MQTT_URL="$(bashio::config 'mqtt_url')"
MQTT_USERNAME="$(bashio::config 'mqtt_username')"
MQTT_PASSWORD="$(bashio::config 'mqtt_password')"
MQTT_PREFIX="$(bashio::config 'mqtt_prefix')"

# bashio renders an unset optional string as the literal "null", which would
# then be a perfectly valid — and completely wrong — passphrase. This exact trap
# has cost this fleet time twice.
[ "${OWNER_PASSPHRASE}" = "null" ] && OWNER_PASSPHRASE=""
[ "${API_TOKEN}" = "null" ] && API_TOKEN=""
[ "${PUBLIC_URL}" = "null" ] && PUBLIC_URL=""
[ "${INSTANCE_NAME}" = "null" ] && INSTANCE_NAME="Arra Memory (LanceDB)"
[ "${OLLAMA_URL}" = "null" ] && OLLAMA_URL=""
[ "${EMBEDDING_MODEL}" = "null" ] && EMBEDDING_MODEL="bge-m3"
[ "${EMBEDDING_DIMENSIONS}" = "null" ] && EMBEDDING_DIMENSIONS="1024"
[ "${SEARCH_LOG}" = "null" ] && SEARCH_LOG="false"
[ "${TRACE_LOG}" = "null" ] && TRACE_LOG="true"
[ "${GENERATED_TOOLS}" = "null" ] && GENERATED_TOOLS="false"
[ "${LANGUAGE}" = "null" ] && LANGUAGE="th"
[ "${THEME}" = "null" ] && THEME="slate"
[ "${MQTT_URL}" = "null" ] && MQTT_URL=""
[ "${MQTT_USERNAME}" = "null" ] && MQTT_USERNAME=""
[ "${MQTT_PASSWORD}" = "null" ] && MQTT_PASSWORD=""
[ "${MQTT_PREFIX}" = "null" ] && MQTT_PREFIX="oracle"

if [ -z "${OWNER_PASSPHRASE}" ]; then
    bashio::log.fatal "owner_passphrase is not set."
    bashio::log.fatal "Open this add-on's Configuration tab and set one:"
    bashio::log.fatal "    openssl rand -base64 32"
    bashio::log.fatal "Refusing to start — an unset passphrase would serve your"
    bashio::log.fatal "memories to anyone who reaches this URL."
    exit 1
fi

# /data is the only path Supervisor persists across restarts and includes in
# Home Assistant's backups. The corpus lives there and nowhere else — and in its
# OWN directory, so this add-on and the libSQL one never share a store.
export DATA_DIR=/data
export OWNER_PASSPHRASE
export API_TOKEN
export PUBLIC_URL
export INSTANCE_NAME
export OLLAMA_URL
export EMBEDDING_MODEL
export EMBEDDING_DIMENSIONS
export SEARCH_LOG
export TRACE_LOG
export GENERATED_TOOLS
export LANGUAGE
export THEME
export MQTT_URL
export MQTT_USERNAME
export MQTT_PASSWORD
export MQTT_PREFIX
# Marks this process as Supervisor-managed, which is how the server knows its
# options are owned elsewhere and its own settings form must stay read-only.
# Set HERE rather than sniffed: run.sh IS the Supervisor entrypoint, so its
# presence is the fact rather than an inference about the environment.
export MANAGED_BY=supervisor
export HOST=0.0.0.0
export PORT=8099

bashio::log.info "Arra Memory (LanceDB) starting"
bashio::log.info "  store:    LanceDB at /data/lancedb"
if bashio::var.has_value "${API_TOKEN}"; then
    bashio::log.info "  auth:     owner session + OAuth + static API token"
else
    bashio::log.info "  auth:     owner session + OAuth  (api_token not set)"
fi
if bashio::var.has_value "${PUBLIC_URL}"; then
    bashio::log.info "  public:   ${PUBLIC_URL}"
fi
if bashio::var.has_value "${OLLAMA_URL}"; then
    bashio::log.info "  search:   keyword (n-gram FTS) + semantic via ${EMBEDDING_MODEL}"
else
    bashio::log.info "  search:   keyword only (n-gram FTS) — set ollama_url for semantic"
fi
if [ "${SEARCH_LOG}" = "true" ]; then
    bashio::log.info "  log:      recording every search, INCLUDING query text"
fi
if [ "${TRACE_LOG}" != "false" ]; then
    bashio::log.info "  trace:    recording every call and every intent-carrying read"
fi

# exec so python becomes PID 1 of this process tree and receives the signals s6
# sends on stop — without it, a restart waits for the kill timeout every time.
exec python3 -m arra_memory
