---
name: Sanggar Bundaku Official Document Generator Design System
description: Cultural Indonesian dance studio administrative design system featuring Green Forest & Sandstone gold brand palette, dual-pane editor UI, and print-perfect A4 document rendering.
colors:
  primary: "#1F3F27"
  accent: "#E2BD8B"
  accent-hover: "#D4AC77"
  app-bg: "#020617"
  app-surface: "#0F172A"
  app-border: "#1E293B"
  document-bg: "#FFFFFF"
  document-text: "#0F172A"
  document-muted: "#475569"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
  headline:
    fontFamily: "Sora, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
  body:
    fontFamily: "Sora, Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  document-kop:
    fontFamily: "Times New Roman, serif, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
---

# Design System: Sanggar Bundaku Document Generator

## 1. Overview

**Creative North Star: "Traditional Indonesian Artistry Meets Modern Digital Precision"**

The design system merges the cultural heritage of Sanggar Bundaku with a clean, high-efficiency administrative web application. Deep Forest Green (`#1F3F27`) represents growth, tradition, and structure, while Sandstone Gold (`#E2BD8B`) provides warm elegance for accents, buttons, and decorative elements. The app chrome uses dark slate (`#020617`) to reduce eye fatigue during long administrative sessions, while the document canvas strictly maintains clean white A4 proportions for print fidelity.

**Key Characteristics:**
- **Green Forest (`#1F3F27`) & Sandstone Gold (`#E2BD8B`)** primary identity.
- **Split-Screen Studio Layout**: 5-column left editor panel with dark controls, 7-column right live A4 paper preview.
- **Official Indonesian Administrative Styling**: Traditional Kop Surat layout with centered dual-line text, decorative dividing bar, dancer watermark, and official signature block.
- **Typography**: Sora for UI chrome & action controls; serif/Times New Roman for Kop Surat authority.

## 2. Colors

### App Chrome Palette (Dark Slate)
- **App Background** (`#020617` / `bg-slate-950`): Deep dark slate for maximum contrast behind paper preview.
- **Panel Surface** (`#0f172a` / `bg-slate-900`): Dark container background for form editor modules.
- **Panel Border** (`#1e293b` / `border-slate-800`): Subtle slate borders separating form fields and sections.

### Studio Brand & Accent Palette
- **Green Forest** (`#1F3F27`): Brand header color, invoice status badges, official Kop Surat header elements.
- **Sandstone Gold** (`#E2BD8B`): Primary CTA button fill, active tab highlights, loading spinners, and accent highlights.
- **Sandstone Dark** (`#C4A070`): Border and hover states for gold accents.

### Document Canvas Palette (Print Output)
- **Paper Background** (`#ffffff`): Pure white paper simulation.
- **Print Text Primary** (`#0f172a`): High-contrast dark text for clear printing.
- **Print Text Muted** (`#475569`): Muted text for document metadata and terms.

## 3. Typography

- **UI Headings & Chrome**: Sora (`font-sora`), 600/700 weight.
- **Form Controls & Inputs**: Sora / Inter, 400/500 weight.
- **Document Kop Surat**: Serif / Times New Roman, bold uppercase for organization header.

## 4. Layout Architecture

- **Navbar**: Sticky top header containing mode switcher (Invoice vs. Surat Izin), preset loader, reset button, and export controls.
- **Left Panel (Editor)**: 5 columns on desktop (`lg:col-span-5`), collapsible sections for sender info, recipient info, itemized tables, bank details, and document toggles.
- **Right Panel (Preview)**: 7 columns on desktop (`lg:col-span-7`), centered A4 paper preview with realistic shadow and scaling.

## 5. Do's and Don'ts

### Do:
- **Do** preserve the official `#1F3F27` Green Forest header color on official document templates.
- **Do** maintain exact A4 aspect ratio (`210mm x 297mm`) for document previews.
- **Do** format all currency values with `Rp` prefix and standard Indonesian thousand separators (`.`).
- **Do** include dancer watermark overlay at low opacity behind document body.

### Don't:
- **Don't** overflow text outside printable margins.
- **Don't** change document background from pure white (`#ffffff`).
- **Don't** hide export buttons or print actions inside multi-level menus.
