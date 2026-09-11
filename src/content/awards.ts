import type { Award } from './types';

/**
 * Hall of Recognition — the physical shields and certificates of appreciation
 * presented to LUMA Agency by its clients and partners.
 *
 * Every entry below is transcribed from the plaque photograph it points at.
 * No awarding body, date or citation has been added beyond what is engraved
 * on the object itself; where a plaque does not name a recipient, `recipient`
 * is simply omitted rather than guessed.
 *
 * All source images are square (1:1).
 */
export const awards: Award[] = [
  {
    // Opens the rail.
    slug: 'htu',
    image: 'htu',
    width: 1024,
    height: 1024,
    awardedBy: {
      en: 'Al Hussein Technical University',
      ar: 'جامعة الحسين التقنية',
    },
    title: {
      en: 'E-Commerce Website Competition',
      ar: 'مسابقة مواقع التجارة الإلكترونية',
    },
    recipient: {
      en: 'Mohammad Aljaouni — for his contribution as a Judge',
      ar: 'محمد الجاعوني — تقديراً لمساهمته عضواً في لجنة التحكيم',
    },
    alt: {
      en: 'Clear acrylic award on a blue and glass base, presented by Al Hussein Technical University to Mohammad Aljaouni for his contribution as a judge in the E-Commerce Website Competition.',
      ar: 'درع أكريليك شفاف على قاعدة زجاجية زرقاء، مقدَّم من جامعة الحسين التقنية إلى محمد الجاعوني تقديراً لمساهمته في تحكيم مسابقة مواقع التجارة الإلكترونية.',
    },
  },
  {
    slug: 'high-tech',
    image: 'high-tech',
    width: 2048,
    height: 2048,
    awardedBy: { en: 'High Tech', ar: 'شركة High Tech' },
    title: { en: 'Shield of Thanks & Appreciation', ar: 'درع شكر وتقدير' },
    recipient: {
      en: 'Mohammad Aljaouni — Business Developer',
      ar: 'محمد الجاعوني — مطوّر الأعمال',
    },
    alt: {
      en: 'Glass shield on a wooden base presented by High Tech to LUMA Agency, engraved with an Arabic certificate of thanks and appreciation.',
      ar: 'درع زجاجي على قاعدة خشبية مقدّم من شركة High Tech إلى وكالة LUMA، منقوش عليه شهادة شكر وتقدير بالعربية.',
    },
  },
  {
    slug: 'emaar-al-diyafa',
    image: 'emaar-al-diyafa',
    width: 1024,
    height: 1024,
    awardedBy: {
      en: 'Emaar Al Diyafa Hotels',
      ar: 'شركة إعمار الضيافة الفندقية',
    },
    title: { en: 'Commemorative Trophy', ar: 'درع تذكاري' },
    alt: {
      en: 'Gold trophy with an Islamic geometric panel and an engraved tree motif, presented in a black presentation case by Emaar Al Diyafa Hotels.',
      ar: 'درع ذهبي بزخرفة هندسية إسلامية ونقش على هيئة شجرة، داخل علبة تقديم سوداء، مقدّم من شركة إعمار الضيافة الفندقية.',
    },
  },
  {
    slug: 'saraya-group',
    image: 'saraya-group',
    width: 1024,
    height: 1024,
    awardedBy: {
      en: 'Saraya Commercial Group',
      ar: 'مجموعة سرايا التجارية',
    },
    title: { en: 'Thanks & Appreciation', ar: 'شكر وتقدير' },
    recipient: {
      en: 'Mr. Mohammad Aljaouni, CEO',
      ar: 'السيد محمد الجاعوني، الرئيس التنفيذي',
    },
    alt: {
      en: 'Crystal award on a black and clear base, presented by Saraya Commercial Group to LUMA Agency in 2026.',
      ar: 'درع كريستالي على قاعدة سوداء وشفافة، مقدّم من مجموعة سرايا التجارية إلى وكالة LUMA عام 2026.',
    },
  },
  {
    slug: 'smart-solutions',
    image: 'smart-solutions',
    width: 2048,
    height: 2048,
    awardedBy: { en: 'Smart Solutions', ar: 'شركة Smart Solutions' },
    title: { en: 'Thanks & Appreciation', ar: 'شكر وتقدير' },
    recipient: {
      en: 'Mohammad Aljaouni — Developers Business',
      ar: 'محمد الجاعوني — تطوير الأعمال',
    },
    alt: {
      en: 'Curved glass award presented by Smart Solutions to LUMA Agency, recognising contribution to their digital solutions.',
      ar: 'درع زجاجي منحني مقدّم من شركة Smart Solutions إلى وكالة LUMA تقديراً للمساهمة في تطوير حلولها الرقمية.',
    },
  },
  {
    slug: 'quick-mobile',
    image: 'quick-mobile',
    width: 2048,
    height: 2048,
    awardedBy: { en: 'Quick Mobile', ar: 'كويك موبايل' },
    title: { en: 'Appreciation Award', ar: 'جائزة تقدير' },
    recipient: {
      en: 'Mohammad Aljaouni, CEO',
      ar: 'محمد الجاعوني، الرئيس التنفيذي',
    },
    alt: {
      en: 'Octagonal crystal appreciation award on a black patterned base, presented by Quick Mobile to LUMA Agency.',
      ar: 'جائزة تقدير كريستالية ثمانية الأضلاع على قاعدة سوداء مزخرفة، مقدّمة من كويك موبايل إلى وكالة LUMA.',
    },
  },
  {
    slug: 'smart-security',
    image: 'smart-security',
    width: 2048,
    height: 2048,
    awardedBy: {
      en: 'Smart Security',
      ar: 'مؤسسة الحماية الذكية',
    },
    title: { en: 'Thanks & Appreciation', ar: 'شكر وتقدير' },
    recipient: {
      en: 'Mohammad Aljaouni — Developers Business',
      ar: 'محمد الجاعوني — تطوير الأعمال',
    },
    alt: {
      en: 'Frosted glass plaque in a wooden presentation box, presented by Smart Security to LUMA Agency.',
      ar: 'درع زجاجي مصنفر داخل علبة خشبية، مقدّم من مؤسسة الحماية الذكية إلى وكالة LUMA.',
    },
  },
  {
    slug: 'darwish-satellite',
    image: 'darwish-satellite',
    width: 2048,
    height: 2048,
    awardedBy: { en: 'Darwish Satellite', ar: 'درويش ساتلايت' },
    title: { en: 'Thanks & Appreciation', ar: 'شكر وتقدير' },
    recipient: {
      en: 'Mohammad Aljaouni — Developers Business',
      ar: 'محمد الجاعوني — تطوير الأعمال',
    },
    alt: {
      en: 'Gold plaque with an ornamental red border in a black presentation box, presented by Darwish Satellite to LUMA Agency.',
      ar: 'درع ذهبي بإطار زخرفي أحمر داخل علبة سوداء، مقدّم من درويش ساتلايت إلى وكالة LUMA.',
    },
  },
  {
    slug: 'dawaimeh',
    image: 'dawaimeh',
    width: 1024,
    height: 1024,
    awardedBy: {
      en: 'Dawaimeh Electrical Appliances',
      ar: 'الدوايمة للأجهزة الكهربائية',
    },
    title: { en: 'Thanks & Appreciation', ar: 'شكر وتقدير' },
    recipient: {
      en: 'Mohammad Aljaouni, CEO — Developers Business',
      ar: 'محمد الجاعوني، الرئيس التنفيذي — تطوير الأعمال',
    },
    alt: {
      en: 'Gold shield with Islamic geometric borders in a wooden case, presented by Dawaimeh Electrical Appliances to LUMA Agency.',
      ar: 'درع ذهبي بحواف زخرفية إسلامية داخل علبة خشبية، مقدّم من الدوايمة للأجهزة الكهربائية إلى وكالة LUMA.',
    },
  },
  {
    slug: 'high-hawks',
    image: 'high-hawks',
    width: 1024,
    height: 1024,
    awardedBy: {
      en: 'High Hawks Technology Co.',
      ar: 'شركة High Hawks للتكنولوجيا',
    },
    title: { en: 'Certificate of Appreciation', ar: 'شهادة تقدير' },
    recipient: {
      en: 'Mohammad Aljaouni — Business Developer',
      ar: 'محمد الجاعوني — مطوّر الأعمال',
    },
    alt: {
      en: 'Glass certificate of appreciation mounted between two crystal columns, presented by High Hawks Technology to LUMA Agency.',
      ar: 'شهادة تقدير زجاجية بين عمودين كريستاليين، مقدّمة من شركة High Hawks للتكنولوجيا إلى وكالة LUMA.',
    },
  },
  {
    slug: 'jordanian-contractors',
    image: 'jordanian-contractors',
    width: 1024,
    height: 1024,
    // The engineer is named in `awardedBy` rather than `recipient` so he
    // appears on the card itself — `recipient` only surfaces in the lightbox.
    awardedBy: {
      en: 'Jordanian Contractors Association — Eng. Ahmad Al-Yacoub',
      ar: 'نقابة المقاولين الأردنيين — المهندس أحمد اليعقوب',
    },
    title: { en: 'Commemorative Shield', ar: 'درع تذكاري' },
    recipient: {
      en: 'Head of the Jordanian Contractors Association',
      ar: 'نقيب المقاولين الأردنيين',
    },
    alt: {
      en: 'Cast metal shield on a brass stand, embossed with a wax-seal emblem of the map of Jordan reading "Made in Jordan", presented by the Head of the Jordanian Contractors Association.',
      ar: 'درع معدني مصبوب على قاعدة نحاسية، منقوش عليه ختم بخريطة الأردن وعبارة «صنع في الأردن»، مقدَّم من نقيب المقاولين الأردني.',
    },
  },
  {
    slug: 'technical-broker',
    image: 'technical-broker',
    width: 2048,
    height: 2048,
    // The plaque is engraved "TECHNICAL BROKER", so the English name follows
    // the artwork; the Arabic is the company's own Arabic name.
    awardedBy: { en: 'Technical Broker', ar: 'شركة الوسيط التقني' },
    title: { en: 'Appreciation Award', ar: 'جائزة تقدير' },
    recipient: {
      en: 'Mohammad Aljaouni — Developer Business',
      ar: 'محمد الجاعوني — تطوير الأعمال',
    },
    alt: {
      en: 'Crystal appreciation award presented by Technical Broker to LUMA Agency for contribution to business development and digital presence.',
      ar: 'جائزة تقدير كريستالية مقدّمة من شركة الوسيط التقني إلى وكالة LUMA تقديراً لمساهمتها في تطوير الأعمال والحضور الرقمي.',
    },
  },
  {
    // Closes the rail.
    slug: 'abu-saddam',
    image: 'abu-saddam',
    width: 1024,
    height: 1024,
    awardedBy: {
      en: 'Abu Saddam Electricity',
      ar: 'معرض أبو صدام للأجهزة الكهربائية',
    },
    title: { en: 'Shield of Appreciation', ar: 'درع تقدير' },
    recipient: {
      en: 'Mohammad Aljaouni',
      ar: 'محمد الجاعوني',
    },
    alt: {
      en: 'Shield-shaped clear acrylic award engraved in Arabic, presented by Abu Saddam Electricity to LUMA Agency in recognition of its work in digital marketing.',
      ar: 'درع أكريليك شفاف على شكل درع منقوش بالعربية، مقدَّم من معرض أبو صدام للأجهزة الكهربائية إلى وكالة LUMA تقديراً لجهودها في التسويق الرقمي.',
    },
  },
];

/**
 * Path helpers for the derivatives written by `npm run optimize:images`.
 * The 2048² masters live in `assets-src/awards/` and are never deployed.
 */
export const awardSrc = {
  card: (image: string) => `/images/awards/${image}-800.webp`,
  full: (image: string) => `/images/awards/${image}-1600.webp`,
  fullAvif: (image: string) => `/images/awards/${image}-1600.avif`,
};
