import { memo } from 'react';
import { LoaderLabel, LoaderShell, Spinner } from './Loader.styles';

export const Loader = memo(function Loader({
  label = 'Loading',
  fullPage = false,
  compact = false,
}) {
  return (
    <LoaderShell $fullPage={fullPage} $compact={compact} role="status" aria-live="polite">
      <Spinner $compact={compact} aria-hidden="true" />
      {!compact && <LoaderLabel>{label}</LoaderLabel>}
    </LoaderShell>
  );
});
