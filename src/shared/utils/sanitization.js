const DIGIT_ONLY_PATTERN = /^-?\d*$/;

export function sanitizeTextInput(value) {
  return value.replace(/\s+/g, ' ').trimStart();
}

export function sanitizeIntegerInput(value) {
  const normalizedValue = String(value ?? '').replace(/[^\d-]/g, '');
  return DIGIT_ONLY_PATTERN.test(normalizedValue) ? normalizedValue : '';
}

export function sanitizeCustomerSettingsDraft(draft) {
  return {
    ...draft,
    companyName: sanitizeTextInput(draft.companyName ?? '').trim(),
    seatLimit: Number.parseInt(sanitizeIntegerInput(draft.seatLimit), 10),
    contractMonths: Number.parseInt(sanitizeIntegerInput(draft.contractMonths), 10),
  };
}
