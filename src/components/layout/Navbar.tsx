'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useScrollLock } from '@/lib/hooks';
import { Logo, StarGlyph } from '@/components/ui/Logo';
import { LinkButton } from '@/components/ui/Button';

const NAV_ITEMS = [
  { href: '/', key: 'nav.home' },
  { href: '/about', key: 'nav.about' },
  { href: '/services', key: 'nav.services' },
  { href: '/portfolio', key: 'nav.portfolio' },
  { href: '/#recognition', key: 'nav.recognition' },
  { href: '/contact', key: 'nav.contact' },
] as const;

export function Navbar() {
  const { t, locale, toggleLocale } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollLock(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-space-900"
      >
        {t('nav.skipToContent')}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-cosmic ${
          scrolled
            ? 'border-b border-white/[0.07] bg-space-900/72 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        }`}
        style={{ height: 'var(--nav-h)' }}
      >
        <nav
          aria-label={t('a11y.sectionNav')}
          className="shell flex h-full items-center justify-between gap-6"
        >
          <Logo label={t('a11y.logoHome')} priority markSize={20} />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative rounded-full px-4 py-2 text-[0.8rem] font-medium tracking-wide transition-colors duration-300 ${
                      active
                        ? 'text-gold'
                        : 'text-steel-300 hover:text-starlight'
                    }`}
                  >
                    {t(item.key)}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle onToggle={toggleLocale} locale={locale} label={t('lang.switchTo')} next={t('lang.toggle')} />

            <LinkButton
              href="/contact"
              size="md"
              className="hidden sm:inline-flex"
              magnetic={false}
            >
              {t('nav.getStarted')}
            </LinkButton>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-starlight transition-colors hover:border-gold/40 hover:text-gold lg:hidden"
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ease-cosmic ${
                    menuOpen ? 'translate-y-[6.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current transition-opacity duration-200 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ease-cosmic ${
                    menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[95] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-space-900/92 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="absolute inset-x-0 bottom-0 top-[var(--nav-h)] overflow-y-auto px-6 pb-10 pt-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 + index * 0.05,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`group flex items-center justify-between border-b border-white/[0.06] py-4 text-2xl font-bold transition-colors ${
                        isActive(item.href)
                          ? 'text-gold'
                          : 'text-starlight hover:text-gold-400'
                      }`}
                    >
                      {t(item.key)}
                      <StarGlyph
                        size={12}
                        className="text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.45 }}
                className="mt-9"
              >
                <LinkButton href="/contact" size="lg" className="w-full" magnetic={false}>
                  {t('nav.getStarted')}
                </LinkButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LanguageToggle({
  onToggle,
  locale,
  label,
  next,
}: {
  onToggle: () => void;
  locale: string;
  label: string;
  next: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      lang={locale === 'en' ? 'ar' : 'en'}
      className="glass flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[0.78rem] font-bold text-starlight transition-colors duration-300 hover:border-gold/40 hover:text-gold"
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18A15 15 0 0 1 12 3z" />
      </svg>
      {next}
    </button>
  );
}
