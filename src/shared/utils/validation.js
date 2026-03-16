import {
  CUSTOMER_SETTINGS_LIMITS,
  PLAN_OPTIONS,
} from '../../features/customer-settings/constants/customerSettings.constants';

function validateIntegerRange(value, limits) {
  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isInteger(parsedValue)) {
    return `Value must be between ${limits.min} and ${limits.max}`;
  }

  if (parsedValue < limits.min || parsedValue > limits.max) {
    return `Value must be between ${limits.min} and ${limits.max}`;
  }

  return '';
}

export function validateCompanyName(value) {
  const normalizedValue = String(value ?? '').trim();

  if (!normalizedValue) {
    return 'This field is required';
  }

  if (normalizedValue.length > CUSTOMER_SETTINGS_LIMITS.companyNameMaxLength) {
    return 'Must be 50 characters or fewer';
  }

  return '';
}

export function validatePlan(value) {
  return PLAN_OPTIONS.includes(value) ? '' : 'Please choose a valid plan';
}

export function validateSeatLimit(value) {
  return validateIntegerRange(value, CUSTOMER_SETTINGS_LIMITS.seatLimit);
}

export function validateContractMonths(value) {
  return validateIntegerRange(value, CUSTOMER_SETTINGS_LIMITS.contractMonths);
}

export function validateCustomerSettings(draft) {
  return {
    companyName: validateCompanyName(draft.companyName),
    plan: validatePlan(draft.plan),
    seatLimit: validateSeatLimit(draft.seatLimit),
    contractMonths: validateContractMonths(draft.contractMonths),
  };
}

export function hasValidationErrors(errors) {
  return Object.values(errors).some(Boolean);
}
