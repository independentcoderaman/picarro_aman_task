import { sanitizeCustomerSettingsDraft } from '../../../shared/utils/sanitization';

export function mapSettingsToDraft(settings) {
  return {
    companyName: settings.companyName ?? '',
    plan: settings.plan ?? 'Starter',
    seatLimit: String(settings.seatLimit ?? ''),
    contractMonths: String(settings.contractMonths ?? ''),
  };
}

export function mapDraftToPayload(draft) {
  return sanitizeCustomerSettingsDraft(draft);
}
