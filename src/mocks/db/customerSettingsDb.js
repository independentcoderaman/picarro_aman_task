import customerSettingsSeed from '../data/customerSettings.json';
import { CUSTOMER_SETTINGS_DEFAULTS } from '../../features/customer-settings/constants/customerSettings.constants';
import { STORAGE_KEYS } from '../../shared/constants/app.constants';
import { readFromStorage, writeToStorage } from '../../shared/utils/storage';

let customerSettingsDb = null;

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function ensureDb() {
  if (customerSettingsDb) {
    return customerSettingsDb;
  }

  const persistedValue = readFromStorage(STORAGE_KEYS.customerSettings, customerSettingsSeed);
  customerSettingsDb = cloneValue(persistedValue);
  return customerSettingsDb;
}

function persistDb() {
  writeToStorage(STORAGE_KEYS.customerSettings, customerSettingsDb);
}

export function getCustomerSettingsRecord(customerId) {
  const db = ensureDb();
  return cloneValue(db[customerId] ?? CUSTOMER_SETTINGS_DEFAULTS);
}

export function updateCustomerSettingsRecord(customerId, nextSettings) {
  const db = ensureDb();

  db[customerId] = {
    ...CUSTOMER_SETTINGS_DEFAULTS,
    ...nextSettings,
  };

  persistDb();
  return cloneValue(db[customerId]);
}


/*Consider this file as your DB Layer or Service FIles on BE
If you look this file is fully responsible to act as db where db is nothing but our localhost which is used to persist data in our app.
This file has two main functions getCustomerSettingsRecord and updateCustomerSettingsRecord which are used to get and update customer settings respectively.
We are using local storage to persist data in our app and we have a seed data which is used to initialize our db.*/