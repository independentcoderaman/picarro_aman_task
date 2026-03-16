import { memo } from 'react';
import { ToastShell, ToastViewport } from './Toast.styles';

export const Toast = memo(function Toast({ message, variant }) {
  if (!message) {
    return null;
  }

  return (
    <ToastViewport aria-live="polite" aria-atomic="true">
      <ToastShell $variant={variant}>{message}</ToastShell>
    </ToastViewport>
  );
});
