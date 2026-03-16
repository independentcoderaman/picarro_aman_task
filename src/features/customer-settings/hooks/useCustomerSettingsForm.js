import { useCallback, useMemo, useState } from 'react';
import { sanitizeIntegerInput, sanitizeTextInput } from '../../../shared/utils/sanitization';
import { hasValidationErrors, validateCustomerSettings } from '../../../shared/utils/validation';
/*
This hook is purely responsible for handling the form and it's actions
*/
const DEFAULT_TOUCHED_STATE = {
  companyName: false,
  plan: false,
  seatLimit: false,
  contractMonths: false,
};

export function useCustomerSettingsForm(draft, onFieldChange) {
  const [touchedFields, setTouchedFields] = useState(DEFAULT_TOUCHED_STATE);

  const validationErrors = useMemo(
    () =>
      validateCustomerSettings({
        companyName: draft?.companyName ?? '',
        plan: draft?.plan ?? '',
        seatLimit: draft?.seatLimit ?? '',
        contractMonths: draft?.contractMonths ?? '',
      }),
    [draft],
  );

  const isValid = useMemo(() => !hasValidationErrors(validationErrors), [validationErrors]);

  const markTouched = useCallback((field) => {
    setTouchedFields((currentState) => ({
      ...currentState,
      [field]: true,
    }));
  }, []);

  const handleTextChange = useCallback(
    (field, value) => {
      markTouched(field);
      onFieldChange(field, sanitizeTextInput(value));
    },
    [markTouched, onFieldChange],
  );

  const handleNumberChange = useCallback(
    (field, value) => {
      markTouched(field);
      onFieldChange(field, sanitizeIntegerInput(value));
    },
    [markTouched, onFieldChange],
  );

  const handleSelectChange = useCallback(
    (field, value) => {
      markTouched(field);
      onFieldChange(field, value);
    },
    [markTouched, onFieldChange],
  );

  const markAllTouched = useCallback(() => {
    setTouchedFields({
      companyName: true,
      plan: true,
      seatLimit: true,
      contractMonths: true,
    });
  }, []);

  const resetTouched = useCallback(() => {
    setTouchedFields(DEFAULT_TOUCHED_STATE);
  }, []);

  return {
    touchedFields,
    validationErrors,
    isValid,
    handleTextChange,
    handleNumberChange,
    handleSelectChange,
    markAllTouched,
    resetTouched,
  };
}
