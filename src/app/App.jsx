import { Suspense } from 'react';
import { AppProviders } from './providers';
import { AppRoutes } from './routes';
import { Loader } from '../shared/components/Loader/Loader';

function App() {
  return (
    <AppProviders>
      <Suspense fallback={<Loader fullPage label="Loading experience" />}>
        <AppRoutes />
      </Suspense>
    </AppProviders>
  );
}

export default App;

//this is root file where we start rendering our app and a global suspense 
// for all routes that are defined in app routes will get this loading loader
// Loader this is global component which will be used to show loader