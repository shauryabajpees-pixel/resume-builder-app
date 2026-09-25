export type TemplateType = 'modern' | 'executive' | 'compact' | 'tech' | 'minimalist';
export type FontFamilyType = 'sans' | 'serif' | 'mono' | 'display';
export type SpacingType = 'compact' | 'normal' | 'relaxed';
export type FontSizeType = 'sm' | 'base' | 'lg';
export type PaperSizeType = 'letter' | 'a4';

export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  link?: string;
  github?: string;
  techStack: string[];
  bullets: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Elementary';
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomItem[];
}

export type SectionType =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'custom';

export interface ResumeTheme {
  template: TemplateType;
  accentColor: string;
  fontFamily: FontFamilyType;
  spacing: SpacingType;
  fontSize: FontSizeType;
  paperSize: PaperSizeType;
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  personal: PersonalInfo;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skillCategories: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  languages: LanguageItem[];
  customSections: CustomSection[];
  sectionOrder: SectionType[];
  theme: ResumeTheme;
}

export interface AtsCheckResult {
  score: number;
  matchPercentage: number;
  wordCount: number;
  readingTimeMinutes: number;
  strengths: string[];
  improvements: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  summaryFeedback: string;
}
