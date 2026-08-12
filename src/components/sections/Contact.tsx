'use client';

import { useState, type FormEvent } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { links, siteConfig } from '@/content/site.config';
import { services } from '@/content/services';
import { faqs } from '@/content/company';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { UtilityIcon } from '@/components/ui/Icons';
import { StarGlyph } from '@/components/ui/Logo';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'phone' | 'service' | 'message', string>>;

/**
 * Mission control: the contact console.
 *
 * Validation runs client-side on submit and again on blur once a field has
 * been touched, so nobody is scolded for a field they have not finished
 * typing. Errors are wired to their inputs with aria-describedby and the
 * status region is polite, not assertive.
 */
export function ContactSection() {
  const { t, pick } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const service = String(data.get('service') ?? '');
    const message = String(data.get('message') ?? '').trim();

    if (!name) next.name = t('contact.errors.nameRequired');
    else if (name.length < 2) next.name = t('contact.errors.nameMin');

    if (!email) next.email = t('contact.errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = t('contact.errors.emailInvalid');

    // Phone is optional, but if given it must look like a phone number.
    if (phone && !/^[+\d][\d\s()-]{6,}$/.test(phone))
      next.phone = t('contact.errors.phoneInvalid');

    if (!service) next.service = t('contact.errors.serviceRequired');

    if (!message) next.message = t('contact.errors.messageRequired');
    else if (message.length < 10) next.message = t('contact.errors.messageMin');

    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    setStatus('sending');

    const payload = {
      name: String(data.get('name')),
      company: String(data.get('company') ?? ''),
      email: String(data.get('email')),
      phone: String(data.get('phone') ?? ''),
      service: String(data.get('service')),
      message: String(data.get('message')),
    };

    // With no endpoint configured the form degrades to a mailto: hand-off, so
    // it is never a dead button. Set `contactEndpoint` in site.config.ts to
    // POST to a real backend instead. See README → "Contact form".
    if (!siteConfig.contactEndpoint) {
      const body = [
        `${t('contact.name')}: ${payload.name}`,
        `${t('contact.company')}: ${payload.company}`,
        `${t('contact.email')}: ${payload.email}`,
        `${t('contact.phone')}: ${payload.phone}`,
        `${t('contact.service')}: ${payload.service}`,
        '',
        payload.message,
      ].join('\n');

      window.location.href = `${links.mail}?subject=${encodeURIComponent(
        `${payload.service} — ${payload.name}`,
      )}&body=${encodeURIComponent(body)}`;

      setStatus('sent');
      form.reset();
      return;
    }

    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section scroll-mt-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Console */}
          <Reveal>
            <div className="glass rounded-3xl p-7 sm:p-10">
              <h2 className="text-2xl font-bold text-starlight">
                {t('contact.formTitle')}
              </h2>
              <p className="mt-2.5 text-[0.9rem] font-light text-steel-400">
                {t('contact.formSubtitle')}
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    name="name"
                    label={t('contact.name')}
                    placeholder={t('contact.placeholders.name')}
                    error={errors.name}
                    required
                    autoComplete="name"
                  />
                  <Field
                    name="company"
                    label={`${t('contact.company')} (${t('contact.optional')})`}
                    placeholder={t('contact.placeholders.company')}
                    autoComplete="organization"
                  />
                  <Field
                    name="email"
                    type="email"
                    label={t('contact.email')}
                    placeholder={t('contact.placeholders.email')}
                    error={errors.email}
                    required
                    autoComplete="email"
                    dir="ltr"
                  />
                  <Field
                    name="phone"
                    type="tel"
                    label={`${t('contact.phone')} (${t('contact.optional')})`}
                    placeholder={t('contact.placeholders.phone')}
                    error={errors.phone}
                    autoComplete="tel"
                    dir="ltr"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="service"
                    className="mb-2 block text-[0.74rem] font-bold uppercase tracking-[0.14em] text-steel-300"
                  >
                    {t('contact.service')}{' '}
                    <span aria-hidden="true" className="text-gold">
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      required
                      defaultValue=""
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                      className={`w-full appearance-none rounded-xl border bg-space-800/70 px-4 py-3.5 pe-11 text-[0.92rem] text-starlight outline-none transition-colors duration-300 focus:border-gold/60 ${
                        errors.service ? 'border-red-400/70' : 'border-white/10'
                      }`}
                    >
                      <option value="" disabled>
                        {t('contact.selectService')}
                      </option>
                      {services.map((service) => (
                        <option key={service.slug} value={service.title.en}>
                          {pick(service.title)}
                        </option>
                      ))}
                    </select>
                    <UtilityIcon
                      name="chevron"
                      size={16}
                      className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-steel-500"
                    />
                  </div>
                  {errors.service && <FieldError id="service-error">{errors.service}</FieldError>}
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[0.74rem] font-bold uppercase tracking-[0.14em] text-steel-300"
                  >
                    {t('contact.message')}{' '}
                    <span aria-hidden="true" className="text-gold">
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t('contact.placeholders.message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full resize-y rounded-xl border bg-space-800/70 px-4 py-3.5 text-[0.92rem] text-starlight outline-none transition-colors duration-300 placeholder:text-steel-600 focus:border-gold/60 ${
                      errors.message ? 'border-red-400/70' : 'border-white/10'
                    }`}
                  />
                  {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
                </div>

                <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'sending'}
                    magnetic={false}
                  >
                    {status === 'sending' ? t('contact.sending') : t('contact.send')}
                    {status !== 'sending' && <StarGlyph size={12} />}
                  </Button>

                  <p
                    role="status"
                    aria-live="polite"
                    className={`text-[0.84rem] ${
                      status === 'error' ? 'text-red-300' : 'text-gold-400'
                    }`}
                  >
                    {status === 'sent' && t('contact.sent')}
                    {status === 'error' && t('contact.error')}
                  </p>
                </div>
              </form>
            </div>
          </Reveal>

          {/* Channels */}
          <div className="flex flex-col gap-5">
            <Reveal>
              <div className="glass rounded-3xl p-7">
                <h2 className="flex items-center gap-2.5 text-lg font-bold text-starlight">
                  <StarGlyph size={12} className="text-gold" />
                  {t('contact.infoTitle')}
                </h2>
                <p className="mt-2 text-[0.85rem] font-light text-steel-400">
                  {t('contact.infoSubtitle')}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  <Channel
                    icon="phone"
                    label={t('contact.callUs')}
                    value={siteConfig.contact.phoneDisplay}
                    href={links.tel}
                  />
                  <Channel
                    icon="mail"
                    label={t('contact.emailUs')}
                    value={siteConfig.contact.email}
                    href={links.mail}
                  />
                  <Channel
                    icon="whatsapp"
                    label={t('contact.whatsapp')}
                    value={siteConfig.contact.whatsapp}
                    href={links.whatsapp()}
                    external
                  />
                  <Channel
                    icon="pin"
                    label={t('contact.findUs')}
                    value={pick(siteConfig.location.display)}
                    href={siteConfig.location.mapsUrl}
                    external
                  />
                </ul>

                <div className="mt-7">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-steel-400">
                    {t('contact.followUs')}
                  </p>
                  <ul className="mt-3.5 flex gap-2.5">
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
                            name={profile.platform.toLowerCase() as 'linkedin' | 'instagram'}
                            size={17}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={0.1}>
              <div className="glass overflow-hidden rounded-3xl">
                <iframe
                  src={siteConfig.location.mapsEmbedUrl}
                  title={t('contact.findUs')}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full border-0 opacity-90 grayscale-[0.35] contrast-[1.05]"
                />
                <a
                  href={siteConfig.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 px-6 py-4 text-[0.82rem] font-medium text-steel-300 transition-colors hover:text-gold"
                >
                  {t('contact.openInMaps')}
                  <UtilityIcon name="external" size={14} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-starlight sm:text-3xl">
              {t('sections.faqTitle')}
            </h2>
          </Reveal>

          <RevealGroup className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
            {faqs.map((faq, index) => (
              <Reveal key={index}>
                <details className="glass group rounded-2xl px-6 py-5 transition-colors duration-300 hover:border-gold/25 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.95rem] font-bold text-starlight">
                    {pick(faq.question)}
                    <UtilityIcon
                      name="chevron"
                      size={17}
                      className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3.5 text-[0.9rem] font-light leading-relaxed text-steel-400">
                    {pick(faq.answer)}
                  </p>
                </details>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  error,
  type = 'text',
  required = false,
  autoComplete,
  dir,
}: {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  dir?: 'ltr' | 'rtl';
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.74rem] font-bold uppercase tracking-[0.14em] text-steel-300"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ms-1 text-gold">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        dir={dir}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-xl border bg-space-800/70 px-4 py-3.5 text-[0.92rem] text-starlight outline-none transition-colors duration-300 placeholder:text-steel-600 focus:border-gold/60 ${
          error ? 'border-red-400/70' : 'border-white/10'
        }`}
      />
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[0.76rem] text-red-300">
      {children}
    </p>
  );
}

function Channel({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: 'phone' | 'mail' | 'whatsapp' | 'pin';
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-space-800/50 px-4 py-3.5 transition-colors duration-300 hover:border-gold/30 hover:bg-midnight-800/50"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/[0.09] text-gold">
          <UtilityIcon name={icon} size={17} />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-steel-500">
            {label}
          </span>
          <span
            className="block truncate text-[0.9rem] text-starlight transition-colors group-hover:text-gold-400"
            dir={icon === 'phone' || icon === 'whatsapp' ? 'ltr' : undefined}
          >
            {value}
          </span>
        </span>
      </a>
    </li>
  );
}
