# Sentry Quick Setup Guide (React + Vite)

> **Goal**: Connect error tracking and user feedback loops to `kulokaitei/landingpagereal` in under 5 minutes.
> **Tracking Issue**: [Issue #2](https://github.com/kulokaitei/landingpagereal/issues/2)

---

## 1. Create Sentry Account & Project

1. Go to **[sentry.io/signup](https://sentry.io/signup/)** and create an account (or sign in with GitHub).
2. Create an **Organization** (e.g., `landingpagereal-team`).
3. Click **Projects** → **Create Project**:
   - **Platform**: Select **React**.
   - **Project Name**: `landingpagereal-frontend`.
   - **Alert Frequency**: Set to default ("Alert me on every new issue").
4. Click **Create Project**.

---

## 2. Get Your DSN

1. In Sentry, go to **Settings** → **Projects** → `landingpagereal-frontend` → **Client Keys (DSN)**.
2. Copy the **DSN URL** (looks like `https://abcdef123456@o123456.ingest.sentry.io/7890123`).
3. Add it to your `.env` (or `.env.local`) file:
   ```env
   VITE_SENTRY_DSN=https://your-dsn-key-here@o000000.ingest.sentry.io/0000000
   ```

---

## 3. Install Sentry SDK

Run in project root:
```bash
npm install @sentry/react
```

---

## 4. Initialize Sentry in `src/main.tsx`

Add the following initialization at the very top of `src/main.tsx`:

```tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
      // User Feedback Widget Integration
      Sentry.feedbackIntegration({
        colorScheme: "dark",
        isNameRequired: true,
        isEmailRequired: true,
        buttonLabel: "Report Issue",
        formTitle: "Give Feedback",
      }),
    ],
    // Tracing sample rate (1.0 = 100% of transactions in dev/staging)
    tracesSampleRate: 1.0,
    // Session Replay sample rate
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
```

---

## 5. Enable User Feedback Loops

With `Sentry.feedbackIntegration()` initialized above, a subtle feedback widget automatically appears on your page.

To also trigger a feedback dialog automatically whenever an unhandled error happens, you can wrap your root component with `Sentry.ErrorBoundary`:

```tsx
<Sentry.ErrorBoundary fallback={<p>Something went wrong. Our team has been notified.</p>} showDialog>
  <App />
</Sentry.ErrorBoundary>
```

---

## 6. Verify the Setup

Add a temporary test button in your app to verify transmission:

```tsx
<button
  onClick={() => {
    throw new Error("Sentry Test Error from Landing Page!");
  }}
>
  Break the World (Test Sentry)
</button>
```

1. Click the button in your local dev server (`npm run dev`).
2. Open your Sentry dashboard → **Issues**.
3. You should see `Sentry Test Error from Landing Page!` appear within seconds.

---

## 📌 Checklist for AI Agent / Dev
- [ ] Created Sentry project.
- [ ] Saved DSN to `.env.local`.
- [ ] Installed `@sentry/react`.
- [ ] Added Sentry init in `src/main.tsx`.
- [ ] Triggered test error and confirmed in Sentry Dashboard.
- [ ] Closed [Issue #2](https://github.com/kulokaitei/landingpagereal/issues/2) with resolution comment.
