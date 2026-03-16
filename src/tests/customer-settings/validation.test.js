import { describe, expect, it } from 'vitest';
import {
  hasValidationErrors,
  validateCompanyName,
  validateCustomerSettings,
} from '../../shared/utils/validation';

describe('customer settings validation', () => {
  it('accepts a valid customer settings payload', () => {
    const errors = validateCustomerSettings({
      companyName: 'Northwind Labs',
      plan: 'Business',
      seatLimit: '75',
      contractMonths: '24',
    });

    expect(hasValidationErrors(errors)).toBe(false);
  });

  it('rejects an empty company name', () => {
    expect(validateCompanyName('   ')).toBe('This field is required');
  });

  it('rejects out-of-range numeric inputs', () => {
    const errors = validateCustomerSettings({
      companyName: 'Northwind Labs',
      plan: 'Business',
      seatLimit: '0',
      contractMonths: '40',
    });

    expect(errors.seatLimit).toBe('Value must be between 1 and 500');
    expect(errors.contractMonths).toBe('Value must be between 1 and 36');
  });
});
