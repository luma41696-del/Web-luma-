/** Shared content types. Every localised string carries both languages. */

export type Locale = 'en' | 'ar';

/** A string that exists in both site languages. */
export type Localized = Record<Locale, string>;

/** A list that exists in both site languages. */
export type LocalizedList = Record<Locale, string[]>;

export interface Service {
  /** URL segment — also the stable key used across the site. */
  slug: string;
  /** ObjectId from the previous CMS; kept so legacy URLs can be redirected. */
  legacyId: string;
  title: Localized;
  /** One-line summary used on cards. */
  summary: Localized;
  /** Fuller narrative used on the service detail page. */
  overview: Localized;
  features: LocalizedList;
  benefits: LocalizedList;
  process: LocalizedList;
  technologies: LocalizedList;
  category: Localized;
  /** Identifier for the bespoke SVG icon rendered by <ServiceIcon />. */
  icon:
    | 'marketing'
    | 'business'
    | 'automation'
    | 'content'
    | 'development';
  /** Accent hue (degrees) used for the card's glow and orbit ring. */
  hue: number;
}

export interface Project {
  slug: string;
  legacyId: string;
  title: Localized;
  client: string;
  year: number;
  category: Localized;
  /** Category slug — drives the portfolio filter. */
  categorySlug: string;
  description: Localized;
  tags: LocalizedList;
  featured: boolean;
}

export interface Award {
  slug: string;
  /** Organisation that presented the recognition. */
  awardedBy: Localized;
  /** Title engraved on the plaque. */
  title: Localized;
  /** Named recipient, where the plaque records one. */
  recipient?: Localized;
  image: string;
  /** Intrinsic dimensions of the source artwork, for correct aspect ratio. */
  width: number;
  height: number;
  alt: Localized;
}

export interface TeamMember {
  name: string;
  role: Localized;
  image?: string;
}

export interface Testimonial {
  name: string;
  position: Localized;
  company: string;
  quote: Localized;
  project: Localized;
  rating: number;
}

export interface Stat {
  key: string;
  label: Localized;
  value: number;
  suffix: string;
  description: Localized;
}

export interface Faq {
  question: Localized;
  answer: Localized;
}

export interface Value {
  title: Localized;
  description: Localized;
  icon: 'collaboration' | 'innovation' | 'learning' | 'creativity' | 'integrity';
}
