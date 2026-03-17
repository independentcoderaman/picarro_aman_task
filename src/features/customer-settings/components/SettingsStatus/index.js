import { memo } from 'react';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import { Loader } from '../../../../shared/components/Loader/Loader';
import { REQUEST_STATE } from '../../../../shared/constants/app.constants';
import { CUSTOMER_SETTINGS_ERROR_COPY } from '../../constants/customerSettings.constants';

export const SettingsStatus = memo(function SettingsStatus({
  fetchStatus,
  retryCount,
  activeScenario,
  retryMeta,
  onRetry,
}) {
  if (fetchStatus === REQUEST_STATE.loading) {
    return <Loader label="Loading customer settings" />;
  }

  if (fetchStatus === REQUEST_STATE.failed && activeScenario === 'get-fail-always') {
    return (
      <ErrorState
        message={
          retryMeta?.isBlocked
            ? `Demo scenario: load is forced to fail. Retry limit reached. Please wait ${retryMeta.remainingLabel} before trying again.`
            : `Demo scenario: load is forced to fail. You can retry ${retryMeta?.retriesRemaining ?? 5} more time(s) before a 10 minute cooldown is applied.`
        }
        actionLabel="Retry"
        actionDisabled={retryMeta?.isBlocked}
        onAction={onRetry}
      />
    );
  }

  if (fetchStatus === REQUEST_STATE.failed && retryCount <= 1) {
    return (
      <ErrorState
        message={CUSTOMER_SETTINGS_ERROR_COPY.loadRetry}
        actionLabel="Retry"
        onAction={onRetry}
      />
    );
  }

  if (fetchStatus === REQUEST_STATE.failed && retryCount > 1) {
    return <ErrorState message={CUSTOMER_SETTINGS_ERROR_COPY.loadFinal} />;
  }

  return null;
});
