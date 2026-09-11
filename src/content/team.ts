import type { TeamMember } from './types';

/**
 * The LUMA team, as published on the live API (/api/v1/team).
 * Names and role titles are reproduced exactly; portraits were downloaded
 * from the same source and re-encoded as square WebP by
 * `npm run optimize:images`.
 */
export const team: TeamMember[] = [
  {
    name: 'Mohammad Aljaouni',
    role: { en: 'Founder & CEO', ar: 'المؤسِّس والرئيس التنفيذي' },
    image: 'mohammad-aljaouni',
  },
  {
    name: "Baha'a Jaber",
    role: { en: 'Founder & CFO', ar: 'المؤسِّس والمدير المالي' },
    image: 'baha-a-jaber',
  },
  {
    name: 'Mohammad Bizo',
    role: { en: 'Accountant & HR Manager', ar: 'محاسب ومدير الموارد البشرية' },
    image: 'mohammad-bizo',
  },
  {
    name: 'Gazy Amjed Al-khalili',
    role: { en: 'Team Leader', ar: 'قائد فريق' },
    image: 'gazy-amjed-al-khalili',
  },
  {
    name: 'Hamza Alhadidi',
    role: { en: 'Head of Design Department', ar: 'رئيس قسم التصميم' },
    image: 'hamza-alhadidi',
  },
  {
    name: 'Ahmad Khattab',
    role: {
      en: 'AI & Data Science — Prompt Engineer',
      ar: 'الذكاء الاصطناعي وعلم البيانات — مهندس أوامر',
    },
    image: 'ahmad-khattab',
  },
  {
    name: 'Nezar Ismail',
    role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
    image: 'nezar-ismail',
  },
  {
    name: 'Rand Medhat Awawdeh',
    role: {
      en: 'UI/UX Specialist & Graphic Designer',
      ar: 'أخصائية تجربة وواجهة المستخدم ومصمّمة جرافيك',
    },
    image: 'rand-medhat-awawdeh',
  },
  {
    name: 'Omar Al-Saheb',
    role: {
      en: 'Graphic Designer & Developer',
      ar: 'مصمّم جرافيك ومطوّر ومبرمج',
    },
    image: 'omar-alsaheb',
  },
  {
    name: 'Hashem Hadidi',
    role: {
      en: 'WordPress Developer & Designer',
      ar: 'مطوّر ومصمّم ووردبريس',
    },
    image: 'hashem-hadidi',
  },
  {
    name: 'Lana Maraqa',
    role: { en: 'WordPress Developer', ar: 'مطوّرة ووردبريس' },
    image: 'lana-maraqa',
  },
  {
    name: 'Aya Nusairat',
    role: { en: 'Cybersecurity', ar: 'الأمن السيبراني' },
    image: 'aya-nusairat',
  },
  {
    name: 'Yasmeen Mahmoud Samih Alshorman',
    role: { en: 'Account Management', ar: 'إدارة الحسابات' },
    image: 'yasmeen-mahmoud-samih-alshorman',
  },
  {
    name: 'Anas Marouf',
    role: { en: 'Sales Executive', ar: 'تنفيذي مبيعات' },
    image: 'anas-marouf',
  },
];

export const teamSrc = {
  small: (image: string) => `/images/team/${image}-320.webp`,
  large: (image: string) => `/images/team/${image}-640.webp`,
};
