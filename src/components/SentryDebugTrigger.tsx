import { useState } from 'react';
import * as Sentry from '@sentry/react';
import { Bug, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SentryDebugTrigger() {
  const [status, setStatus] = useState<string | null>(null);

  const triggerTestError = () => {
    try {
      throw new Error('Sentry Test Error: Debug trigger activated from Landing Page');
    } catch (error) {
      Sentry.captureException(error);
      setStatus('Error captured & sent to Sentry!');
      setTimeout(() => setStatus(null), 4000);
    }
  };

  const triggerUnhandledError = () => {
    // This triggers an uncaught error to test global listener
    setTimeout(() => {
      throw new Error('Sentry Unhandled Exception: Global error test');
    }, 50);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 font-mono text-xs">
      {status && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/20 border border-accent/40 text-accent shadow-lg animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{status}</span>
        </div>
      )}
      
      <div className="flex items-center gap-1.5 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-lg p-1 shadow-2xl">
        <button
          onClick={triggerTestError}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          title="Captures a caught exception and sends it directly to Sentry"
        >
          <Bug className="w-3.5 h-3.5 text-accent" />
          <span>Test Sentry</span>
        </button>

        <button
          onClick={triggerUnhandledError}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-red-950/40 text-red-400/80 hover:text-red-400 transition-colors"
          title="Throws an unhandled error"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Throw</span>
        </button>
      </div>
    </div>
  );
}
