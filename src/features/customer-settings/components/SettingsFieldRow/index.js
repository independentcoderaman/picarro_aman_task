import { memo } from 'react';
import { Label, Row, Value } from './SettingsFieldRow.styles';

/*
This component is responsible to create your individual row of settings table on settings page
*/
export const SettingsFieldRow = memo(function SettingsFieldRow({ label, value }) {
  return (
    <Row>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Row>
  );
});
