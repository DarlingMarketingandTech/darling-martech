# Graston Section-by-Section Media Placement Plan

## Objective
Refactor `graston-technique` from a staged gallery pattern to authored section-by-section media placement using the project media map.

## Section Role Map

### 1) Hero section uses `media.hero`
- `graston-website`
- Role: first-frame website authority signal
- Why: sets platform context before narrative detail

### 2) Website/results section uses `media.screens`
- `graston-website-training`
- Role: training pathway UX proof
- `graston-website-shop`
- Role: commerce and operational flow proof

### 3) Product craftsmanship/treatment precision section uses `media.productInUse`
- `intricate-tissue-mobilization`
- Role: clinical precision and technique-in-practice visual proof

### 4) Campaign/proof section uses `media.campaign`
- `precision-for-every-ot`
- Role: practitioner-segment campaign proof (canonical)
- `mobility-is-mental-health`
- Role: outcomes narrative support (secondary)
- `3-website-page-promo`
- Role: campaign support creative (secondary)
- `computer-training`
- Role: educational campaign support creative (secondary)

### 5) Trust/brand section uses `media.logos`
- `graston-logo-png`
- Role: master brand anchor
- `provider-premier-badge-logo`
- Role: credential and trust reinforcement

## Cleanup Decision
- `graston-technique-badgeo` is marked as legacy and excluded from mapped sets via:
  - `excludedPublicIds: ["graston-technique-badgeo"]`
- Outcome: no accidental render in authored narrative sections.

## Pattern Reuse Targets
The same asset-map structure now exists for:
- `primarycare-indy`
- `russell-painting`
- `hoosier-boy-barbershop`
- `pike-medical-consultants`

Both are wired into `getProjectMedia` so work-detail pages can render section-aware media placements from the same pattern.

## Next Candidate
- `317-bbq` remains a strong candidate for full five-bucket mapping once additional canonical campaign/product assets are promoted in Cloudinary beyond the current two-photo set.
