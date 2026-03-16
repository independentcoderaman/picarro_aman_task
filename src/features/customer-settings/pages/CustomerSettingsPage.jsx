import { useLocation } from 'react-router-dom';
import { Toast } from '../../../shared/components/Toast/Toast';
import { REQUEST_STATE } from '../../../shared/constants/app.constants';
import { useToast } from '../../../shared/hooks/useToast';
import { CustomerSettingsForm } from '../components/CustomerSettingsForm';
import { CustomerSettingsView } from '../components/CustomerSettingsView';
import { SettingsHeader } from '../components/SettingsHeader';
import { SettingsStatus } from '../components/SettingsStatus';
import { useCustomerSettings } from '../hooks/useCustomerSettings';
import { getActiveScenario, getScenarioDetails } from '../utils/mockScenario';
import {
  Card,
  Eyebrow,
  Frame,
  MetaCard,
  MetaGrid,
  MetaLabel,
  MetaValue,
  Page,
  ScenarioBanner,
  ScenarioText,
  ScenarioTitle,
} from './CustomerSettingsPage.styles';

function CustomerSettingsPage() {
  const location = useLocation();
  const {
    customerId,
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
  } = useCustomerSettings();

  const visibleToast = useToast(toast, handleDismissToast);
  const shouldShowStatus = state.fetchStatus !== REQUEST_STATE.succeeded;
  const activeScenario = getActiveScenario(location.search);
  const scenarioDetails = getScenarioDetails(location.search);
  const currentModeLabel = mode === 'edit' ? 'Editing' : 'Viewing';

  return (
    <Page>
      <Frame>
        <Card>
          <Eyebrow>Customer Settings Workspace</Eyebrow>
          <SettingsHeader
            customerId={customerId}
            mode={mode}
            onEdit={handleEnterEditMode}
          />

          <MetaGrid>
            <MetaCard>
              <MetaLabel>Customer</MetaLabel>
              <MetaValue>#{customerId}</MetaValue>
            </MetaCard>
            <MetaCard>
              <MetaLabel>Mode</MetaLabel>
              <MetaValue>{currentModeLabel}</MetaValue>
            </MetaCard>
            <MetaCard>
              <MetaLabel>Data Source</MetaLabel>
              <MetaValue>Mock API + Local Cache</MetaValue>
            </MetaCard>
          </MetaGrid>

          {scenarioDetails ? (
            <ScenarioBanner>
              <ScenarioTitle>{scenarioDetails.label}</ScenarioTitle>
              <ScenarioText>{scenarioDetails.description}</ScenarioText>
            </ScenarioBanner>
          ) : null}

          <SettingsStatus
            fetchStatus={state.fetchStatus}
            retryCount={state.retryCount}
            activeScenario={activeScenario}
            retryMeta={retryMeta}
            onRetry={handleRetry}
          />

          {!shouldShowStatus && mode === 'view' && savedSettings ? (
            <CustomerSettingsView settings={savedSettings} />
          ) : null}

          {!shouldShowStatus && mode === 'edit' && draft ? (
            <CustomerSettingsForm
              draft={draft}
              saveStatus={state.saveStatus}
              onFieldChange={handleUpdateField}
              onDiscard={handleDiscard}
              onSave={handleSave}
            />
          ) : null}
        </Card>
      </Frame>

      <Toast message={visibleToast?.message} variant={visibleToast?.variant} />
    </Page>
  );
}

export default CustomerSettingsPage;
