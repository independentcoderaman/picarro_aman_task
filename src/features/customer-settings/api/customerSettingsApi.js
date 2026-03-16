import { getCustomerSettingsRecord, updateCustomerSettingsRecord } from '../../../mocks/db/customerSettingsDb';
import { wait } from '../../../shared/utils/promises';
/*
Consider this file as your BE Controller, This file is sole responsible for apis that is mocking the flow of 
api how there is latency in real worl apis and then trigger the actual data collections 
*/
const GET_DELAY_MS = 900;
const PUT_DELAY_MS = 1200;
const scenarioAttemptCounts = {
  'get-fail-once': 0,
  'save-fail-once': 0,
};

function getActiveScenario() {
  if (typeof window === 'undefined') {
    return '';
  }

  const params = new URLSearchParams(window.location.search);
  return params.get('scenario') ?? '';
}

function shouldRejectRequest(requestType) {
  const activeScenario = getActiveScenario();

  if (requestType === 'get') {
    if (activeScenario === 'get-fail-always') {
      return true;
    }

    if (activeScenario === 'get-fail-once' && scenarioAttemptCounts['get-fail-once'] === 0) {
      scenarioAttemptCounts['get-fail-once'] += 1;
      return true;
    }
  }

  if (requestType === 'save') {
    if (activeScenario === 'save-fail-always') {
      return true;
    }

    if (activeScenario === 'save-fail-once' && scenarioAttemptCounts['save-fail-once'] === 0) {
      scenarioAttemptCounts['save-fail-once'] += 1;
      return true;
    }
  }

  return false;
}

export async function getCustomerSettings(customerId) {
  await wait(GET_DELAY_MS);

  if (shouldRejectRequest('get')) {
    throw new Error('Failed to load settings');
  }

  return getCustomerSettingsRecord(customerId);
}

export async function putCustomerSettings(customerId, payload) {
  await wait(PUT_DELAY_MS);

  if (shouldRejectRequest('save')) {
    throw new Error('Failed to save settings');
  }

  return updateCustomerSettingsRecord(customerId, payload);
}
