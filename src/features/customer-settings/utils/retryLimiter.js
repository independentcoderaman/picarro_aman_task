import { STORAGE_KEYS } from '../../../shared/constants/app.constants';
import { readFromStorage, writeToStorage } from '../../../shared/utils/storage';

const RETRY_LIMIT = 5;
const BLOCK_DURATION_MS = 10 * 60 * 1000;

function getStoredRetryState() {
  return readFromStorage(STORAGE_KEYS.demoRetryLimiter, {
    retryCount: 0,
    blockedUntil: 0,
  });
}

function setStoredRetryState(nextState) {
  writeToStorage(STORAGE_KEYS.demoRetryLimiter, nextState);
}

export function getRetryLimiterSnapshot() {
  const storedState = getStoredRetryState();
  const now = Date.now();

  if (storedState.blockedUntil && storedState.blockedUntil <= now) {
    const resetState = { retryCount: 0, blockedUntil: 0 };
    setStoredRetryState(resetState);

    return {
      ...resetState,
      isBlocked: false,
      retriesRemaining: RETRY_LIMIT,
      remainingMs: 0,
    };
  }

  return {
    ...storedState,
    isBlocked: storedState.blockedUntil > now,
    retriesRemaining: Math.max(RETRY_LIMIT - storedState.retryCount, 0),
    remainingMs: Math.max(storedState.blockedUntil - now, 0),
  };
}

export function registerRetryAttempt() {
  const snapshot = getRetryLimiterSnapshot();

  if (snapshot.isBlocked) {
    return snapshot;
  }

  const nextRetryCount = snapshot.retryCount + 1;
  const shouldBlock = nextRetryCount >= RETRY_LIMIT;
  const nextState = {
    retryCount: shouldBlock ? RETRY_LIMIT : nextRetryCount,
    blockedUntil: shouldBlock ? Date.now() + BLOCK_DURATION_MS : 0,
  };

  setStoredRetryState(nextState);

  return {
    ...nextState,
    isBlocked: shouldBlock,
    retriesRemaining: Math.max(RETRY_LIMIT - nextState.retryCount, 0),
    remainingMs: Math.max(nextState.blockedUntil - Date.now(), 0),
  };
}

export function formatRemainingTime(remainingMs) {
  const totalSeconds = Math.max(Math.ceil(remainingMs / 1000), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}
