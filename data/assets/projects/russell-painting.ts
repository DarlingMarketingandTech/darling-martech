import type { ProjectMediaMap } from "../types";

export const projectMedia_russellPainting: ProjectMediaMap = {
  projectSlug: "russell-painting",

  hero: {
    publicId: "russell-painting-website",
    alt: "Homepage screenshot of the Russell Painting Co. website",
    kind: "screen",
    role: "hero",
    caption: "Russell Painting website hero screenshot",
    theme: "brand-authority",
    audience: "local-homeowners",
    tags: [
      "client-russell-painting",
      "surface-work",
      "kind-screen",
      "priority-hero",
      "status-canonical",
    ],
  },

  screens: [
    {
      publicId: "russell-painting-website-services",
      alt: "Services page screenshot from the Russell Painting Co. website",
      kind: "screen",
      role: "gallery",
      caption: "Services page trust-signal layout",
      theme: "professional-excellence",
      audience: "local-homeowners",
      tags: [
        "client-russell-painting",
        "surface-work",
        "kind-screen",
        "priority-support",
        "status-canonical",
      ],
    },
  ],

  productInUse: [
    {
      publicId: "russell-painting-website-services",
      alt: "Russell Painting services trust section showing workmanship and service detail framing",
      kind: "photo",
      role: "support",
      caption: "Craftsmanship and service-detail proof surface",
      theme: "professional-excellence",
      audience: "local-homeowners",
      tags: [
        "client-russell-painting",
        "surface-work",
        "kind-photo",
        "status-secondary",
      ],
    },
  ],

  campaign: [
    {
      publicId: "russell-painting-website",
      alt: "Russell Painting campaign-style homepage framing trust and conversion signals",
      kind: "campaign",
      role: "proof-secondary",
      caption: "Trust-led conversion narrative surface",
      theme: "brand-authority",
      audience: "local-homeowners",
      tags: [
        "client-russell-painting",
        "surface-work",
        "kind-campaign",
        "status-secondary",
      ],
    },
  ],

  logos: [
    {
      publicId: "russell-painting-logo",
      alt: "Russell Painting Co. primary logo",
      kind: "logo",
      role: "support",
      caption: "Russell Painting primary logo",
      theme: "brand-authority",
      audience: "local-homeowners",
      tags: ["client-russell-painting", "kind-logo", "status-canonical"],
    },
    {
      publicId: "russell-painting-logo2",
      alt: "Russell Painting Co. alternate logo",
      kind: "logo",
      role: "support",
      caption: "Russell Painting alternate logo",
      theme: "brand-authority",
      audience: "local-homeowners",
      tags: ["client-russell-painting", "kind-logo", "status-canonical"],
    },
  ],
};
