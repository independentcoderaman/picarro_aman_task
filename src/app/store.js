import { configureStore } from '@reduxjs/toolkit';
import customerSettingsReducer from '../features/customer-settings/store/customerSettingsSlice';

export const store = configureStore({
  reducer: {
    customerSettings: customerSettingsReducer,
  },
});
