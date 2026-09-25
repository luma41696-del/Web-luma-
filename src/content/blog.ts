import type { Localized } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BLOG
 * ─────────────────────────────────────────────────────────────────────────────
 *  The blog exists to rank for the questions LUMA's market actually types —
 *  "كم تكلفة تصميم موقع في الأردن", "best digital marketing agency Amman" —
 *  which the service pages cannot target without becoming keyword soup.
 *
 *  It ships EMPTY on purpose. An indexed blog with no posts, or with thin
 *  filler, is worse than no blog: Google treats thin pages as a quality
 *  signal against the whole domain. So while `posts` is empty:
 *
 *    · /blog and /blog/* return 404
 *    · neither appears in sitemap.xml
 *    · no link to the blog is rendered anywhere
 *
 *  Add one real post and all of that switches on by itself — route, sitemap
 *  entry, BlogPosting schema, footer link.
 *
 *  ── Adding a post ──────────────────────────────────────────────────────────
 *  Append to `posts` below. `body` is an array of blocks so a post can be
 *  written without a CMS or a markdown pipeline.
 *
 *  Suggested first posts, aimed at real Jordanian search demand:
 *    · "كم تكلفة تصميم موقع إلكتروني في الأردن؟"   — high intent, low competition
 *    · "How to choose a digital marketing agency in Amman"
 *    · "دليل السيو للشركات الأردنية الصغيرة"
 *    · "Why Jordanian brands are moving to AI-driven automation"
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type BlogBlock =
  | { type: 'paragraph'; text: Localized }
  | { type: 'heading'; text: Localized }
  | { type: 'list'; items: Record<'en' | 'ar', string[]> };

export interface BlogPost {
  /** URL segment. Keep it keyword-bearing and stable — changing it breaks links. */
  slug: string;
  title: Localized;
  /** Meta description and card summary. Aim for 140–160 characters. */
  excerpt: Localized;
  /** ISO date, e.g. "2026-09-25". Drives `datePublished`. */
  publishedAt: string;
  /** ISO date of the last meaningful edit, if any. */
  updatedAt?: string;
  /** Must match a `name` in src/content/team.ts so the author resolves. */
  author: string;
  /** Shown as the topic chip; also becomes `articleSection`. */
  category: Localized;
  keywords: string[];
  /** Optional hero at /public/images/blog/<file>. */
  image?: string;
  body: BlogBlock[];
}

export const posts: BlogPost[] = [];

/** Newest first. */
export const publishedPosts = [...posts].sort(
  (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
);

export const hasBlog = publishedPosts.length > 0;

export const getPost = (slug: string) =>
  publishedPosts.find((post) => post.slug === slug);
