/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LUMA AGENCY — CENTRAL CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  This is the single file to edit for contact details, social links and the
 *  canonical site URL. Nothing else in the codebase hard-codes a phone number,
 *  an email address or a social profile.
 *
 *  Every value below was taken verbatim from the live LUMA API
 *  (api.luma-jo.com/api/v1/contact-page) on 2026-08-09.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /** Canonical production origin — used for metadata, sitemap and JSON-LD. */
  url: 'https://luma-jo.com',

  name: {
    en: 'LUMA Agency',
    ar: 'وكالة LUMA',
  },

  /** Legal entity name as registered on the previous site. */
  legalName: 'Luma Jo Agency',

  tagline: {
    en: 'Where Light Leads Innovation',
    ar: 'حيث يقود الضوء الابتكار',
  },

  description: {
    en: 'Creative agency based in Amman, Jordan, blending marketing, IT solutions, and studio production to empower businesses.',
    ar: 'وكالة إبداعية مقرها عمّان، الأردن، تجمع بين التسويق وحلول تكنولوجيا المعلومات والإنتاج الاستوديوهي لتمكين الأعمال.',
  },

  /** Founding year — per the company profile on the previous site. */
  foundedYear: 2025,

  contact: {
    /** Dial string exactly as published by LUMA. */
    phone: '00962793363006',
    /** E.164 form, used for `tel:` links. */
    phoneE164: '+962793363006',
    /** Human-readable form used in the UI. */
    phoneDisplay: '+962 79 336 3006',

    email: 'info@luma-jo.com',

    whatsapp: '+962793363006',
    /** Digits only — required by the wa.me URL scheme. */
    whatsappDigits: '962793363006',
  },

  location: {
    city: { en: 'Amman', ar: 'عمّان' },
    country: { en: 'Jordan', ar: 'الأردن' },
    countryCode: 'JO',
    display: {
      en: 'Amman, Jordan',
      ar: 'عمّان، الأردن',
    },
    /**
     * Coordinates for the city of Amman. LUMA has not published a street
     * address, so the map is centred on the city rather than a specific pin.
     */
    geo: { lat: 31.9539, lng: 35.9106 },
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Amman%2C+Jordan',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=Amman,Jordan&hl=en&z=11&output=embed',
  },

  social: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/company/luma-jo-agency/',
      handle: 'luma-jo-agency',
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/luma_agency1/',
      handle: '@luma_agency1',
    },
  ],

  /**
   * Optional: the previous site posted its contact form to this endpoint.
   * Leave empty to run the form in "mailto fallback" mode, which opens the
   * visitor's mail client with the message pre-filled and requires no backend.
   * See README → "Contact form".
   */
  contactEndpoint: '',
} as const;

export type SiteConfig = typeof siteConfig;

/** Convenience helpers so link construction lives in exactly one place. */
export const links = {
  tel: `tel:${siteConfig.contact.phoneE164}`,
  mail: `mailto:${siteConfig.contact.email}`,
  whatsapp: (message?: string) =>
    `https://wa.me/${siteConfig.contact.whatsappDigits}${
      message ? `?text=${encodeURIComponent(message)}` : ''
    }`,
};
