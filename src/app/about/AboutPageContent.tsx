'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { about } from '@/content/company';
import { team, teamSrc } from '@/content/team';
import type { TeamMember } from '@/content/types';
import { PageHeader } from '@/components/sections/PageHeader';
import { AboutIntro, Values } from '@/components/sections/About';
import { WhyLuma } from '@/components/sections/WhyLuma';
import { CallToAction } from '@/components/sections/CallToAction';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

export function AboutPageContent() {
  const { t, pick } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={t('sections.whoWeAre')}
        title={t('sections.aboutTitle')}
        subtitle={pick(about.shortDescription)}
      />

      <AboutIntro withCta={false} />
      <Values />
      <Team />
      <WhyLuma />
      <CallToAction />
    </>
  );
}

/**
 * A member's portrait, or their monogram.
 *
 * Falls back on two conditions: no `image` set yet, or the file failing to
 * load. The second case matters — someone adding a colleague can list them
 * before the photo has been through `npm run optimize:images`, and a broken
 * image icon in the middle of the team grid is worse than a clean monogram.
 */
function TeamPortrait({
  member,
  label,
}: {
  member: TeamMember;
  label: string;
}) {
  const [failed, setFailed] = useState(false);

  const initials = member.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  if (!member.image || failed) {
    return (
      <span
        role="img"
        aria-label={`${member.name} — ${label}`}
        className="flex h-full w-full items-center justify-center bg-luma-700/25 text-2xl font-bold tracking-wide text-gold-400/80"
      >
        {initials}
      </span>
    );
  }

  // Served directly rather than through next/image: these portraits are
  // already square WebP at exactly the two sizes the grid uses, so the
  // optimiser has nothing left to do — it was upscaling the 320px file to
  // 1920 and re-encoding it as JPEG, which is both slower and worse.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={teamSrc.small(member.image)}
      srcSet={`${teamSrc.small(member.image)} 320w, ${teamSrc.large(member.image)} 640w`}
      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
      alt={`${member.name} — ${label}`}
      width={320}
      height={320}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-top transition-transform duration-700 ease-cosmic group-hover:scale-[1.05]"
    />
  );
}

function Team() {
  const { t, pick } = useLanguage();

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={t('sections.teamTitle')}
          title={t('sections.teamSubtitle')}
        />

        <RevealGroup
          className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
          step={0.05}
        >
          {team.map((member) => (
            <Reveal key={member.name}>
              <figure className="group glass h-full overflow-hidden rounded-2xl transition-colors duration-500 hover:border-gold/30">
                <div className="relative aspect-square overflow-hidden bg-midnight-800">
                  <TeamPortrait member={member} label={pick(member.role)} />

                  {/* Cool-to-warm veil so the portraits sit in the same light */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-space-900/85 via-space-900/10 to-transparent"
                  />
                </div>

                <figcaption className="p-4">
                  <p className="text-[0.86rem] font-bold leading-snug text-starlight">
                    {member.name}
                  </p>
                  <p className="mt-1 text-[0.72rem] font-light leading-snug text-steel-500">
                    {pick(member.role)}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
