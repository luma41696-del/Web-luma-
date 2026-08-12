'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { links, siteConfig } from '@/content/site.config';
import { services } from '@/content/services';
import { LumaMark, StarGlyph } from '@/components/ui/Logo';
import { UtilityIcon } from '@/components/ui/Icons';

const COMPANY_LINKS = [
  { href: '/about', key: 'nav.about' },
  { href: '/services', key: 'nav.services' },
  { href: '/portfolio', key: 'nav.portfolio' },
  { href: '/#recognition', key: 'nav.recognition' },
  { href: '/contact', key: 'nav.contact' },
] as const;

export function Footer() {
  const { t, pick } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-space-900/60">
      {/* A single warm star glowing at the horizon, as the brief asks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-gold/[0.055] blur-3xl"
      />

      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <LumaMark variant="light" size={26} />
              <div className="flex flex-col leading-none">
                <span
                  className="text-base font-bold tracking-[0.34em] text-starlight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  LUMA
                </span>
                <span className="mt-1 text-[0.5rem] font-light tracking-[0.4em] text-steel-400">
                  AGENCY
                </span>
              </div>
            </div>

            <p className="mt-5 flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-gold">
              <StarGlyph size={10} />
              {t('footer.tagline')}
            </p>

            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-steel-400">
              {t('footer.description')}
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {siteConfig.social.map((profile) => (
                <li key={profile.platform}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${profile.platform} — ${profile.handle}`}
                    className="glass flex h-10 w-10 items-center justify-center rounded-full text-steel-300 transition-colors duration-300 hover:border-gold/40 hover:text-gold"
                  >
                    <UtilityIcon
                      name={
                        profile.platform.toLowerCase() as 'linkedin' | 'instagram'
                      }
                      size={17}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title={t('footer.company')}>
            {COMPANY_LINKS.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {t(item.key)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t('footer.services')}>
            {services.map((service) => (
              <FooterLink key={service.slug} href={`/services/${service.slug}`}>
                {pick(service.title)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t('footer.contact')}>
            <li>
              <a
                href={links.tel}
                dir="ltr"
                className="group flex items-center gap-2.5 text-sm text-steel-400 transition-colors hover:text-gold"
              >
                <UtilityIcon name="phone" size={15} className="shrink-0 text-steel-500 transition-colors group-hover:text-gold" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={links.mail}
                className="group flex items-center gap-2.5 break-all text-sm text-steel-400 transition-colors hover:text-gold"
              >
                <UtilityIcon name="mail" size={15} className="shrink-0 text-steel-500 transition-colors group-hover:text-gold" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={links.whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-sm text-steel-400 transition-colors hover:text-gold"
              >
                <UtilityIcon name="whatsapp" size={15} className="shrink-0 text-steel-500 transition-colors group-hover:text-gold" />
                {t('contact.whatsapp')}
              </a>
            </li>
            <li>
              <span className="flex items-center gap-2.5 text-sm text-steel-400">
                <UtilityIcon name="pin" size={15} className="shrink-0 text-steel-500" />
                {pick(siteConfig.location.display)}
              </span>
            </li>
          </FooterColumn>
        </div>

        <div className="hairline mt-14" />

        <div className="mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-steel-500">
            © {year} {pick(siteConfig.name)}. {t('footer.rights')}
          </p>

          <a
            href="#main"
            className="group flex items-center gap-2 text-xs text-steel-500 transition-colors hover:text-gold"
          >
            {t('footer.backToTop')}
            <svg
              viewBox="0 0 16 16"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <path d="M8 13V3M4 7l4-4 4 4" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-starlight">
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm text-steel-400 transition-colors duration-300 hover:text-gold"
      >
        <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
        {children}
      </Link>
    </li>
  );
}
