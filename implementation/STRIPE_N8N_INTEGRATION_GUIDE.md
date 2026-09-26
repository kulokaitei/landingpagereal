# Meridian — Stripe Payments & n8n Webhook Integration Guide

> Comprehensive operational guide for configuring Stripe Checkout, setting up product pricing, and forwarding real-time checkout webhooks directly into **n8n** automation workflows.

---

## 1. Overview & Architecture

When a client completes the diagnostic intake form on the website for the **Operations Transformation Plan**, the frontend submits their diagnostic and contact information to `/api/create-checkout-session`.

### Data Flow Diagram

```
[ Client Form Submission ]
         │
         │ (1) POST /api/create-checkout-session
         ▼
[ Serverless API Endpoint ]
         │
         │ (2) Creates Stripe Checkout Session
         │     - Attaches all form & diagnostic fields to Stripe `metadata`
         │     - Sets `customer_email`, success/cancel URLs
         ▼
[ Stripe Hosted Checkout ] ──> (Customer Pays with Card / Apple Pay / Google Pay)
         │
         │ (3) Event: `checkout.session.completed`
         ▼
[ Stripe Webhooks ]
         │
         │ (4) POST payload with `data.object.metadata`
         ▼
[ n8n Webhook Node ]
         │
         │ (5) Processes payload:
         │     - Stores lead in CRM / Database
         │     - Alerts Engineering Team (Slack/Email)
         │     - Automatically triggers customized roadmap generation
         ▼
[ Customer redirected back to Meridian with ?payment=success ]
```

---

## 2. Stripe Dashboard Setup

### Step 1: Create Product & Price in Stripe
1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Navigate to **Product Catalog** &rarr; click **Add Product**.
3. Fill in:
   - **Name:** `Meridian — Operations Transformation Plan`
   - **Description:** `Custom Operational Automation Architecture, Systems Integration, and Deployment Blueprint.`
   - **Pricing Model:** `One-off` (or Recurring if subscription).
   - **Price:** Enter your desired price (e.g., `$1,495.00` or `$2,500.00`).
4. Save the product and copy the generated **Price ID** (starts with `price_...`).

---

## 3. Environment Variables Configuration

In `.env.local` (for local development) and in your **Vercel Project Settings** &rarr; **Environment Variables** (for production):

```env
# Stripe Secret API Key (from Stripe Dashboard -> Developers -> API keys)
STRIPE_SECRET_KEY="sk_live_... (or sk_test_...)"

# Stripe Price ID created in Step 1
STRIPE_PRICE_ID="price_1XXXXXXXXXXXXXXX"

# (Optional) Stripe Publishable Key
VITE_STRIPE_PUBLISHABLE_KEY="pk_live_... (or pk_test_...)"

# n8n Automation Webhook URL (used if backup / direct API relay is needed)
N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/audit-intake"
```

> **Note:** If `STRIPE_SECRET_KEY` is not provided during local testing, the system automatically runs in **Simulation Mode**, cleanly redirecting with simulated transaction parameters so you can test without live keys.

---

## 4. Connecting Stripe Webhooks to n8n

### Step 1: Create Webhook in n8n
1. Open your **n8n editor**.
2. Add a **Webhook** trigger node:
   - **HTTP Method:** `POST`
   - **Path:** `stripe-checkout-completed`
   - **Response Mode:** `On Received` with status `200`
3. Copy the **Production Webhook URL** (e.g. `https://n8n.yourdomain.com/webhook/stripe-checkout-completed`).

### Step 2: Register Webhook in Stripe Dashboard
1. Go to **Stripe Dashboard** &rarr; **Developers** &rarr; **Webhooks** &rarr; **Add endpoint**.
2. Paste the **n8n Webhook URL** into **Endpoint URL**.
3. Select events to listen to:
   - ✅ `checkout.session.completed`
   - (Optional) `payment_intent.succeeded`
4. Save the endpoint.

---

## 5. Webhook Payload Structure in n8n

When `checkout.session.completed` fires, n8n receives the complete Stripe event. All custom diagnostic inputs and contact details are available inside `body.data.object.metadata`:

```json
{
  "event": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_a1b2c3d4e5",
      "customer_email": "jane@company.com",
      "amount_total": 149500,
      "currency": "usd",
      "payment_status": "paid",
      "metadata": {
        "firstName": "Jane",
        "lastName": "Doe",
        "fullName": "Jane Doe",
        "email": "jane@company.com",
        "company": "Acme Logistics Corp",
        "notes": "Need to sync ERP with PostgreSQL warehouse database",
        "bottleneck": "data_sync",
        "volume": "high",
        "techStack": "enterprise_erp",
        "plan": "Transformation Plan",
        "source": "meridian_diagnostic_intake",
        "gdprConsent": "true",
        "timestamp": "2026-09-26T13:00:00.000Z"
      }
    }
  }
}
```

### In n8n Expressions:
- Customer Name: `{{ $json.body.data.object.metadata.fullName }}`
- Customer Email: `{{ $json.body.data.object.customer_email }}`
- Bottleneck: `{{ $json.body.data.object.metadata.bottleneck }}`
- Tech Stack: `{{ $json.body.data.object.metadata.techStack }}`
- Manual Hours / Volume: `{{ $json.body.data.object.metadata.volume }}`
- Project Notes: `{{ $json.body.data.object.metadata.notes }}`
- Payment Amount: `{{ $json.body.data.object.amount_total / 100 }} USD`
- Stripe Session ID: `{{ $json.body.data.object.id }}`

---

## 6. Verification & Test Plan

1. **Local Dev Test:**
   - Submit the diagnostic form on `http://localhost:5174/#request-audit`.
   - Form redirects through the simulated or real Stripe Checkout.
   - On completion, returns to `http://localhost:5174/?payment=success` showing the confirmed status pill and reference ID.
2. **Stripe Test Mode:**
   - Put test keys `sk_test_...` in `.env.local`.
   - Submit form & enter test card `4242 4242 4242 4242`.
   - Inspect event in Stripe Dashboard &rarr; Developers &rarr; Events & confirm n8n Webhook 200 OK.
