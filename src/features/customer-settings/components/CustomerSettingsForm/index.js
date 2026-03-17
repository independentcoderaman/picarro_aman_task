import { memo, useEffect, useMemo } from 'react';
import { Input } from '../../../../shared/components/Input/Input';
import { NumberInput } from '../../../../shared/components/NumberInput/NumberInput';
import { Select } from '../../../../shared/components/Select/Select';
import { REQUEST_STATE } from '../../../../shared/constants/app.constants';
import { PLAN_OPTIONS } from '../../constants/customerSettings.constants';
import { useCustomerSettingsForm } from '../../hooks/useCustomerSettingsForm';
import { SettingsActions } from '../SettingsActions';
import { Form, FormGrid } from './CustomerSettingsForm.styles';

/*
This component builds your settings/edit form when clicked on edit, also we are using useCustomerSettingsForm to get
all the required function to handle this form eg: handleInput but customized for each type of input also handles error
and validations
*/
export const CustomerSettingsForm = memo(function CustomerSettingsForm({
  draft,
  saveStatus,
  onFieldChange,
  onDiscard,
  onSave,
}) {
  const {
    touchedFields,
    validationErrors,
    isValid,
    handleTextChange,
    handleNumberChange,
    handleSelectChange,
    markAllTouched,
    resetTouched,
  } = useCustomerSettingsForm(draft, onFieldChange);

  useEffect(() => {
    if (saveStatus === REQUEST_STATE.succeeded) {
      resetTouched();
    }
  }, [resetTouched, saveStatus]);

  const isSaving = saveStatus === REQUEST_STATE.loading;

  const fieldConfig = useMemo(
    () => [
      {
        id: 'company-name',
        component: Input,
        label: 'Company Name',
        required: true,
        value: draft.companyName,
        error: touchedFields.companyName ? validationErrors.companyName : '',
        onChange: (event) => handleTextChange('companyName', event.target.value),
      },
      {
        id: 'plan',
        component: Select,
        label: 'Plan',
        required: true,
        value: draft.plan,
        options: PLAN_OPTIONS,
        error: touchedFields.plan ? validationErrors.plan : '',
        onChange: (event) => handleSelectChange('plan', event.target.value),
      },
      {
        id: 'seat-limit',
        component: NumberInput,
        label: 'Seat Limit',
        required: true,
        value: draft.seatLimit,
        error: touchedFields.seatLimit ? validationErrors.seatLimit : '',
        onChange: (event) => handleNumberChange('seatLimit', event.target.value),
      },
      {
        id: 'contract-length',
        component: NumberInput,
        label: 'Contract Length (months)',
        required: true,
        value: draft.contractMonths,
        error: touchedFields.contractMonths ? validationErrors.contractMonths : '',
        onChange: (event) => handleNumberChange('contractMonths', event.target.value),
      },
    ],
    [
      draft.companyName,
      draft.contractMonths,
      draft.plan,
      draft.seatLimit,
      handleNumberChange,
      handleSelectChange,
      handleTextChange,
      touchedFields.companyName,
      touchedFields.contractMonths,
      touchedFields.plan,
      touchedFields.seatLimit,
      validationErrors.companyName,
      validationErrors.contractMonths,
      validationErrors.plan,
      validationErrors.seatLimit,
    ],
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      markAllTouched();
      return;
    }

    onSave();
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGrid>
        {fieldConfig.map((fieldConfigItem) => {
          const FieldRenderer = fieldConfigItem.component; //This is the component from your object

          return <FieldRenderer key={fieldConfigItem.id} {...fieldConfigItem} />; //Component called and rendered with props given in object
        })}
      </FormGrid>

      <SettingsActions
        isSaving={isSaving}
        isSubmitDisabled={isSaving || !isValid}
        onDiscard={onDiscard}
      />
    </Form>
  );
});
