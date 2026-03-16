import { useEffect } from 'react';
/*
This hook purely handles the Toast message i.e showing and hiding functionality
 */
const TOAST_DURATION = 3000;

export function useToast(toast, onDismiss) {
  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      onDismiss?.();
    }, TOAST_DURATION);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toast, onDismiss]);

  return toast;
}
