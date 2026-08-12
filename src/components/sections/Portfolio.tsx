'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { projectCategories, projects } from '@/content/projects';
import type { Project } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { ProjectCover } from '@/components/ui/ProjectCover';
import { LinkButton, Arrow } from '@/components/ui/Button';
import { StarGlyph } from '@/components/ui/Logo';

/** Home-page preview: the featured projects only. */
export function PortfolioPreview() {
  const { t } = useLanguage();
  const featured = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={t('sections.portfolioTitle')}
          title={t('sections.portfolioSubtitle')}
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug}>
              {/* Alternating heights give the grid a less templated rhythm */}
              <ProjectCard
                project={project}
                tall={index % 3 === 0}
              />
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal delay={0.15} className="mt-12 flex justify-center">
          <LinkButton href="/portfolio" variant="secondary" size="lg">
            {t('common.viewAll')}
            <Arrow />
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}

/** Full portfolio with category filtering. */
export function PortfolioGrid() {
  const { t, pick, formatNumber } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState('all');

  const filtered = useMemo(
    () =>
      active === 'all'
        ? projects
        : projects.filter((project) => project.categorySlug === active),
    [active],
  );

  return (
    <>
      {/* Filters */}
      <Reveal>
        <div
          role="group"
          aria-label={t('portfolio.filterBy')}
          className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {projectCategories.map((category) => {
            const isActive = active === category.slug;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActive(category.slug)}
                aria-pressed={isActive}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-[0.78rem] font-bold tracking-wide transition-colors duration-300 ${
                  isActive
                    ? 'text-space-900'
                    : 'glass text-steel-300 hover:border-gold/30 hover:text-starlight'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-filter"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative">{pick(category.name)}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p
          aria-live="polite"
          className="mt-6 text-center text-[0.78rem] tabular-nums text-steel-500"
        >
          {t('portfolio.showing', {
            count: formatNumber(filtered.length),
            total: formatNumber(projects.length),
          })}
        </p>
      </Reveal>

      {/* Grid */}
      <motion.div layout={!reducedMotion} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout={!reducedMotion}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-steel-400">
          {t('portfolio.noProjects')}
        </p>
      )}
    </>
  );
}

function ProjectCard({
  project,
  tall = false,
}: {
  project: Project;
  tall?: boolean;
}) {
  const { t, pick } = useLanguage();

  return (
    <article className="group glass relative h-full overflow-hidden rounded-2xl transition-colors duration-500 hover:border-gold/30">
      <ProjectCover
        slug={project.slug}
        categorySlug={project.categorySlug}
        className={tall ? 'aspect-[4/3]' : 'aspect-[16/10]'}
      />

      {/* Hover veil carrying the project's detail */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-space-900 via-space-900/70 to-transparent p-7 opacity-0 transition-opacity duration-500 ease-cosmic group-hover:opacity-100 group-focus-within:opacity-100">
        <p className="text-[0.9rem] font-light leading-relaxed text-steel-300">
          {pick(project.description)}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {pick(project.tags).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-gold/25 bg-gold/[0.08] px-2.5 py-1 text-[0.66rem] font-medium tracking-wide text-gold-400"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6">
        <p className="flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-gold">
          <StarGlyph size={9} />
          {pick(project.category)}
        </p>

        <h3 className="mt-3 text-[1.05rem] font-bold leading-snug text-starlight transition-colors duration-300 group-hover:text-gold-400">
          {pick(project.title)}
        </h3>

        <p className="mt-2.5 flex items-center gap-2 text-[0.78rem] text-steel-500">
          <span>
            {t('portfolio.client')}: {project.client}
          </span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-steel-600" />
          <span className="tabular-nums">{project.year}</span>
        </p>
      </div>
    </article>
  );
}
