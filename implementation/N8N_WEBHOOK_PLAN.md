# Implementation Plan: N8N Webhook Integration & Audit Intake Flow

**Document Path:** `implementation/N8N_WEBHOOK_PLAN.md`  
**Author:** Antigravity Engineering  
**Status:** Ready for Review & Execution  

---

## 1. Executive Summary & Goals

The objective is to replace the current static lead capture / placeholder action in the diagnostic intake flow with an automated, production-ready pipeline connecting directly to an **n8n workflow webhook**.

### Key Deliverables:
1. **Interactive Diagnostic Flow**: Ensure a smooth 3-question diagnostic assessment followed by lead contact collection.
2. **Required Lead Fields**: Collect **First Name**, **Last Name**, **Work Email**, optional **Company/Stack Context**, and an explicit **GDPR Compliance Checkbox**.
3. **CTA Button**: Clear action button labeled **"Get My Full Audit RoadMap"**.
4. **Vercel Serverless Proxy (`/api/submit-audit`)**: An API route acting as a secure intermediary between the client browser and n8n to eliminate browser CORS limitations and protect webhook endpoints.
5. **Vite Local Dev Bridge**: Seamless local testing support with Vite dev server proxy/middleware.
6. **Environment Variables**: Secure configuration using `N8N_WEBHOOK_URL` in `.env.local` (local) and Vercel Project Settings (production).

---

## 2. Architecture & Data Flow Diagram

```
[ User Browser (React / Vite) ]
        │
        │ 1. Completes 3 Diagnostic Questions
        │ 2. Fills First Name, Last Name, Email, GDPR Check
        │ 3. Clicks "Get My Full Audit RoadMap"
        ▼
[ POST /api/submit-audit ] (Vercel Serverless Function)
        │
        │ • Validates payload & GDPR consent (rejection if false)
        │ • Sanitizes strings & checks rate / honeypot
        │ • Injects server timestamp & request metadata
        │ • Reads process.env.N8N_WEBHOOK_URL
        ▼
[ N8N Webhook Endpoint ]
        │
        │ • Webhook Trigger Node
        │ • Process Lead Data & Diagnostic Scores
        │ • Notify Team (Slack/Email) & Auto-dispatch Custom Roadmap / CRM Entry
        ▼
[ 200 OK Response ] ──> [ React UI Confirmation State ]
```

---

## 3. UI / UX Specification & Form Flow

### Step 1: Primary Operational Friction (Question 1)
- **Prompt:** "Where is your team's most severe operational bottleneck?"
- **Options:**
  1. *Cross-Tool Data Sync & ERP Entry* (Manual copy-paste between CRM, ERP, and databases)
  2. *Unstructured Document & Invoice Triage* (PDF orders, invoices, claims, and contract parsing)
  3. *Order, Inventory & Fulfillment Logistics* (Vendor inventory sync, multi-warehouse routing)
  4. *Custom Legacy System Integration* (Bridging internal proprietary tools & APIs)

### Step 2: Operational Volume & Waste (Question 2)
- **Prompt:** "Approximately how many manual team hours are consumed weekly?"
- **Options:**
  1. *5 – 15 Hours / Week* (Single department friction)
  2. *15 – 40 Hours / Week* (Multiple staff members involved)
  3. *40 – 100+ Hours / Week* (Core operational bottleneck)

### Step 3: Current Core Systems & Tech Stack (Question 3)
- **Prompt:** "What is your primary tech stack / operating ecosystem?"
- **Options:**
  1. *Enterprise ERP & CRM* (NetSuite, Salesforce, HubSpot, SAP)
  2. *Modern Cloud & Database Stack* (PostgreSQL, Supabase, Airtable, Notion, Custom APIs)
  3. *E-commerce & Logistics Platforms* (Shopify Plus, Amazon FBA, ShipStation, WMS)
  4. *Spreadsheets & Legacy On-Prem* (Excel/Google Sheets, legacy desktop software, email-driven)

### Step 4: Contact Capture & GDPR Consent
- **First Name** (Required, `text`)
- **Last Name** (Required, `text`)
- **Work Email** (Required, `email` format validation)
- **Company Name** (Optional/Recommended, `text`)
- **Specific Tools or Notes** (Optional, `textarea`)
- **GDPR Compliance Checkbox** (Required `boolean`):
  - Label: *"I consent to the processing of my personal data to receive my tailored automation audit roadmap in accordance with the Privacy Policy."*
- **Honeypot Anti-Spam Field** (Hidden `input` named `website_hp` to silently catch bot submissions).
- **CTA Button**: **"Get My Full Audit RoadMap"** (with active loading spinner and disabled state on submit).

---

## 4. API & Webhook Payload Specification

