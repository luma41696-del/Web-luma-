import type { Project } from './types';

/**
 * Portfolio projects, taken from the live LUMA API (/api/v1/projects).
 *
 * Note on imagery: the previous site referenced project photographs at
 * luma-jo.com/projects/*.jpg, but every one of those URLs now 404s. Rather
 * than substitute stock photography — which would misrepresent the work —
 * each project is rendered with a generated constellation cover keyed to its
 * category (see <ProjectCover />). To use real photography instead, drop a
 * file into /public/images/projects/<slug>.jpg and set `image` below; the
 * card picks it up automatically.
 *
 * Categories come from /api/v1/categories.
 */
export const projectCategories = [
  {
    slug: 'all',
    name: { en: 'All Projects', ar: 'جميع المشاريع' },
  },
  {
    slug: 'digital-marketing',
    name: { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
    description: {
      en: 'Campaigns, SEO, social media, and brand strategy that lift visibility and engagement.',
      ar: 'حملات وتحسين محركات بحث ووسائل تواصل واستراتيجية علامة ترفع الحضور والتفاعل.',
    },
  },
  {
    slug: 'business-development',
    name: { en: 'Business Development', ar: 'تطوير الأعمال' },
    description: {
      en: 'Market research, strategy planning, partnerships, and revenue optimization.',
      ar: 'أبحاث السوق والتخطيط الاستراتيجي والشراكات وتحسين الإيرادات.',
    },
  },
  {
    slug: 'content-production',
    name: { en: 'Content Creation & Production', ar: 'صناعة المحتوى والإنتاج' },
    description: {
      en: 'Photography, videography, graphic design, copywriting, and multimedia campaigns.',
      ar: 'التصوير والفيديو والتصميم الجرافيكي وكتابة المحتوى والحملات متعددة الوسائط.',
    },
  },
  {
    slug: 'it-software-development',
    name: { en: 'IT & Software Development', ar: 'تكنولوجيا المعلومات والبرمجيات' },
    description: {
      en: 'Websites, mobile apps, custom software, and digital platforms.',
      ar: 'المواقع والتطبيقات والبرمجيات المخصّصة والمنصّات الرقمية.',
    },
  },
] as const;

export const projects: Project[] = [
  {
    slug: 'social-media-growth-campaign',
    legacyId: '',
    title: {
      en: 'Social Media Growth Campaign',
      ar: 'حملة نمو على منصّات التواصل',
    },
    client: 'JordanTech',
    year: 2025,
    category: { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
    categorySlug: 'digital-marketing',
    description: {
      en: 'A comprehensive social media campaign to increase engagement and followers for a local brand.',
      ar: 'حملة شاملة على منصّات التواصل الاجتماعي لزيادة التفاعل وعدد المتابعين لعلامة تجارية محلية.',
    },
    tags: {
      en: ['Social media', 'Branding', 'Engagement'],
      ar: ['تواصل اجتماعي', 'هوية تجارية', 'تفاعل'],
    },
    featured: true,
  },
  {
    slug: 'seo-optimization-ecommerce',
    legacyId: '',
    title: {
      en: 'SEO Optimization for E-commerce',
      ar: 'تحسين محركات البحث لمتجر إلكتروني',
    },
    client: 'ShopAmman',
    year: 2025,
    category: { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
    categorySlug: 'digital-marketing',
    description: {
      en: 'Implemented SEO strategies to increase organic traffic for an online store.',
      ar: 'تنفيذ استراتيجيات تحسين محركات البحث لزيادة الزيارات العضوية لمتجر إلكتروني.',
    },
    tags: {
      en: ['SEO', 'E-commerce', 'Digital marketing'],
      ar: ['تحسين محركات البحث', 'تجارة إلكترونية', 'تسويق رقمي'],
    },
    featured: false,
  },
  {
    slug: 'market-expansion-strategy',
    legacyId: '',
    title: { en: 'Market Expansion Strategy', ar: 'استراتيجية التوسّع في السوق' },
    client: 'AmmanTech',
    year: 2025,
    category: { en: 'Business Development', ar: 'تطوير الأعمال' },
    categorySlug: 'business-development',
    description: {
      en: 'Strategic planning for expanding a tech startup into new regional markets.',
      ar: 'تخطيط استراتيجي لتوسّع شركة تقنية ناشئة في أسواق إقليمية جديدة.',
    },
    tags: {
      en: ['Strategy', 'Growth', 'Business'],
      ar: ['استراتيجية', 'نمو', 'أعمال'],
    },
    featured: true,
  },
  {
    slug: 'brand-photography-shoot',
    legacyId: '',
    title: { en: 'Brand Photography Shoot', ar: 'جلسة تصوير للعلامة التجارية' },
    client: 'FashionAmman',
    year: 2025,
    category: { en: 'Content Creation & Production', ar: 'صناعة المحتوى والإنتاج' },
    categorySlug: 'content-production',
    description: {
      en: 'Full photography session for a fashion brand, including product and lifestyle shots.',
      ar: 'جلسة تصوير متكاملة لعلامة أزياء، شملت لقطات المنتجات ونمط الحياة.',
    },
    tags: {
      en: ['Photography', 'Branding', 'Visual content'],
      ar: ['تصوير', 'هوية تجارية', 'محتوى بصري'],
    },
    featured: true,
  },
  {
    slug: 'promotional-video-production',
    legacyId: '',
    title: { en: 'Promotional Video Production', ar: 'إنتاج فيديو ترويجي' },
    client: 'TechNova',
    year: 2025,
    category: { en: 'Content Creation & Production', ar: 'صناعة المحتوى والإنتاج' },
    categorySlug: 'content-production',
    description: {
      en: 'Created a 2-minute promotional video for a tech company product launch.',
      ar: 'إنتاج فيديو ترويجي مدّته دقيقتان لإطلاق منتج شركة تقنية.',
    },
    tags: {
      en: ['Videography', 'Marketing', 'Content creation'],
      ar: ['إنتاج فيديو', 'تسويق', 'صناعة محتوى'],
    },
    featured: false,
  },
  {
    slug: 'ecommerce-website-development',
    legacyId: '',
    title: {
      en: 'E-Commerce Website Development',
      ar: 'تطوير موقع تجارة إلكترونية',
    },
    client: 'ShopAmman',
    year: 2025,
    category: { en: 'IT & Software Development', ar: 'تكنولوجيا المعلومات والبرمجيات' },
    categorySlug: 'it-software-development',
    description: {
      en: 'Developed a responsive e-commerce website with full admin panel and payment integration.',
      ar: 'تطوير موقع تجارة إلكترونية متجاوب مع لوحة تحكم كاملة وتكامل مع بوابات الدفع.',
    },
    tags: {
      en: ['Web development', 'E-commerce', 'Software'],
      ar: ['تطوير ويب', 'تجارة إلكترونية', 'برمجيات'],
    },
    featured: true,
  },
  {
    slug: 'mobile-app-development',
    legacyId: '',
    title: { en: 'Mobile App Development', ar: 'تطوير تطبيق هاتف' },
    client: 'AmmanTech',
    year: 2025,
    category: { en: 'IT & Software Development', ar: 'تكنولوجيا المعلومات والبرمجيات' },
    categorySlug: 'it-software-development',
    description: {
      en: 'Developed a cross-platform mobile app for a local startup.',
      ar: 'تطوير تطبيق هاتف متعدد المنصّات لشركة ناشئة محلية.',
    },
    tags: {
      en: ['Mobile app', 'Flutter', 'Software development'],
      ar: ['تطبيق هاتف', 'Flutter', 'تطوير برمجيات'],
    },
    featured: false,
  },
  {
    slug: 'customer-service-chatbot',
    legacyId: '',
    title: { en: 'Customer Service Chatbot', ar: 'روبوت محادثة لخدمة العملاء' },
    client: 'E-Shop Jordan',
    year: 2025,
    category: { en: 'IT & Software Development', ar: 'تكنولوجيا المعلومات والبرمجيات' },
    categorySlug: 'it-software-development',
    description: {
      en: 'AI-powered chatbot to automate customer support for an online platform.',
      ar: 'روبوت محادثة مدعوم بالذكاء الاصطناعي لأتمتة دعم العملاء لمنصّة إلكترونية.',
    },
    tags: {
      en: ['AI', 'Automation', 'Chatbot'],
      ar: ['ذكاء اصطناعي', 'أتمتة', 'روبوت محادثة'],
    },
    featured: true,
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
