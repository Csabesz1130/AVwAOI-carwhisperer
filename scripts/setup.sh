#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

log() {
  printf "[INFO] %s\n" "$1"
}

success() {
  printf "[DONE] %s\n" "$1"
}

warn() {
  printf "[WARN] %s\n" "$1"
}

fail() {
  printf "[ERROR] %s\n" "$1"
}

ensure_node() {
  if ! command -v node >/dev/null 2>&1; then
    fail "Node.js >= 18 is required. Install it from https://nodejs.org and re-run this script."
    exit 1
  fi

  local major
  major="$(node -p "process.versions.node.split('.')[0]")"
  if [[ "$major" -lt 18 ]]; then
    fail "Detected Node.js $(node -v). Please upgrade to Node.js 18 or newer."
    exit 1
  fi
}

ensure_pnpm() {
  if command -v pnpm >/dev/null 2>&1; then
    return
  fi

  if command -v corepack >/dev/null 2>&1; then
    log "Activating pnpm via corepack"
    corepack enable >/dev/null 2>&1 || true
    corepack prepare pnpm@latest --activate
  else
    fail "pnpm is not installed and corepack is unavailable. Install pnpm (https://pnpm.io/installation) and rerun."
    exit 1
  fi
}

ensure_env_file() {
  if [[ -f .env ]]; then
    return
  fi

  if [[ -f .env.template ]]; then
    log "Creating .env from .env.template"
    node scripts/env.js
  else
    warn "No .env or .env.template found. Skipping environment setup."
  fi
}

ensure_node
ensure_pnpm

log "Using pnpm version $(pnpm --version)"

ensure_env_file

log "Installing dependencies"
pnpm install

log "Generating Prisma client"
pnpm exec prisma generate

log "Applying database schema (sqlite)"
pnpm exec prisma db push

log "Seeding database with demo data"
pnpm run db:seed

success "Setup completed!"
printf "\nNext steps:\n"
printf "  - Start the dev server: pnpm dev\n"
printf "  - Run tests or type checks as needed: pnpm lint | pnpm typecheck\n"
