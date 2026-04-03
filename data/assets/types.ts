export type MediaKind =
  | "screen"
  | "photo"
  | "logo"
  | "graphic"
  | "campaign"
  | "product-in-use";

export type MediaRole =
  | "hero"
  | "thumbnail"
  | "gallery"
  | "support"
  | "background"
  | "proof-primary"
  | "proof-secondary";

export type MediaTheme =
  | "clinical-precision"
  | "precision-craftsmanship"
  | "practitioner-empowerment"
  | "patient-outcomes"
  | "educational-authority"
  | "brand-authority"
  | "professional-excellence"
  | "craftsmanship"
  | "local-identity"
  | "digital-experience"
  | "patient-welcome"
  | "professional-trust"
  | "founder-authority";

export type MediaAsset = {
  publicId: string;
  alt: string;
  kind?: MediaKind;
  role?: MediaRole;
  caption?: string;
  tags?: string[];
  theme?: MediaTheme;
  audience?: string;
  excluded?: boolean;
};

export type ProjectMediaMap = {
  projectSlug: string;
  hero?: MediaAsset;
  screens?: MediaAsset[];
  productInUse?: MediaAsset[];
  campaign?: MediaAsset[];
  logos?: MediaAsset[];
  excludedPublicIds?: string[];
};
