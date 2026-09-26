# Lithuanian Language Translation & Localization Implementation Plan (`lithuanian.md`)

> **Objective:** Full localization of the Meridian landing page, interactive components, diagnostic intake wizard, ROI calculator, error/success states, and metadata into clear, professional, modern Lithuanian, maintaining the brand's industrial engineering and high-tech operational tone.

---

## 1. Terminology & Glossary Mapping (Brand Tone Alignment)

To preserve the authoritative B2B engineering tone, we use precise business and technical terms rather than overly literal machine translations:

| English Original | Lithuanian Translation | Context & Notes |
| :--- | :--- | :--- |
| **Operational Automation Engineering** | *Operacijų automatizavimo inžinerija* | Main brand tagline & subtitle |
| **Ops Engine** | *Operacijų variklis* (arba paliekama *Ops Engine*) | Header badge / system label |
| **Automation Audit** | *Procesų automatizavimo auditas* | Main service offering |
| **Architectural Blueprint** | *Architektūrinis planas / schema* | Deliverable output |
| **ROI / Savings** | *Investicijų grąža (ROI) / Sutaupytos valandos* | Calculator & metric readouts |
| **Workflow Bottleneck** | *Veiklos / procesų „butelio kaklelis“ (trukdis)* | Diagnostic wizard choice |
| **Legacy Systems** | *Pasenusios / vidinės sistemos* | Tech stack descriptor |
| **Cross-Tool Data Sync** | *Duomenų sinchronizavimas tarp sistemų* | Workflow category |
| **Unstructured Document Triage** | *Nestruktūrizuotų dokumentų ir sąskaitų apdorojimas* | Workflow category |
| **Mutual NDA Pre-Signed** | *Išankstinė abipusė konfidencialumo sutartis (NDA)* | Trust badge |
| **Request Audit / Get Blueprint** | *Gauti audito planą / Užsakyti auditą* | Primary CTA buttons |

---

## 2. Scope of Translation & Component Breakdown

### A. Document Root & Global SEO (`index.html`)
- [ ] `<html lang="en">` → `<html lang="lt">`
- [ ] `<title>`: "Meridian — Operacijų automatizavimo inžinerija"
- [ ] `<meta name="description">`: "Kuriame patikimas ir praktiškas automatizavimo sistemas, pašalinančias rankinį darbą ir operacinius trukdžius versle."
- [ ] Open Graph & Twitter meta tags descriptions.

---

### B. Core Navigation & Header (`src/components/Nav.jsx`)
- [ ] Logo subtitle: `Ops Engine`
- [ ] Navigation Links:
  - *ROI Calculator* → **ROI Skaičiuoklė**
  - *Before/After* → **Palyginimas**
  - *Case Studies* → **Pavyzdžiai**
  - *Process* → **Procesas**
  - *Request Audit* → **Gauti auditą**

---

### C. Hero & Credibility (`src/components/Hero.jsx` & `Credibility.jsx`)
- [ ] Badge: *Sisteminis operacijų mastelio didinimas*
- [ ] Main Headline & Subheadline: Focus on replacing fragmented manual workflows with resilient, automated data pipelines.
- [ ] Metric Cards & Authority stats (Hours saved per week, error reduction percentage, deployment speed).
- [ ] CTA buttons & social proof chips.

---

### D. Workflow Comparison & System Schematics (`WorkflowComparison.jsx`, `SystemSchematic.jsx`)
- [ ] Tab Switchers: *Prieš (Rankiniai procesai)* vs *Po (Meridian automatizavimas)*.
- [ ] Flowchart nodes: Data ingestion, OCR/validation, ERP insertion, real-time alert triggers.
- [ ] Latency & Error rate labels.

---

### E. Interactive ROI Calculator (`src/components/AutomationCalculator.jsx`)
- [ ] Sliders & Labels:
  - *Darbuotojų skaičius, atliekantis rankinį darbą* (Team size)
  - *Valandos per savaitę vienam darbuotojui* (Hours/week)
  - *Vidutinis valandinis įkainis (€ / $)* (Hourly rate)