### Client to Vercel API (`POST /api/submit-audit`)
```json
{
  "firstName": "Alex",
  "lastName": "Vance",
  "email": "alex.vance@blackmesa.com",
  "company": "Black Mesa Operations",
  "notes": "Looking to connect NetSuite with custom PostgreSQL database",
  "gdprConsent": true,
  "diagnostic": {
    "bottleneck": "data_sync",
    "volume": "high",
    "techStack": "enterprise_erp"
  },
  "source": "landing_page_diagnostic",
  "submittedAt": "2026-09-25T22:00:00.000Z"
}
```

### Vercel Serverless Function to n8n Webhook (`POST ${N8N_WEBHOOK_URL}`)
```json
{
  "event": "audit_roadmap_requested",
  "submissionId": "audit_1727301600_abc123",
  "timestamp": "2026-09-25T22:00:00.000Z",
  "contact": {
    "firstName": "Alex",
    "lastName": "Vance",
    "fullName": "Alex Vance",
    "email": "alex.vance@blackmesa.com",
    "company": "Black Mesa Operations",
    "notes": "Looking to connect NetSuite with custom PostgreSQL database"
  },
  "diagnostic": {
    "bottleneck": {
      "id": "data_sync",
      "label": "Cross-Tool Data Sync & ERP Entry"
    },
    "volume": {
      "id": "high",
      "label": "40 – 100+ Hours / Week"
    },
    "techStack": {
      "id": "enterprise_erp",
      "label": "Enterprise ERP & CRM"
    }
  },
  "compliance": {
    "gdprConsent": true,
    "consentTimestamp": "2026-09-25T22:00:00.000Z",
    "consentText": "I consent to the processing of my personal data to receive my tailored automation audit roadmap in accordance with the Privacy Policy."
  },
  "metadata": {
    "sourceUrl": "https://...",
    "userAgent": "Mozilla/5.0 ...",
    "clientIp": "192.0.2.1"
  }
}
```

---

## 5. File Changes & Implementation Steps

### Phase 1: Environment Configuration
- [ ] Create/Update `.env.local` and `.env.example` with `N8N_WEBHOOK_URL`.
- [ ] Ensure `.env.local` is ignored in `.gitignore` to prevent secret leaks.

### Phase 2: Vercel Serverless Endpoint & Vite Local Dev Support
- [ ] Create `api/submit-audit.js` conforming to Vercel Serverless Functions.
  - Implements input validation, email formatting check, GDPR verification.
  - Honeypot filter check.
  - Standardized JSON error and success responses.
  - Forwards data via `fetch()` to `process.env.N8N_WEBHOOK_URL` with a 10-second timeout.
- [ ] Configure `vite.config.ts` with a dev middleware handler for `/api/submit-audit` so development works smoothly with `npm run dev`.

### Phase 3: Interactive Diagnostic Form Component (`FinalCTA.jsx`)
- [ ] Refactor `FinalCTA.jsx` into a 4-step wizard:
  - Step 1: Bottleneck Question
  - Step 2: Volume Question
  - Step 3: Tech Stack Question
  - Step 4: Contact & GDPR Consent Form
- [ ] Add state variables: `firstName`, `lastName`, `email`, `company`, `notes`, `gdprConsent`, `techStack`.
- [ ] Update submit button text to **"Get My Full Audit RoadMap"**.
- [ ] Add error alert handling (e.g. invalid submission, network error, retry prompt).
- [ ] Polish the success state with confirmation details.

### Phase 4: Error Tracking & Reliability
- [ ] Instrument with `@sentry/react` to capture any unexpected client-side API submission failures without breaking UX.

---

## 6. Testing & Verification Checklist

| Test Scenario | Expected Outcome |
|---|---|
| **Happy Path Submission** | All fields valid, GDPR checked -> POST `/api/submit-audit` -> 200 OK -> UI shows success screen with confirmation. |
| **Missing GDPR Consent** | Form blocks submission with inline validation notice. |
| **Invalid Email Format** | Form displays clear feedback and prevents POST. |
| **Missing First/Last Name** | Native & custom validation flags required fields. |
| **n8n Endpoint Down / Timeout** | Vercel API catches error after timeout -> Returns 502/504 -> UI shows user-friendly retry message. |
| **Honeypot Triggered** | Vercel API silently returns 200 OK without forwarding to n8n (anti-spam). |
| **Local Dev Verification** | Submissions in `localhost:5173` successfully route through Vite dev server to the configured webhook. |

---

## 7. Recommended Next Actions
Once approved, we will:
1. Create `api/submit-audit.js` and update `vite.config.ts`.
2. Update `.env.local` and `.env.example`.
3. Update `src/components/FinalCTA.jsx` with the 3 diagnostic questions, First/Last name inputs, GDPR checkbox, and the "Get My Full Audit RoadMap" button.
4. Verify the complete interaction end-to-end.
