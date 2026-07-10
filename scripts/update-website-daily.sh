#!/bin/zsh
set -u

export NVM_DIR="/Users/chai/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh" >/dev/null 2>&1
fi
export PATH="/Users/chai/.nvm/versions/node/v25.8.1/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

REPO="/Users/chai/Documents/ai news video/AI_Crypto_Share/crypto-hub"
LOG_DIR="/Users/chai/Documents/ai news video/logs"
LOCK_DIR="/tmp/insightwealth-website-daily-update.lock"

mkdir -p "$LOG_DIR"

exec >> "$LOG_DIR/insightwealth-website-daily-update.log" 2>&1

echo "===== $(date '+%Y-%m-%d %H:%M:%S %Z') InsightWealth website daily update start ====="

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "Another daily website update is already running. Exiting."
  exit 0
fi

cleanup() {
  rmdir "$LOCK_DIR" 2>/dev/null || true
}
trap cleanup EXIT

cd "$REPO" || exit 1

DATA_FAILURES=0

run_data_step() {
  local label="$1"
  shift
  echo "--- $label ---"
  if "$@"; then
    echo "$label succeeded"
  else
    local exit_code=$?
    DATA_FAILURES=$((DATA_FAILURES + 1))
    echo "$label failed with exit code $exit_code; continuing so cached/manual data can still publish safely"
  fi
}

run_required_step() {
  local label="$1"
  shift
  echo "--- $label ---"
  "$@"
}

run_data_step "BTC daily price cache" npm run update:btc-prices
run_data_step "On-chain indicators" npm run update:onchain
run_data_step "ETF daily marker" npm run update:etf
run_data_step "Market cache and bull score" npm run update:daily-data
run_data_step "Daily brief" npm run update:daily-brief
run_data_step "YouTube latest video" npm run update:youtube

run_required_step "Lint" npm run lint || exit 1
run_required_step "Build" npm run build || exit 1

git add data/*.json data/cache/*.json 2>/dev/null || true

if git diff --cached --quiet; then
  echo "No data changes to commit."
else
  COMMIT_DATE="$(date '+%Y-%m-%d')"
  git commit -m "Update daily crypto data ${COMMIT_DATE}" || exit 1
  git push origin main || exit 1
  echo "Committed and pushed daily data update for ${COMMIT_DATE}."
fi

if [ "$DATA_FAILURES" -gt 0 ]; then
  echo "Completed with $DATA_FAILURES non-fatal data update failure(s)."
else
  echo "Completed with all data steps successful."
fi

echo "===== $(date '+%Y-%m-%d %H:%M:%S %Z') InsightWealth website daily update end ====="
