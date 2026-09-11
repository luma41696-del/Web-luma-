import type { Faq, Stat, Testimonial, Value } from './types';

/**
 * Company narrative, values, statistics, testimonials and FAQs.
 * English text is verbatim from the live LUMA API (/api/v1/about,
 * /api/v1/stats, /api/v1/testimonials, /api/v1/contact-page).
 * Arabic is a direct translation of that same source.
 */

export const about = {
  whoWeAre: {
    en: 'We are a creative agency based in Amman, Jordan, built on collaboration between key specialists in Marketing, Business Development, Automation, Content Creation, Production, and IT Development.',
    ar: 'نحن وكالة إبداعية مقرّها عمّان، الأردن، قائمة على التعاون بين مختصّين في التسويق وتطوير الأعمال والأتمتة وصناعة المحتوى والإنتاج وتطوير تكنولوجيا المعلومات.',
  },
  shortDescription: {
    en: 'We help businesses grow with clarity, creativity, and technology that works.',
    ar: 'نساعد الشركات على النمو بوضوح وإبداع وتقنية تؤدّي عملها فعلاً.',
  },
  story: {
    en: 'At LUMA, we believe every idea starts as a spark. Our role is to shape that spark into effective strategies, compelling campaigns, and meaningful brand experiences.',
    ar: 'في LUMA نؤمن أن كل فكرة تبدأ كشرارة. ودورنا أن نصوغ تلك الشرارة استراتيجياتٍ فعّالة، وحملاتٍ مؤثّرة، وتجارب علامة تجارية ذات معنى.',
  },
  mission: {
    en: 'Deliver solutions across digital marketing, smart automation, AI-driven tools, website and app development, and full studio production, building systems for the future.',
    ar: 'تقديم حلول تشمل التسويق الرقمي والأتمتة الذكية وأدوات الذكاء الاصطناعي وتطوير المواقع والتطبيقات والإنتاج الاستوديوهي الكامل، وبناء أنظمة مهيّأة للمستقبل.',
  },
  vision: {
    en: 'To support brands across industries with strategy, creativity, and technology while fostering innovation and long-term growth.',
    ar: 'دعم العلامات التجارية في مختلف القطاعات بالاستراتيجية والإبداع والتقنية، مع تعزيز الابتكار والنمو طويل الأمد.',
  },
};

export const values: Value[] = [
  {
    icon: 'collaboration',
    title: { en: 'Collaboration', ar: 'التعاون' },
    description: {
      en: 'We operate on-site to support hands-on teamwork, open communication, and shared brainstorming across specialist teams.',
      ar: 'نعمل في الموقع لدعم العمل الجماعي المباشر والتواصل المفتوح والعصف الذهني المشترك بين الفرق المتخصّصة.',
    },
  },
  {
    icon: 'innovation',
    title: { en: 'Innovation', ar: 'الابتكار' },
    description: {
      en: 'We encourage experimentation, AI-driven tools, and forward-thinking solutions to stay ahead of trends.',
      ar: 'نشجّع التجريب وأدوات الذكاء الاصطناعي والحلول الاستشرافية للبقاء في مقدّمة الاتجاهات.',
    },
  },
  {
    icon: 'learning',
    title: { en: 'Continuous Learning', ar: 'التعلّم المستمر' },
    description: {
      en: 'We support skill development through workshops, knowledge sharing, and hands-on learning.',
      ar: 'ندعم تطوير المهارات عبر ورش العمل وتبادل المعرفة والتعلّم التطبيقي.',
    },
  },
  {
    icon: 'creativity',
    title: { en: 'Creativity', ar: 'الإبداع' },
    description: {
      en: 'We craft compelling campaigns, engaging content, and meaningful brand experiences.',
      ar: 'نصنع حملات مؤثّرة ومحتوى جاذباً وتجارب علامة تجارية ذات معنى.',
    },
  },
  {
    icon: 'integrity',
    title: { en: 'Integrity', ar: 'النزاهة' },
    description: {
      en: 'We build systems and solutions that are reliable, transparent, and ethical.',
      ar: 'نبني أنظمة وحلولاً موثوقة وشفّافة وأخلاقية.',
    },
  },
];

/**
 * Figures exactly as published on the LUMA API (/api/v1/stats).
 * These are the client's own numbers and are reproduced without adjustment.
 */
