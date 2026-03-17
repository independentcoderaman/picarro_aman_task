import { useEffect, useMemo, useState } from 'react';
import {
  formatRemainingTime,
  getRetryLimiterSnapshot,
  registerRetryAttempt,
} from '../utils/retryLimiter';
//This hook is for your retry limit when data is failed to load from api
export function useRetryLimiter(enabled) {
  const [snapshot, setSnapshot] = useState(() => getRetryLimiterSnapshot());

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSnapshot(getRetryLimiterSnapshot());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [enabled]);

  const retryMeta = useMemo(
    () => ({
      ...snapshot,
      remainingLabel: snapshot.remainingMs ? formatRemainingTime(snapshot.remainingMs) : '',
    }),
    [snapshot],
  );

  const trackAttempt = () => {
    const nextSnapshot = registerRetryAttempt();
    setSnapshot(nextSnapshot);
    return nextSnapshot;
  };

  return {
    retryMeta,
    trackAttempt,
  };
}
