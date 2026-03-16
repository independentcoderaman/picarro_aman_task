import { createAsyncThunk } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../../../shared/constants/app.constants';
import { getCustomerSettings, putCustomerSettings } from '../api/customerSettingsApi';
import { mapDraftToPayload } from '../utils/customerSettingsMappers';

/*
This file is responsible for fetching and updating the user response and the reason why we are using this async
thunk approach is because we have create single point for handling our mock apis through which I can handle the loading
error and success states, retry logics and keep my redux values updated with new response and update UI accordingly.
*/
export const fetchCustomerSettings = createAsyncThunk(
  'customerSettings/fetchCustomerSettings',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await getCustomerSettings(customerId);
      return { customerId, settings: response };
    } catch (error) {
      return rejectWithValue(error.message ?? 'Failed to load settings');
    }
  },
  {
    condition: (customerId, { getState }) => {
      const { customerSettings } = getState();

      return !(
        customerSettings.customerId === customerId &&
        customerSettings.fetchStatus === REQUEST_STATE.loading
      );
    },
  },
);

export const saveCustomerSettings = createAsyncThunk(
  'customerSettings/saveCustomerSettings',
  async ({ customerId, draft }, { rejectWithValue }) => {
    try {
      const payload = mapDraftToPayload(draft);
      const response = await putCustomerSettings(customerId, payload);
      return { customerId, settings: response };
    } catch (error) {
      return rejectWithValue(error.message ?? 'Failed to save settings');
    }
  },
);
