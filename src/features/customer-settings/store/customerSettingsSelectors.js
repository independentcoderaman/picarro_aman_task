export const selectCustomerSettingsState = (state) => state.customerSettings;
export const selectCustomerSettingsMode = (state) => state.customerSettings.mode;
export const selectCustomerSettingsDraft = (state) => state.customerSettings.draft;
export const selectCustomerSettingsSaved = (state) => state.customerSettings.lastSaved;
export const selectCustomerSettingsToast = (state) => state.customerSettings.toast;
