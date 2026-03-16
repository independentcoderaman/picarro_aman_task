export const PLAN_OPTIONS = ['Starter', 'Growth', 'Business', 'Enterprise'];

export const CUSTOMER_SETTINGS_DEFAULTS = {
  companyName: 'New Customer',
  plan: 'Starter',
  seatLimit: 10,
  contractMonths: 12,
};

export const CUSTOMER_SETTINGS_LIMITS = {
  companyNameMaxLength: 50,
  seatLimit: { min: 1, max: 500 },
  contractMonths: { min: 1, max: 36 },
};

export const CUSTOMER_SETTINGS_LABELS = {
  companyName: 'Company Name',
  plan: 'Plan',
  seatLimit: 'Seat Limit',
  contractMonths: 'Contract Length',
};

export const CUSTOMER_SETTINGS_TOAST_COPY = {
  saveSuccess: 'Settings saved successfully',
  saveError: 'Save failed — please try again',
  discard: 'Changes discarded',
};

export const CUSTOMER_SETTINGS_ERROR_COPY = {
  loadRetry: 'Unable to load settings right now.',
  loadFinal: 'Unable to load settings — please try again later.',
};

export const CUSTOMER_SETTINGS_DEMO_SCENARIOS = {
  'get-fail-once': {
    label: 'Demo mode: first load fails once',
    description: 'Use Retry once to recover and continue the happy path.',
  },
  'get-fail-always': {
    label: 'Demo mode: load keeps failing',
    description: 'This is useful for showing the terminal load error state.',
  },
  'save-fail-once': {
    label: 'Demo mode: first save fails once',
    description: 'This shows preserved form values and the error toast.',
  },
  'save-fail-always': {
    label: 'Demo mode: save always fails',
    description: 'This is useful for validating the edit-state recovery flow.',
  },
};
