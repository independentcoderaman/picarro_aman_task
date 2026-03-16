import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  clearToast,
  discardDraftChanges,
  enterEditMode,
  updateDraftField,
} from '../store/customerSettingsSlice';
import { fetchCustomerSettings, saveCustomerSettings } from '../store/customerSettingsThunks';
import {
  selectCustomerSettingsDraft,
  selectCustomerSettingsMode,
  selectCustomerSettingsSaved,
  selectCustomerSettingsState,
  selectCustomerSettingsToast,
} from '../store/customerSettingsSelectors';
import { getActiveScenario } from '../utils/mockScenario';
import { useRetryLimiter } from './useRetryLimiter';
/* 
This hook is purely for getting the states related to customer settings let it be your form or outside the form
*/
export function useCustomerSettings() {
  const { id = '1001' } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector(selectCustomerSettingsState);
  const mode = useSelector(selectCustomerSettingsMode);
  const draft = useSelector(selectCustomerSettingsDraft);
  const savedSettings = useSelector(selectCustomerSettingsSaved);
  const toast = useSelector(selectCustomerSettingsToast);
  const activeScenario = getActiveScenario(location.search);
  const { retryMeta, trackAttempt } = useRetryLimiter(activeScenario === 'get-fail-always');

  useEffect(() => {
    if (state.customerId === id && state.fetchStatus !== 'idle') {
      return;
    }

    dispatch(fetchCustomerSettings(id));
  }, [dispatch, id, state.customerId, state.fetchStatus]);

  const handleRetry = useCallback(() => {
    if (activeScenario === 'get-fail-always') {
      const nextSnapshot = trackAttempt();

      if (nextSnapshot.isBlocked) {
        return;
      }
    }

    dispatch(fetchCustomerSettings(id));
  }, [activeScenario, dispatch, id, trackAttempt]);

  const handleEnterEditMode = useCallback(() => {
    dispatch(enterEditMode());
  }, [dispatch]);

  const handleUpdateField = useCallback(
    (field, value) => {
      dispatch(updateDraftField({ field, value }));
    },
    [dispatch],
  );

  const handleDiscard = useCallback(() => {
    dispatch(discardDraftChanges());
  }, [dispatch]);

  const handleSave = useCallback(() => {
    dispatch(saveCustomerSettings({ customerId: id, draft }));
  }, [dispatch, draft, id]);

  const handleDismissToast = useCallback(() => {
    dispatch(clearToast());
  }, [dispatch]);

  return {
    customerId: id,
    state,
    mode,
    draft,
    savedSettings,
    toast,
    retryMeta,
    handleRetry,
    handleEnterEditMode,
    handleUpdateField,
    handleDiscard,
    handleSave,
    handleDismissToast,
  };
}
