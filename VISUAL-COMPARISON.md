# Visual Comparison: Before vs After

## Component Hierarchy Changes

### BEFORE (Potential Issue)
```
/work/graston-technique

1. Hero
2. Challenge
3. Flagship Proof Modules (no macro wrappers visible if < 6 modules)
4. → Potential duplicate: NarrativeMediaSections could render screens
5. → Potential duplicate: Heavy media sections (screens, campaign, etc.)
6. Brand Identity Snapshot
7. Outcome
8. Closing
9. Route-out
```

### AFTER (Implemented)
```
/work/graston-technique

1. Hero
2. Challenge
3. ★ Flagship Proof Modules (6 modules)
   └─ WITH macro wrappers:
      - "Acquisition and conversion systems"
      - "Retention, visibility, and operating intelligence"
      - "Platform stability and infrastructure"
4. ★ Systems Synthesis Bridge
   └─ "This was not a marketing campaign or a website refresh..."
5. ★ Support Evidence Strips (NEW - calm, subordinate)
   ├─ Website and platform screens (2 images, small)
   ├─ Campaign creative (3 images, small)
   └─ Product and precision (1 image, small)
6. Brand Identity Snapshot (brand DNA metadata)
7. Outcome
8. Closing
9. Route-out
```

## Visual Weight Comparison

### Flagship Modules (Dominant)
```css
/* Large cards with full visual treatment */
padding: 1.75rem;
border: 1px solid var(--color-border);
border-radius: 1.25rem;
background: gradient + surface;
transition: border-color 0.4s;
hover: border-color: accent;

/* Large typography */
title: 1.25rem, bold, tight tracking
body: 0.95rem, line-height 1.75

/* Large images */
width: 960px, height: 640px
aspect-ratio: 16/10
```

### Support Evidence Strips (Subordinate)
```css
/* Contained, muted background */
padding: 2.25rem;
border: 1px solid rgba(245, 240, 232, 0.06); /* very subtle */
border-radius: 1rem;
background: rgba(20, 20, 20, 0.45); /* muted */
NO hover effect

/* Small typography */
heading: 0.78rem, uppercase, 55% opacity
intro: 0.85rem, 88% opacity

/* Smaller images */
width: 640px, height: 400-800px
responsive grid: 1→2→3 columns
NO hover effect
```

## Example Visual Comparison

### Flagship Module
```
┌─────────────────────────────────────────────────────┐
│ [Large surface card with gradient]                  │
│                                                      │
│ Provider directory: from passive listing...  ━━━━━┐ │
│                                                   │ │
│ The provider directory was Graston's highest-    │ │
│ leverage patient acquisition surface — and it    │ │
│ was doing almost nothing...                      │ │
│                                                   │ │
│ [Full narrative paragraphs]                      │ │
│                                                   │ │
│                         ┌──────────────────────┐ │ │
│                         │                      │ │ │
│                         │  [960x640 image]     │ │ │
│                         │  Growth Engine hub   │ │ │
│                         │                      │ │ │
│                         └──────────────────────┘ │ │
│                         Caption: Provider hub... │ │
└─────────────────────────────────────────────────────┘
  ↑ DOMINANT - Large, bright, hover effect
```

### Support Evidence Strip
```
┌─────────────────────────────────────────────────────┐
│ [Muted container background]                        │
│                                                      │
│ SUPPORTING EVIDENCE                                  │
│ Interface surfaces, campaign creative, and product  │
│ documentation from the engagement.                  │
│                                                      │
│ WEBSITE AND PLATFORM SCREENS                         │
│ ┌──────┐  ┌──────┐  ┌──────┐                       │
│ │640x  │  │640x  │  │      │                       │
│ │400   │  │400   │  │      │                       │
│ └──────┘  └──────┘  └──────┘                       │
│ Caption   Caption                                   │
│                                                      │
│ CAMPAIGN CREATIVE                                    │
│ ┌──────┐  ┌──────┐  ┌──────┐                       │
│ │640x  │  │640x  │  │640x  │                       │
│ │800   │  │800   │  │800   │                       │
│ └──────┘  └──────┘  └──────┘                       │
│                                                      │
└─────────────────────────────────────────────────────┘
  ↑ SUBORDINATE - Smaller, muted, grid layout
```

## Typography Scale

```
Flagship Modules:
├─ Group heading: 0.74rem • uppercase • 68% opacity
├─ Module title:  1.25rem • bold • 100% opacity  ← LARGEST
└─ Module body:   0.95rem • regular • muted

Support Strips:
├─ Section eyebrow: (inherited from .sectionEyebrow)
├─ Intro text:      0.85rem • regular • 88% opacity
├─ Strip heading:   0.78rem • uppercase • 55% opacity  ← SMALLEST
└─ Caption:         0.72rem • regular • 72% opacity    ← LIGHTEST
```

## Color Treatment

```
Flagship Modules:
border: var(--color-border) → rgba(245, 240, 232, 0.08)
hover:  var(--color-border-accent) → rgba(255, 77, 0, 0.3)
background: gradient + var(--color-surface)

Support Strips:
border: rgba(245, 240, 232, 0.06)  ← MORE subtle
NO hover state
background: rgba(20, 20, 20, 0.45)  ← MORE muted
```

## Spacing

```
Flagship Modules:
gap between modules: 1.75rem
padding inside cards: 1.75rem
image aspect: 16/10

Support Strips:
gap between strips: 2rem
padding inside section: 2.25rem
grid gap: 1rem
image border-radius: 0.5rem (smaller)
```

## Responsive Behavior

### Flagship Modules
```
< 900px:  single column, copy above image
≥ 900px:  two-column grid, copy left, image right
```

### Support Strips
```
< 640px:  1-column grid
640-899px: 2-column grid
≥ 900px:  3-column grid
```

## Key Differences Summary

| Aspect | Flagship Modules | Support Strips |
|--------|-----------------|----------------|
| **Purpose** | Main systems story | Visual evidence |
| **Visual weight** | Dominant | Subordinate |
| **Images** | 960x640, 16/10 | 640x400/800 |
| **Layout** | Full-width cards | Grid thumbnails |
| **Typography** | Large (1.25rem) | Small (0.78rem) |
| **Hover** | Yes (accent border) | No |
| **Background** | Gradient surface | Muted container |
| **Border** | Visible | Very subtle |
| **Grid** | Single column → 2-col | 1-col → 2-col → 3-col |

## Testing Focus Areas

When reviewing the page, verify:

1. **Hierarchy is clear**
   - Flagship modules feel like the main content
   - Support strips feel supplementary, not competing
   
2. **No duplication**
   - Website screens only appear ONCE (in support strips)
   - Campaign creative only appears ONCE (in support strips)
   
3. **Macro wrappers work**
   - 6 modules are grouped into 3 labeled sections
   - Labels help with scanability
   
4. **Bridge section flows**
   - Synthesis paragraph connects modules to support
   - Tone matches Jacob's voice
   
5. **Responsive works**
   - Mobile: Everything stacks to single column
   - Tablet: Support strips use 2 columns
   - Desktop: Support strips use 3 columns
   
6. **No broken content**
   - All images load
   - All captions render
   - All links work
