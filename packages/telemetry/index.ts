import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
export default function TelemetryInit() {
  Sentry.init({
    dsn: 'https://7cd0e0dbd94541d48efb8735ab256fb3@o1307130.ingest.sentry.io/6550664',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.25,

    beforeSend: (event) => {
      if (window.location.hostname === 'localhost') return null;

      return event;
    },
  });
}
