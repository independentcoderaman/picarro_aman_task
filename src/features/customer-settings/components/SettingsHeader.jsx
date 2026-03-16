import { memo } from 'react';
import { Button } from '../../../shared/components/Button/Button';
import { Icon, Shell, Subtitle, Title } from './SettingsHeader.styles';

export const SettingsHeader = memo(function SettingsHeader({ customerId, mode, onEdit }) {
  return (
    <Shell>
      <div>
        <Title>Customer Account Settings</Title>
        <Subtitle>
          Review and update the account configuration for customer #{customerId}.
        </Subtitle>
      </div>

      {mode === 'view' ? (
        <Button variant="primary" onClick={onEdit} aria-label="Edit settings">
          <Icon src="/assets/icons/edit.svg" alt="" aria-hidden="true" />
          Edit
        </Button>
      ) : null}
    </Shell>
  );
});
