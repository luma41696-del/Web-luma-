import type { Service } from './types';

/**
 * The five LUMA services.
 *
 * English copy is taken from the live LUMA API (/api/v1/services), lightly
 * tightened for rhythm without altering meaning. The Arabic API fields were
 * all null, so the Arabic below is a faithful translation of that same English
 * source — no new claims were introduced. `technologies` arrived from the API
 * already bilingual in "English|العربية" form and is split verbatim here.
 */
export const services: Service[] = [
  {
    slug: 'digital-marketing',
    legacyId: '69147e87a31c3aa4f67a4a14',
    icon: 'marketing',
    hue: 38,
    title: { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
    summary: {
      en: 'We help businesses grow with creative and effective marketing strategies and campaigns.',
      ar: 'نساعد الشركات على النمو عبر استراتيجيات وحملات تسويقية مبدعة وفعّالة.',
    },
    overview: {
      en: 'Our marketing team combines creativity and data-driven strategies to increase brand visibility, engage audiences, and drive results. We craft campaigns that align with business goals and build meaningful brand experiences.',
      ar: 'يجمع فريق التسويق لدينا بين الإبداع والاستراتيجيات القائمة على البيانات لزيادة حضور العلامة التجارية، وإشراك الجمهور، وتحقيق نتائج ملموسة. نصنع حملات متوائمة مع أهداف العمل ونبني تجارب علامة تجارية ذات معنى.',
    },
    features: {
      en: [
        'Digital marketing campaigns',
        'Social media management',
        'SEO & content marketing',
        'Brand strategy',
        'Campaign analytics & optimization',
      ],
      ar: [
        'حملات التسويق الرقمي',
        'إدارة منصّات التواصل الاجتماعي',
        'تحسين محركات البحث وتسويق المحتوى',
        'استراتيجية العلامة التجارية',
        'تحليل الحملات وتحسين أدائها',
      ],
    },
    benefits: {
      en: [
        'Increase brand awareness',
        'Drive customer engagement',
        'Boost sales and leads',
        'Data-driven marketing insights',
        'Strong, consistent brand presence',
      ],
      ar: [
        'زيادة الوعي بالعلامة التجارية',
        'رفع تفاعل العملاء',
        'زيادة المبيعات والعملاء المحتملين',
        'رؤى تسويقية مبنية على البيانات',
        'حضور قوي ومتّسق للعلامة التجارية',
      ],
    },
    process: {
      en: [
        'Consultation and goal setting',
        'Strategy development',
        'Campaign design and execution',
        'Monitoring and optimization',
        'Reporting and insights',
      ],
      ar: [
        'الاستشارة وتحديد الأهداف',
        'بناء الاستراتيجية',
        'تصميم الحملة وتنفيذها',
        'المتابعة والتحسين',
        'التقارير والرؤى',
      ],
    },
    technologies: {
      en: [
        'Marketing automation tools',
        'Analytics platforms',
        'SEO tools',
        'Social media platforms',
        'Content creation software',
      ],
      ar: [
        'أدوات أتمتة التسويق',
        'منصّات التحليلات',
        'أدوات تحسين محركات البحث',
        'منصّات التواصل الاجتماعي',
        'برامج إنشاء المحتوى',
      ],
    },
    category: { en: 'Marketing Services', ar: 'خدمات التسويق' },
  },

  {
    slug: 'business-development',
    legacyId: '69147e9ba31c3aa4f67a4a15',
    icon: 'business',
    hue: 205,
    title: { en: 'Business Development', ar: 'تطوير الأعمال' },
    summary: {
      en: 'Supporting growth through strategy, partnerships, and revenue optimization.',
      ar: 'ندعم النمو عبر الاستراتيجية والشراكات وتحسين الإيرادات.',
    },
    overview: {
      en: 'We help organisations find their next step and take it with confidence — mapping the market, shaping the strategy, opening the right partnerships, and tuning the commercial engine that turns all of it into revenue.',
      ar: 'نساعد المؤسسات على تحديد خطوتها التالية والمضي فيها بثقة — من قراءة السوق، وصياغة الاستراتيجية، وفتح الشراكات المناسبة، وصولاً إلى ضبط المحرّك التجاري الذي يحوّل ذلك كلّه إلى إيرادات.',
    },
    features: {
      en: [
        'Market research and analysis',
        'Strategy planning',
        'Partnership and client acquisition',
        'Revenue optimization',
        'Business process consulting',
      ],
      ar: [
        'أبحاث السوق والتحليل',
        'التخطيط الاستراتيجي',
        'بناء الشراكات واستقطاب العملاء',
        'تحسين الإيرادات',
        'استشارات العمليات التشغيلية',
      ],
    },
    benefits: {
      en: [
        'Clear, evidence-based direction',
        'Access to new markets and partners',
        'Healthier, more predictable revenue',
        'Leaner internal processes',
        'Growth that can be sustained',
      ],
      ar: [
        'وجهة واضحة قائمة على الأدلة',
        'الوصول إلى أسواق وشركاء جدد',
        'إيرادات أكثر صحّة وقابلية للتوقّع',
        'عمليات داخلية أكثر انسيابية',
        'نمو قابل للاستدامة',
      ],
    },
    process: {
      en: [
        'Discovery and market mapping',
        'Opportunity assessment',
        'Strategy and roadmap',
        'Partnership and pipeline activation',
        'Review and iteration',
      ],
      ar: [
        'الاستكشاف ورسم خارطة السوق',
        'تقييم الفرص',
        'الاستراتيجية وخارطة الطريق',
        'تفعيل الشراكات وخطّ العملاء',
        'المراجعة والتطوير المستمر',
      ],
    },
    technologies: {
      en: [
        'CRM platforms',
        'Market intelligence tools',
        'Business analytics dashboards',
        'Pipeline management systems',
        'Reporting and forecasting tools',
      ],
      ar: [
        'منصّات إدارة علاقات العملاء',
        'أدوات ذكاء السوق',
        'لوحات تحليلات الأعمال',
        'أنظمة إدارة خطّ المبيعات',
        'أدوات التقارير والتنبّؤ',
      ],
    },
    category: { en: 'Business Services', ar: 'خدمات الأعمال' },
  },

  {
    slug: 'automation-ai',
    legacyId: '69147eeda31c3aa4f67a4a18',
    icon: 'automation',
    hue: 178,
    title: { en: 'Automation & AI Solutions', ar: 'الأتمتة وحلول الذكاء الاصطناعي' },
    summary: {
      en: 'Streamlining business processes using smart automation and AI-driven tools.',
      ar: 'نبسّط العمليات التشغيلية عبر الأتمتة الذكية والأدوات المدعومة بالذكاء الاصطناعي.',
    },
    overview: {
      en: 'Repetitive work is expensive work. We map where your time actually goes, then remove the friction with automated workflows, connected platforms, and AI-driven tools that keep running long after the project ends.',
      ar: 'العمل المتكرّر عمل مكلف. نرسم خريطة لما يستهلك وقتكم فعلياً، ثم نزيل الاحتكاك عبر مسارات عمل مؤتمتة، ومنصّات مترابطة، وأدوات مدعومة بالذكاء الاصطناعي تواصل العمل بعد انتهاء المشروع بوقت طويل.',
    },
    features: {
      en: [
        'Workflow automation',
        'AI-driven process optimization',
        'Task scheduling and management',
        'Integration between platforms',
        'Reporting automation',
      ],
      ar: [
        'أتمتة مسارات العمل',
        'تحسين العمليات بالذكاء الاصطناعي',
        'جدولة المهام وإدارتها',
        'الربط والتكامل بين المنصّات',
        'أتمتة التقارير',
      ],
    },
    benefits: {
      en: [
        'Hours returned to your team every week',
        'Fewer manual errors',
        'Systems that talk to each other',
        'Reporting that writes itself',
        'Capacity to scale without new headcount',
      ],
      ar: [
        'ساعات تُعاد إلى فريقكم كل أسبوع',
        'أخطاء يدوية أقل',
        'أنظمة تتحدّث مع بعضها',
        'تقارير تكتب نفسها',
        'قدرة على التوسّع دون زيادة الكوادر',
      ],
    },
    process: {
      en: [
        'Process audit and mapping',
        'Automation opportunity design',
        'Build and integration',
        'Testing and handover',
        'Monitoring and refinement',
      ],
      ar: [
        'تدقيق العمليات ورسم خرائطها',
        'تصميم فرص الأتمتة',
        'البناء والتكامل',
        'الاختبار والتسليم',
        'المراقبة والتحسين',
      ],
    },
    technologies: {
      en: [
        'Workflow automation platforms',
        'AI and LLM tooling',
        'API integrations',
        'Task and project systems',
        'Automated reporting pipelines',
      ],
      ar: [
        'منصّات أتمتة مسارات العمل',
        'أدوات الذكاء الاصطناعي والنماذج اللغوية',
        'تكاملات واجهات البرمجة',
        'أنظمة المهام والمشاريع',
        'مسارات التقارير المؤتمتة',
      ],
    },
    category: { en: 'Automation Services', ar: 'خدمات الأتمتة' },
  },

  {
    slug: 'content-production',
    legacyId: '69147eb1a31c3aa4f67a4a16',
    icon: 'content',
    hue: 320,
    title: { en: 'Content Creation & Production', ar: 'صناعة المحتوى والإنتاج' },
    summary: {
      en: 'Creating engaging visual and written content including photography, videography, and multimedia production.',
      ar: 'ننتج محتوى بصرياً وكتابياً جاذباً يشمل التصوير الفوتوغرافي والفيديو والإنتاج متعدد الوسائط.',
    },
    overview: {
      en: 'Every brand has a story worth telling. Our studio captures it with clarity, depth, and purpose — from photography and video through to graphic design and copy that sounds like you, across a full multimedia campaign.',
      ar: 'لكل علامة تجارية قصة تستحق أن تُروى. يلتقطها الاستوديو لدينا بوضوح وعمق وهدف — من التصوير الفوتوغرافي والفيديو إلى التصميم الجرافيكي والنصوص التي تحمل صوتكم، ضمن حملة متكاملة متعددة الوسائط.',
    },
    features: {
      en: [
        'Photography',
        'Videography',
        'Graphic design',
        'Copywriting and content writing',
        'Multimedia campaigns',
      ],
      ar: [
        'التصوير الفوتوغرافي',
        'إنتاج الفيديو',
        'التصميم الجرافيكي',
        'كتابة المحتوى والنصوص الإعلانية',
        'الحملات متعددة الوسائط',
      ],
    },
    benefits: {
      en: [
        'A visual identity that holds together',
        'Content built for every channel',
        'Production handled end to end',
        'Stories audiences actually finish',
        'Assets you can reuse for months',
      ],
      ar: [
        'هوية بصرية متماسكة',
        'محتوى مصمَّم لكل قناة',
        'إنتاج مُدار من البداية إلى النهاية',
        'قصص يكملها الجمهور فعلاً',
        'مواد قابلة لإعادة الاستخدام لأشهر',
      ],
    },
    process: {
      en: [
        'Creative brief and concept',
        'Pre-production planning',
        'Shooting and production',
        'Editing and post-production',
        'Delivery and distribution',
      ],
      ar: [
        'الموجز الإبداعي وبناء الفكرة',
        'التحضير لما قبل الإنتاج',
        'التصوير والإنتاج',
        'المونتاج وما بعد الإنتاج',
        'التسليم والنشر',
      ],
    },
    technologies: {
      en: [
        'Professional camera and lighting rigs',
        'Studio audio equipment',
        'Video editing suites',
        'Design and illustration software',
        'Motion graphics tools',
      ],
      ar: [
        'كاميرات ومعدّات إضاءة احترافية',
        'معدّات صوت استوديو',
        'برامج مونتاج الفيديو',
        'برامج التصميم والرسم',
        'أدوات الموشن جرافيك',
      ],
    },
    category: { en: 'Creative Services', ar: 'الخدمات الإبداعية' },
  },

  {
    slug: 'it-software-development',
    legacyId: '69147ec4a31c3aa4f67a4a17',
    icon: 'development',
    hue: 262,
    title: { en: 'IT & Software Development', ar: 'تكنولوجيا المعلومات وتطوير البرمجيات' },
    summary: {
      en: 'Building websites, mobile apps, and digital platforms tailored to client needs.',
      ar: 'نبني المواقع الإلكترونية وتطبيقات الهاتف والمنصّات الرقمية المصمّمة وفق احتياجات العميل.',
    },
    overview: {
      en: 'We build the systems your business runs on — websites, mobile apps, and custom platforms designed around how your team actually works, with the data layer and integrations to match.',
      ar: 'نبني الأنظمة التي تُدار بها أعمالكم — مواقع إلكترونية، وتطبيقات هاتف، ومنصّات مخصّصة مصمّمة حول طريقة عمل فريقكم الفعلية، مع طبقة البيانات والتكاملات اللازمة.',
    },
    features: {
      en: [
        'Website development',
        'Mobile app development',
        'Custom software solutions',
        'Database management',
        'System integration',
      ],
      ar: [
        'تطوير المواقع الإلكترونية',
        'تطوير تطبيقات الهاتف',
        'حلول برمجية مخصّصة',
        'إدارة قواعد البيانات',
        'تكامل الأنظمة',
      ],
    },
    benefits: {
      en: [
        'Software shaped around your workflow',
        'Platforms that scale with you',
        'One connected source of truth',
        'Reliable, maintainable code',
        'Support beyond launch day',
      ],
      ar: [
        'برمجيات مصمّمة حول سير عملكم',
        'منصّات تنمو معكم',
        'مصدر واحد موثوق للبيانات',
        'شيفرة موثوقة وقابلة للصيانة',
        'دعم يمتد بعد يوم الإطلاق',
      ],
    },
    process: {
      en: [
        'Requirements and scoping',
        'Architecture and UX design',
        'Development sprints',
        'Testing and quality assurance',
        'Deployment and support',
      ],
      ar: [
        'تحديد المتطلبات والنطاق',
        'تصميم البنية وتجربة المستخدم',
        'دورات التطوير',
        'الاختبار وضمان الجودة',
        'النشر والدعم',
      ],
    },
    technologies: {
      en: [
        'Modern web frameworks',
        'Cross-platform mobile stacks',
        'Relational and document databases',
        'Cloud hosting and CI/CD',
        'REST and API integrations',
      ],
      ar: [
        'أطر عمل الويب الحديثة',
        'تقنيات تطبيقات الهاتف متعددة المنصّات',
        'قواعد البيانات العلائقية والوثائقية',
        'الاستضافة السحابية والنشر المستمر',
        'تكاملات REST وواجهات البرمجة',
      ],
    },
    category: { en: 'Technology Services', ar: 'خدمات التقنية' },
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

export const serviceSlugs = services.map((service) => service.slug);
