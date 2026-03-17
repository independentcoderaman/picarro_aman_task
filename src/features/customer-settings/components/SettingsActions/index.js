import { memo } from 'react';
import { Button } from '../../../../shared/components/Button/Button';
import { Loader } from '../../../../shared/components/Loader/Loader';
import { SaveStatus, Shell } from './SettingsActions.styles';

export const SettingsActions = memo(function SettingsActions({
  isSaving,
  isSubmitDisabled,
  onDiscard,
}) {
  return (
    <Shell>
      <Button type="button" variant="secondary" onClick={onDiscard} disabled={isSaving}>
        Discard Changes
      </Button>
      <Button type="submit" disabled={isSubmitDisabled}>
        Save Changes
      </Button>
      {isSaving ? (
        <SaveStatus>
          <Loader compact />
          Saving...
        </SaveStatus>
      ) : null}
    </Shell>
  );
});
