import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App.tsx';
import './index.css';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN || 'https://161794681cde2f697b90a7ddf386fa21@o4512129843593216.ingest.de.sentry.io/4512129853423696';

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
      Sentry.feedbackIntegration({
        colorScheme: 'dark',
        isNameRequired: true,
        isEmailRequired: true,
        buttonLabel: 'Report Issue',
        formTitle: 'Give Feedback',
      }),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary
      fallback={({ error }) => (
        <div className="min-h-screen bg-[#0A0A0C] text-neutral-200 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-neutral-400 max-w-md mb-6">
            An unexpected error occurred. Our team has been notified automatically via Sentry.
          </p>
          <pre className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-red-400 max-w-xl overflow-auto text-left mb-6">
            {error instanceof Error ? error.message : String(error)}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
          >
            Reload Page
          </button>
        </div>
      )}
      showDialog
    >
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
);
