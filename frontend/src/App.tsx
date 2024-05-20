import { ColorSchemeScript, LoadingOverlay, MantineProvider } from '@mantine/core';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { Router } from './Router';
import { Fallback } from './components';
import { theme } from './theme';

export default function App() {
  const logError = () => {
    // could be used to push to a logging service for central logging;
  };

  return (
    <ErrorBoundary fallbackRender={Fallback} onError={logError}>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider theme={theme} forceColorScheme="dark">
        <Suspense fallback={<LoadingOverlay visible />}>
          <Router />
        </Suspense>
      </MantineProvider>
    </ErrorBoundary>
  );
}
