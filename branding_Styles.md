# Meridian Brand Styling & Design System Guide

> Comprehensive design token specifications, typography rules, component patterns, and cross-client HTML email style references for **Meridian — Operational Automation Engineering**.

---

## 1. Brand Identity & Visual Philosophy

* **Brand Name:** Meridian
* **Tagline / Sub-label:** `Ops Engine` / `Operational Automation Engineering`
* **Aesthetic Tone:** Dark Industrial Engineering, High-Tech Precision, Minimalist Luxury, Terminal/Console Accents.
* **Core Motif:** Deep obsidian surfaces with precision emerald neon glowing highlights, subtle grid backdrops, and monospace data readouts.

---

## 2. Color Palette & Design Tokens

### Core Palette

| Token Name | Hex Code | RGB / CSS Variable | Purpose & Application |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#0A0A0C` | `rgb(10, 10, 12)` | Main document/canvas background |
| **Surface Raised** | `#0F0F12` | `rgb(15, 15, 18)` | Secondary background / Section containers |
| **Surface Overlay / Modal** | `#141418` | `rgb(20, 20, 24)` | Floating dialogs, modals, popovers |
| **Surface Inset Card** | `#181820` | `rgb(24, 24, 32)` | Nested callout boxes, data summary tables |
| **Accent Primary (Neon Emerald)**| `#4ADE80` | `rgb(74, 222, 128)` | Primary CTA buttons, key metrics, active links |
| **Accent Hover** | `#3ECF75` | `rgb(62, 207, 117)` | Button hover & active interaction states |
| **Accent Dim / Badge Fill** | `#163824` | `rgb(22, 56, 36)` | Solid background for pill tags & badges |
| **Accent Glow** | `rgba(74, 222, 128, 0.25)` | `rgba(74, 222, 128, 0.25)` | Shadows, borders, and radial atmospheric lighting |
| **Border Subtle** | `#27272F` | `rgba(255, 255, 255, 0.08)` | Standard container and divider lines |
| **Border Hover / Active** | `#383844` | `rgba(255, 255, 255, 0.16)` | Card hover borders & active inputs |

### Text & Typography Hierarchy

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Text Primary (White)** | `#FFFFFF` | Headings, button labels, high-contrast metric values |
| **Text Body (Slate Light)**| `#E2E8F0` / `#CBD5E1` | Standard readable paragraphs and long copy |
| **Text Muted (Slate Gray)**| `#8E8E9F` / `#94A3B8` | Subtitles, input placeholders, timestamp readouts |
| **Text Dim** | `#64748B` / `#475569` | Footer legal text, copyright, secondary disclosures |

---

## 3. Typography & Font Stacks

### 1. Headings & Display
* **Font Family:** `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
* **Weights:** `600` (Semi-Bold), `700` (Bold)
* **Letter Spacing:** `-0.025em` to `-0.04em` (Tight/Tightest)
* **Usage:** Page titles, section headers, hero statements, major metrics.

### 2. Body & General UI
* **Font Family:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
* **Weights:** `400` (Regular), `500` (Medium), `600` (Semi-Bold)
* **Line Height:** `1.5` – `1.65`
* **Usage:** Descriptive body text, form field labels, narrative sections.

### 3. Code, Badges & Metrics (Data Readouts)
* **Font Family:** `'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace`
* **Weights:** `400` (Regular), `500` (Medium), `600` (Semi-Bold)
* **Letter Spacing:** `0.05em` to `0.2em` (Widest, uppercase)
* **Usage:** Diagnostic tags, step numbers, timestamps, system specs, ROI calculators.

---

## 4. UI Components & Recipes

### A. CTA Button (Primary)
```css
background-color: #4ADE80;
color: #0A0A0C;
font-family: 'Inter', sans-serif;
font-weight: 700;
font-size: 14px;
border-radius: 10px;
padding: 14px 28px;
box-shadow: 0 0 25px rgba(74, 222, 128, 0.25);
transition: all 0.2s ease-in-out;
```

### B. Status Badge / Pill
```css
background-color: #163824;
border: 1px solid #23653A;
color: #4ADE80;
font-family: 'JetBrains Mono', monospace;
font-size: 11px;
font-weight: 600;
letter-spacing: 0.8px;
text-transform: uppercase;
border-radius: 9999px;
padding: 4px 12px;
```

### C. Glassmorphism Card
```css
background: rgba(255, 255, 255, 0.035);
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(12px);
border-radius: 16px;
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
```

---

## 5. HTML Email Guidelines & Boilerplate

When building HTML emails that match the Meridian brand, ensure strict cross-client compatibility:
1. **Use Tables:** Construct layout exclusively with nested `<table>`, `<tr>`, and `<td>` elements.
2. **Inline CSS:** Keep all styles inline on table cells and anchor tags.
3. **Solid Color Fallbacks:** Use solid `#121216` and `#181820` instead of semi-transparent RGBA for container backgrounds.
4. **Web-Safe Fallbacks:** Always append system fonts after web fonts (`'Space Grotesk', Helvetica, Arial, sans-serif`).

### Email Starter Blueprint:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meridian — Audit Roadmap</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@500;600&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0C; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #E2E8F0;">
  
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0A0A0C">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #121216; border: 1px solid #27272F; border-radius: 16px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #27272F;">
              <span style="display: inline-block; width: 8px; height: 8px; background-color: #4ADE80; border-radius: 50%; margin-right: 6px;"></span>
              <span style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: #FFFFFF;">Meridian</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #8E8E9F; background-color: #1A1A22; border: 1px solid #27272F; padding: 2px 6px; border-radius: 4px; margin-left: 8px; text-transform: uppercase;">Ops Engine</span>
            </td>
          </tr>

          <!-- Content Area -->
          <tr>
            <td style="padding: 32px;">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; color: #4ADE80; background-color: #163824; border: 1px solid #23653A; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">
                Operational Blueprint Ready
              </span>
              
              <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; color: #FFFFFF; margin: 16px 0 12px 0;">
                Your Custom Automation Audit
              </h1>
              
              <p style="font-size: 14px; line-height: 1.6; color: #CBD5E1; margin-bottom: 24px;">
                We have analyzed your workflow bottleneck and prepared a comprehensive architectural blueprint.
              </p>

              <!-- CTA Button -->
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" bgcolor="#4ADE80" style="border-radius: 8px;">
                    <a href="https://yourdomain.com" target="_blank" style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #0A0A0C; text-decoration: none; padding: 12px 24px; display: inline-block;">
                      View Diagnostic Roadmap &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0E0E12; border-top: 1px solid #27272F; padding: 20px 32px; text-align: center;">
              <p style="font-size: 11px; color: #64748B; margin: 0;">
                © 2026 Meridian Operational Systems. Mutual NDA Protected.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
```
