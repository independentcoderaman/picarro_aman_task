import { memo, useMemo } from 'react';
import { CUSTOMER_SETTINGS_LABELS } from '../constants/customerSettings.constants';
import { SettingsFieldRow } from './SettingsFieldRow';
/*This component builds the complete table of information on settings page */
export const CustomerSettingsView = memo(function CustomerSettingsView({ settings }) {
  const rows = useMemo(
    () => [
      { label: CUSTOMER_SETTINGS_LABELS.companyName, value: settings.companyName },
      { label: CUSTOMER_SETTINGS_LABELS.plan, value: settings.plan },
      { label: CUSTOMER_SETTINGS_LABELS.seatLimit, value: settings.seatLimit },
      { label: CUSTOMER_SETTINGS_LABELS.contractMonths, value: `${settings.contractMonths} months` },
    ],
    [settings],
  );

  return (
    <section aria-label="Customer settings">
      {rows.map((row) => (
        <SettingsFieldRow key={row.label} label={row.label} value={row.value} />
      ))}
    </section>
  );
});
