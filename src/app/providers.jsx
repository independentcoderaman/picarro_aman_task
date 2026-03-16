import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './GlobalStyles';
import { store } from './store';
import { theme } from './theme';

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyles />
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

//All type of global providers are defined here like redux provider for state management
// theme provider for theme and global styles for global css styles. 
// This is the root component which will wrap all other components in the app.