- [ ] Calculated Outputs:
  - *Metinis sutaupymas (valandomis ir kaštais)*
  - *Atsipirkimo laikotarpis (dienomis / mėnesiais)*

---

### F. Case Snapshots & Target Audience (`CaseSnapshots.jsx`, `WhoItsFor.jsx`)
- [ ] Industry specific case studies:
  - Logistika ir sandėlio valdymas (Logistics/ERP)
  - Finansai ir sąskaitų apdorojimas (Fintech/Invoice OCR)
  - E-komercija ir tiekėjų sinchronizacija (Shopify/ERP Sync)
- [ ] Qualification indicators (*Kam tinka / Kam netinka*).

---

### G. How It Works & Security Assurance (`HowItWorks.jsx`, `SecurityAssurance.jsx`, `AuditOffer.jsx`)
- [ ] Step-by-step roadmap:
  - 1 žingsnis: *Procesų diagnostika ir auditas*
  - 2 žingsnis: *Architektūros projektavimas*
  - 3 žingsnis: *Saugus diegimas ir integravimas*
- [ ] Security guarantees (GDPR atitiktis, šifravimas, prieigos teisės).

---

### H. Interactive Diagnostic Intake Wizard (`src/components/FinalCTA.jsx`)
- [ ] **Header & Step Indicators:**
  - 1 žingsnis: *Pagrindinė operacinė problema*
  - 2 žingsnis: *Rankinio darbo apimtis (val./sav.)*
  - 3 žingsnis: *Naudojamos technologijos ir ERP*
  - 4 žingsnis: *Kontaktinė informacija ir ataskaitos gavimas*
- [ ] **Options & Selectors:**
  - Bottleneck choices, hour ranges (5–15 val., 15–40 val., 40–100+ val.), ERP / Cloud stack choices.
- [ ] **Form Fields & Validation:**
  - Vardas, Pavardė, Įmonės el. paštas, Įmonės pavadinimas, Papildomas kontekstas.
  - GDPR sutikimo varnelė (*„Sutinku, kad mano duomenys būtų tvarkomi...“*).
  - Klaidos pranešimai ir mygtukas: *„Gauti išsamų audito planą“*.
- [ ] **Success Confirmation Screen:**
  - *„Diagnostinė informacija gauta“*, numatomas pristatymo laikas (per 1 darbo dieną).

---

### I. Exit Intent Modal & Footer (`ExitIntentModal.jsx`, `Footer.jsx`)
- [ ] Exit intent offer translation (*„Prieš išeinant: gaukite greitą operacijų patikros gidą“*).
- [ ] Footer copyright, teisinės nuorodos, konfidencialumo garantijos.

---

### J. Backend API & Error Responses (`api/submit-audit.js`)
- [ ] API validation error messages localized or formatted cleanly.
- [ ] Confirmation email notifications (if triggered via webhook/email).

---

## 3. Implementation Approaches

### Option 1: Direct Component In-Place Translation (Recommended if site is solely Lithuanian)
* Directly update the JSX string literals across the components.
* Fastest, zero bundle-size overhead, cleanest code maintenance.

### Option 2: Multi-Language i18n Architecture (If dual LT / EN toggle is needed)
* Introduce a lightweight translation dictionary (`src/locales/lt.json` & `src/locales/en.json`) or React Context (`LanguageProvider`).
* Add a language toggle switch (`LT | EN`) in `Nav.jsx`.

---

## 4. Verification & Testing Checklist

- [ ] **Grammar & Diacritics:** Verify all Lithuanian letters (`ą, č, ę, ė, į, š, ų, ū, ž`) render crisply with Space Grotesk and Inter fonts.
- [ ] **Layout & Overflow:** Ensure longer Lithuanian words do not break flex containers or button pill paddings on mobile viewports.
- [ ] **Form Submission:** Test full submission cycle in the diagnostic wizard with Lithuanian text input.
- [ ] **Currency & Number Formatting:** Ensure comma/dot formatting (€ or $) is consistent across the calculator.
