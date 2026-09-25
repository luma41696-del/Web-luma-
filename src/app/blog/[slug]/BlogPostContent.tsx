'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { getPost } from '@/content/blog';
import { PageHeader } from '@/components/sections/PageHeader';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal } from '@/components/ui/Reveal';
import { StarGlyph } from '@/components/ui/Logo';
import { LinkButton, Arrow } from '@/components/ui/Button';

export function BlogPostContent({ slug }: { slug: string }) {
  const { t, pick, locale } = useLanguage();
  const post = getPost(slug);

  if (!post) return null;

  const formatted = new Intl.DateTimeFormat(
    locale === 'ar' ? 'ar-JO' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' },
  ).format(new Date(post.publishedAt));

  return (
    <>
      <PageHeader
        eyebrow={pick(post.category)}
        title={pick(post.title)}
        subtitle={pick(post.excerpt)}
      />

      <article className="section pt-0">
        <div className="shell">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.07] pb-6 text-[0.8rem] text-steel-500">
                <span className="flex items-center gap-2 text-gold">
                  <StarGlyph size={9} />
                  {post.author}
                </span>
                <time dateTime={post.publishedAt}>{formatted}</time>
              </div>
            </Reveal>

            <div className="mt-10 flex flex-col gap-7">
              {post.body.map((block, index) => {
                if (block.type === 'heading') {
                  return (
                    <Reveal key={index}>
                      <h2 className="mt-4 text-[1.45rem] font-bold leading-snug text-starlight">
                        {pick(block.text)}
                      </h2>
                    </Reveal>
                  );
                }

                if (block.type === 'list') {
                  return (
                    <Reveal key={index}>
                      <ul className="flex flex-col gap-3">
                        {pick(block.items).map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[1rem] font-light leading-relaxed text-steel-300"
                          >
                            <StarGlyph
                              size={10}
                              className="mt-1.5 shrink-0 text-gold/75"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  );
                }

                return (
                  <Reveal key={index}>
                    <p className="text-[1.02rem] font-light leading-relaxed text-steel-300">
                      {pick(block.text)}
                    </p>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-14 border-t border-white/[0.07] pt-8">
                <LinkButton href="/blog" variant="ghost">
                  <Arrow className="rotate-180 rtl:rotate-0" />
                  {t('blog.allPosts')}
                </LinkButton>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      <CallToAction />
    </>
  );
}
