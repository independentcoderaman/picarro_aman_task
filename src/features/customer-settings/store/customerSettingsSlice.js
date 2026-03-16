import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE, TOAST_VARIANTS } from '../../../shared/constants/app.constants';
import { CUSTOMER_SETTINGS_TOAST_COPY } from '../constants/customerSettings.constants';
import { mapSettingsToDraft } from '../utils/customerSettingsMappers';
import { fetchCustomerSettings, saveCustomerSettings } from './customerSettingsThunks';

const initialState = {
  customerId: null,
  mode: 'view',
  fetchStatus: REQUEST_STATE.idle,
  saveStatus: REQUEST_STATE.idle,
  fetchError: '',
  retryCount: 0,
  currentFetchRequestId: null,
  currentSaveRequestId: null,
  lastSaved: null,
  draft: null,
  toast: null,
};

const customerSettingsSlice = createSlice({
  name: 'customerSettings',
  initialState,
  reducers: {
    enterEditMode(state) {
      state.mode = 'edit';
      state.saveStatus = REQUEST_STATE.idle;
      state.draft = mapSettingsToDraft(state.lastSaved);
    },
    updateDraftField(state, action) {
      const { field, value } = action.payload;

      if (!state.draft) {
        return;
      }

      state.draft[field] = value;
    },
    discardDraftChanges(state) {
      state.mode = 'view';
      state.draft = mapSettingsToDraft(state.lastSaved);
      state.toast = {
        id: Date.now(),
        variant: TOAST_VARIANTS.info,
        message: CUSTOMER_SETTINGS_TOAST_COPY.discard,
      };
    },
    clearToast(state) {
      state.toast = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerSettings.pending, (state, action) => {
        state.customerId = action.meta.arg;
        state.fetchStatus = REQUEST_STATE.loading;
        state.fetchError = '';
        state.currentFetchRequestId = action.meta.requestId;
      })
      .addCase(fetchCustomerSettings.fulfilled, (state, action) => {
        if (state.currentFetchRequestId !== action.meta.requestId) {
          return;
        }

        state.customerId = action.payload.customerId;
        state.fetchStatus = REQUEST_STATE.succeeded;
        state.fetchError = '';
        state.retryCount = 0;
        state.currentFetchRequestId = null;
        state.lastSaved = action.payload.settings;
        state.draft = mapSettingsToDraft(action.payload.settings);
        state.mode = 'view';
      })
      .addCase(fetchCustomerSettings.rejected, (state, action) => {
        if (state.currentFetchRequestId !== action.meta.requestId) {
          return;
        }

        state.fetchStatus = REQUEST_STATE.failed;
        state.fetchError = action.payload ?? 'Failed to load settings';
        state.currentFetchRequestId = null;
        state.retryCount += 1;
      })
      .addCase(saveCustomerSettings.pending, (state, action) => {
        state.saveStatus = REQUEST_STATE.loading;
        state.currentSaveRequestId = action.meta.requestId;
      })
      .addCase(saveCustomerSettings.fulfilled, (state, action) => {
        if (state.currentSaveRequestId !== action.meta.requestId) {
          return;
        }

        state.saveStatus = REQUEST_STATE.succeeded;
        state.currentSaveRequestId = null;
        state.lastSaved = action.payload.settings;
        state.draft = mapSettingsToDraft(action.payload.settings);
        state.mode = 'view';
        state.toast = {
          id: Date.now(),
          variant: TOAST_VARIANTS.success,
          message: CUSTOMER_SETTINGS_TOAST_COPY.saveSuccess,
        };
      })
      .addCase(saveCustomerSettings.rejected, (state, action) => {
        if (state.currentSaveRequestId !== action.meta.requestId) {
          return;
        }

        state.saveStatus = REQUEST_STATE.failed;
        state.currentSaveRequestId = null;
        state.toast = {
          id: Date.now(),
          variant: TOAST_VARIANTS.error,
          message: CUSTOMER_SETTINGS_TOAST_COPY.saveError,
        };
      });
  },
});

export const { enterEditMode, updateDraftField, discardDraftChanges, clearToast } =
  customerSettingsSlice.actions;

export default customerSettingsSlice.reducer;
