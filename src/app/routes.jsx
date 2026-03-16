import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const CustomerSettingsPage = lazy(() =>
  import('../features/customer-settings/pages/CustomerSettingsPage'),
);

function NotFoundPage() {
  return <Navigate to="/customers/1001/settings" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/customers/1001/settings" replace />} />
      <Route path="/customers/:id/settings" element={<CustomerSettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

//This is our routes file where we define all our routes
