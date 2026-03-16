import { CUSTOMER_SETTINGS_DEMO_SCENARIOS } from '../constants/customerSettings.constants';

export function getActiveScenario(search = '') {
  if (!search) {
    return '';
  }

  const params = new URLSearchParams(search);
  const scenario = params.get('scenario') ?? '';

  return CUSTOMER_SETTINGS_DEMO_SCENARIOS[scenario] ? scenario : '';
}

export function getScenarioDetails(search = '') {
  const activeScenario = getActiveScenario(search);
  return activeScenario ? CUSTOMER_SETTINGS_DEMO_SCENARIOS[activeScenario] : null;
}