export const stats: Stat[] = [
  {
    key: 'projects',
    value: 5000,
    suffix: '+',
    label: { en: 'Projects Completed', ar: 'مشروع مُنجز' },
    description: {
      en: 'Successfully delivered projects across marketing, IT, content production, and business development.',
      ar: 'مشاريع سُلّمت بنجاح في التسويق وتكنولوجيا المعلومات وإنتاج المحتوى وتطوير الأعمال.',
    },
  },
  {
    key: 'clients',
    value: 250,
    suffix: '+',
    label: { en: 'Clients Served', ar: 'عميل' },
    description: {
      en: 'Brands and businesses we have supported with strategy, creativity, and technology.',
      ar: 'علامات تجارية وشركات دعمناها بالاستراتيجية والإبداع والتقنية.',
    },
  },
  {
    key: 'experience',
    value: 7,
    suffix: '+',
    label: { en: 'Years of Experience', ar: 'سنوات خبرة' },
    description: {
      en: 'Delivering innovative solutions across marketing, technology, and production.',
      ar: 'تقديم حلول مبتكرة في التسويق والتقنية والإنتاج.',
    },
  },
  {
    key: 'team',
    value: 20,
    suffix: '+',
    label: { en: 'Team Members', ar: 'عضو فريق' },
    description: {
      en: 'Specialists in marketing, business development, automation, IT, content, and production.',
      ar: 'مختصّون في التسويق وتطوير الأعمال والأتمتة وتكنولوجيا المعلومات والمحتوى والإنتاج.',
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Ahmad Al-Saleh',
    position: { en: 'Marketing Manager', ar: 'مدير التسويق' },
    company: 'TechNova',
    rating: 5,
    project: {
      en: 'Social Media Growth Campaign',
      ar: 'حملة نمو على منصّات التواصل',
    },
    quote: {
      en: 'Luma Jo transformed our social media presence and boosted engagement dramatically. Their team is professional, creative, and highly responsive.',
      ar: 'غيّرت LUMA حضورنا على منصّات التواصل ورفعت التفاعل بشكل كبير. فريقهم محترف ومبدع وسريع الاستجابة.',
    },
  },
  {
    name: 'Dina Saleh',
    position: { en: 'Founder', ar: 'مؤسِّسة' },
    company: 'AmmanTech',
    rating: 5,
    project: { en: 'Mobile App Development', ar: 'تطوير تطبيق هاتف' },
    quote: {
      en: 'The mobile application developed by Luma Jo was delivered on time and exceeded expectations in functionality and design. Excellent technical expertise.',
      ar: 'سُلّم التطبيق الذي طوّرته LUMA في موعده وفاق التوقّعات في الوظائف والتصميم. خبرة تقنية ممتازة.',
    },
  },
  {
    name: 'Omar Hamed',
    position: { en: 'Founder', ar: 'مؤسِّس' },
    company: 'AmmanTech',
    rating: 5,
    project: { en: 'Customer Service Chatbot', ar: 'روبوت محادثة لخدمة العملاء' },
    quote: {
      en: 'Their AI chatbot implementation reduced our customer response time significantly. The team is innovative and detail-oriented.',
      ar: 'خفّض روبوت المحادثة الذي نفّذوه زمن استجابتنا للعملاء بشكل ملحوظ. فريق مبتكر ودقيق في التفاصيل.',
    },
  },
  {
    name: 'Lina Abu-Rahmeh',
    position: { en: 'Brand Manager', ar: 'مديرة العلامة التجارية' },
    company: 'FashionAmman',
    rating: 5,
    project: { en: 'Brand Photography Shoot', ar: 'جلسة تصوير للعلامة التجارية' },
    quote: {
      en: 'Luma Jo’s photography and video production brought our brand story to life. The visuals were outstanding and perfectly aligned with our identity.',
      ar: 'أعاد التصوير وإنتاج الفيديو لدى LUMA الحياة إلى قصة علامتنا. كانت الصور استثنائية ومتوائمة تماماً مع هويتنا.',
    },
  },
];

export const faqs: Faq[] = [
  {
    question: {
      en: 'What services does LUMA Agency provide?',
      ar: 'ما الخدمات التي تقدّمها وكالة LUMA؟',
    },
    answer: {
      en: 'We provide digital marketing, business development, automation & AI solutions, content creation & production, and IT & software development services.',
      ar: 'نقدّم التسويق الرقمي، وتطوير الأعمال، والأتمتة وحلول الذكاء الاصطناعي، وصناعة المحتوى والإنتاج، وتكنولوجيا المعلومات وتطوير البرمجيات.',
    },
  },
  {
    question: {
      en: 'Where is LUMA Agency located?',
      ar: 'أين يقع مقرّ وكالة LUMA؟',
    },
    answer: {
      en: 'Our office is located in Amman, Jordan.',
      ar: 'مكتبنا في عمّان، الأردن.',
    },
  },
  {
    question: {
      en: 'How can I contact LUMA Agency?',
      ar: 'كيف يمكنني التواصل مع وكالة LUMA؟',
    },
    answer: {
      en: 'You can contact us by phone at 00962793363006, WhatsApp at +962793363006, or email at info@luma-jo.com.',
      ar: 'يمكنكم التواصل عبر الهاتف 00962793363006، أو واتساب ‎+962793363006، أو البريد الإلكتروني info@luma-jo.com.',
    },
  },
  {
    question: {
      en: 'Does LUMA Agency work with international clients?',
      ar: 'هل تعمل وكالة LUMA مع عملاء دوليين؟',
    },
    answer: {
      en: 'Yes, we support brands across industries and geographies with strategy, creativity, and technology.',
      ar: 'نعم، ندعم العلامات التجارية في مختلف القطاعات والمناطق بالاستراتيجية والإبداع والتقنية.',
    },
  },
  {
    question: {
      en: 'What industries does LUMA Agency specialize in?',
      ar: 'ما القطاعات التي تتخصّص فيها وكالة LUMA؟',
    },
    answer: {
      en: 'We support brands across multiple industries including tech, retail, services, and startups.',
      ar: 'ندعم العلامات التجارية في قطاعات متعدّدة تشمل التقنية والتجزئة والخدمات والشركات الناشئة.',
    },
  },
  {
    question: {
      en: 'Can LUMA Agency handle full project execution?',
      ar: 'هل يمكن لوكالة LUMA تنفيذ المشروع بالكامل؟',
    },
    answer: {
      en: 'Yes, we provide end-to-end solutions including strategy, content creation, automation, IT development, and production.',
      ar: 'نعم، نقدّم حلولاً متكاملة تشمل الاستراتيجية وصناعة المحتوى والأتمتة وتطوير تكنولوجيا المعلومات والإنتاج.',
    },
  },
  {
    question: {
      en: 'Does LUMA Agency offer workshops or training?',
      ar: 'هل تقدّم وكالة LUMA ورش عمل أو تدريباً؟',
    },
    answer: {
      en: 'Yes, we encourage continuous learning and provide internal workshops and skill development opportunities for clients and teams.',
      ar: 'نعم، نشجّع التعلّم المستمر ونوفّر ورش عمل داخلية وفرص تطوير مهارات للعملاء والفرق.',
    },
  },
];

/** The six strengths surfaced in the "Why LUMA" section. */
export const strengths = [
  {
    key: 'strategy',
    title: { en: 'Strategy', ar: 'الاستراتيجية' },
    description: {
      en: 'Direction grounded in market research and clear commercial goals.',
      ar: 'وجهة مبنية على أبحاث السوق وأهداف تجارية واضحة.',
    },
  },
  {
    key: 'creativity',
    title: { en: 'Creativity', ar: 'الإبداع' },
    description: {
      en: 'Campaigns, content, and brand experiences crafted to be felt.',
      ar: 'حملات ومحتوى وتجارب علامة تُصنع لتُحسّ.',
    },
  },
  {
    key: 'technology',
    title: { en: 'Technology', ar: 'التقنية' },
    description: {
      en: 'Websites, apps, and platforms built to carry real business weight.',
      ar: 'مواقع وتطبيقات ومنصّات مبنية لتحمل ثقل الأعمال الحقيقي.',
    },
  },
  {
    key: 'production',
    title: { en: 'Production', ar: 'الإنتاج' },
    description: {
      en: 'A full studio — photography, video, design — under one roof.',
      ar: 'استوديو متكامل — تصوير وفيديو وتصميم — تحت سقف واحد.',
    },
  },
  {
    key: 'growth',
    title: { en: 'Growth', ar: 'النمو' },
    description: {
      en: 'Partnerships, pipeline, and revenue optimisation that compound.',
      ar: 'شراكات وخطّ عملاء وتحسين إيرادات يتراكم أثره.',
    },
  },
  {
    key: 'partnership',
    title: { en: 'Long-term Partnerships', ar: 'شراكات طويلة الأمد' },
    description: {
      en: 'We stay with you every step of the way, well past launch.',
      ar: 'نرافقكم في كل خطوة، وإلى ما بعد الإطلاق بكثير.',
    },
  },
];
