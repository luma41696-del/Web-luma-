'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { publishedPosts } from '@/content/blog';
import { PageHeader } from '@/components/sections/PageHeader';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { StarGlyph } from '@/components/ui/Logo';
import { Arrow } from '@/components/ui/Button';

/** Uses the same masthead, glass cards and reveal rhythm as every other page. */
export function BlogIndexContent() {
  const { t, pick, locale } = useLanguage();

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-JO' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));

  return (
    <>
      <PageHeader
        eyebrow={t('nav.blog')}
        title={t('blog.title')}
        subtitle={t('blog.subtitle')}
      />

      <section className="section pt-0">
        <div className="shell">
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {publishedPosts.map((post) => (
              <Reveal key={post.slug}>
                <article className="glass group h-full rounded-2xl p-7 transition-colors duration-500 hover:border-gold/30">
                  <p className="flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-gold">
                    <StarGlyph size={9} />
                    {pick(post.category)}
                  </p>

                  <h2 className="mt-4 text-xl font-bold leading-snug text-starlight transition-colors group-hover:text-gold-400">
                    <Link href={`/blog/${post.slug}`}>{pick(post.title)}</Link>
                  </h2>

                  <p className="mt-3 text-[0.92rem] font-light leading-relaxed text-steel-400">
                    {pick(post.excerpt)}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <time
                      dateTime={post.publishedAt}
                      className="text-[0.76rem] text-steel-500"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="tap-target inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-400"
                    >
                      {t('common.readMore')}
                      <Arrow />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
