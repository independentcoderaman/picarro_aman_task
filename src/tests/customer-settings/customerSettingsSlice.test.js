import { describe, expect, it } from 'vitest';
import reducer, {
  clearToast,
  discardDraftChanges,
  enterEditMode,
  updateDraftField,
} from '../../features/customer-settings/store/customerSettingsSlice';
import { fetchCustomerSettings, saveCustomerSettings } from '../../features/customer-settings/store/customerSettingsThunks';
import {
  CUSTOMER_SETTINGS_TOAST_COPY,
} from '../../features/customer-settings/constants/customerSettings.constants';
import { TOAST_VARIANTS } from '../../shared/constants/app.constants';

describe('customerSettingsSlice', () => {
  it('enters edit mode from a loaded state', () => {
    const pendingState = reducer(
      undefined,
      fetchCustomerSettings.pending('request-1', '1001'),
    );

    const loadedState = reducer(
      pendingState,
      fetchCustomerSettings.fulfilled(
        {
          customerId: '1001',
          settings: {
            companyName: 'New Customer',
            plan: 'Starter',
            seatLimit: 10,
            contractMonths: 12,
          },
        },
        'request-1',
        '1001',
      ),
    );

    const nextState = reducer(loadedState, enterEditMode());

    expect(nextState.mode).toBe('edit');
    expect(nextState.draft.companyName).toBe('New Customer');
  });

  it('restores the last saved draft when changes are discarded', () => {
    const pendingState = reducer(
      undefined,
      fetchCustomerSettings.pending('request-2', '1001'),
    );

    const loadedState = reducer(
      pendingState,
      fetchCustomerSettings.fulfilled(
        {
          customerId: '1001',
          settings: {
            companyName: 'New Customer',
            plan: 'Starter',
            seatLimit: 10,
            contractMonths: 12,
          },
        },
        'request-2',
        '1001',
      ),
    );

    const editingState = reducer(loadedState, enterEditMode());
    const dirtyState = reducer(
      editingState,
      updateDraftField({ field: 'companyName', value: 'Changed Name' }),
    );

    const discardedState = reducer(dirtyState, discardDraftChanges());

    expect(discardedState.mode).toBe('view');
    expect(discardedState.draft.companyName).toBe('New Customer');
    expect(discardedState.toast.message).toBe(CUSTOMER_SETTINGS_TOAST_COPY.discard);
    expect(discardedState.toast.variant).toBe(TOAST_VARIANTS.info);
  });

  it('returns to view mode after a successful save', () => {
    const fetchPendingState = reducer(
      undefined,
      fetchCustomerSettings.pending('request-3', '1001'),
    );

    const loadedState = reducer(
      fetchPendingState,
      fetchCustomerSettings.fulfilled(
        {
          customerId: '1001',
          settings: {
            companyName: 'New Customer',
            plan: 'Starter',
            seatLimit: 10,
            contractMonths: 12,
          },
        },
        'request-3',
        '1001',
      ),
    );

    const savingState = reducer(
      loadedState,
      saveCustomerSettings.pending('request-4', {
        customerId: '1001',
        draft: {
          companyName: 'Picarro Renewed',
          plan: 'Enterprise',
          seatLimit: '200',
          contractMonths: '36',
        },
      }),
    );

    const savedState = reducer(
      savingState,
      saveCustomerSettings.fulfilled(
        {
          customerId: '1001',
          settings: {
            companyName: 'Picarro Renewed',
            plan: 'Enterprise',
            seatLimit: 200,
            contractMonths: 36,
          },
        },
        'request-4',
        {
          customerId: '1001',
          draft: {
            companyName: 'Picarro Renewed',
            plan: 'Enterprise',
            seatLimit: '200',
            contractMonths: '36',
          },
        },
      ),
    );

    expect(savedState.mode).toBe('view');
    expect(savedState.lastSaved.companyName).toBe('Picarro Renewed');
    expect(savedState.toast.message).toBe(CUSTOMER_SETTINGS_TOAST_COPY.saveSuccess);
    expect(savedState.toast.variant).toBe(TOAST_VARIANTS.success);
  });

  it('keeps the user in edit mode and shows an error toast when save fails', () => {
    const fetchPendingState = reducer(
      undefined,
      fetchCustomerSettings.pending('request-5', '1001'),
    );

    const loadedState = reducer(
      fetchPendingState,
      fetchCustomerSettings.fulfilled(
        {
          customerId: '1001',
          settings: {
            companyName: 'New Customer',
            plan: 'Starter',
            seatLimit: 10,
            contractMonths: 12,
          },
        },
        'request-5',
        '1001',
      ),
    );

    const editingState = reducer(loadedState, enterEditMode());

    const savingState = reducer(
      editingState,
      saveCustomerSettings.pending('request-6', {
        customerId: '1001',
        draft: {
          companyName: 'Changed Name',
          plan: 'Growth',
          seatLimit: '25',
          contractMonths: '18',
        },
      }),
    );

    const failedState = reducer(
      savingState,
      saveCustomerSettings.rejected(
        new Error('Failed to save settings'),
        'request-6',
        {
          customerId: '1001',
          draft: {
            companyName: 'Changed Name',
            plan: 'Growth',
            seatLimit: '25',
            contractMonths: '18',
          },
        },
        'Failed to save settings',
      ),
    );

    expect(failedState.mode).toBe('edit');
    expect(failedState.draft.companyName).toBe('New Customer');
    expect(failedState.toast.message).toBe(CUSTOMER_SETTINGS_TOAST_COPY.saveError);
    expect(failedState.toast.variant).toBe(TOAST_VARIANTS.error);
  });

  it('clears toast state when dismiss action is dispatched', () => {
    const stateWithToast = {
      customerId: '1001',
      mode: 'view',
      fetchStatus: 'succeeded',
      saveStatus: 'succeeded',
      fetchError: '',
      retryCount: 0,
      currentFetchRequestId: null,
      currentSaveRequestId: null,
      lastSaved: {
        companyName: 'New Customer',
        plan: 'Starter',
        seatLimit: 10,
        contractMonths: 12,
      },
      draft: {
        companyName: 'New Customer',
        plan: 'Starter',
        seatLimit: '10',
        contractMonths: '12',
      },
      toast: {
        id: 1,
        message: CUSTOMER_SETTINGS_TOAST_COPY.saveSuccess,
        variant: TOAST_VARIANTS.success,
      },
    };

    const clearedState = reducer(stateWithToast, clearToast());

    expect(clearedState.toast).toBeNull();
  });
});
