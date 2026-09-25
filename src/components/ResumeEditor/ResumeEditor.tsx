import React, { useState } from 'react';
import { ResumeData, SectionType } from '../../types/resume';
import { PersonalSection } from './PersonalSection';
import { SummarySection } from './SummarySection';
import { ExperienceSection } from './ExperienceSection';
import { SkillsSection } from './SkillsSection';
import { EducationSection } from './EducationSection';
import { ProjectsSection } from './ProjectsSection';
import { CertificationsSection } from './CertificationsSection';
import { LanguagesSection } from './LanguagesSection';
import { StylingSection } from './StylingSection';
import {
  User,
  FileText,
  Briefcase,
  Wrench,
  GraduationCap,
  FolderGit2,
  Award,
  Globe2,
  Palette,
  CheckCircle2,
} from 'lucide-react';

interface ResumeEditorProps {
  resume: ResumeData;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onChange: (updated: ResumeData) => void;
  onOpenAiBulletModal: (bullet: string, role: string, company: string, onSelect: (newB: string) => void) => void;
  onOpenAiSummaryModal: () => void;
}

interface SectionTab {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resume,
  activeSection,
  setActiveSection,
  onChange,
  onOpenAiBulletModal,
  onOpenAiSummaryModal,
}) => {
  const tabs: SectionTab[] = [
    { id: 'personal', label: 'Contact', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase, badge: resume.experiences.length },
    { id: 'skills', label: 'Skills', icon: Wrench, badge: resume.skillCategories.reduce((acc, c) => acc + c.skills.length, 0) },
    { id: 'education', label: 'Education', icon: GraduationCap, badge: resume.educations.length },
    { id: 'projects', label: 'Projects', icon: FolderGit2, badge: resume.projects.length },
    { id: 'certifications', label: 'Certs', icon: Award, badge: resume.certifications.length },
    { id: 'languages', label: 'Languages', icon: Globe2, badge: resume.languages.length },
    { id: 'styling', label: 'Design', icon: Palette },
  ];

  return (
    <div className="w-full lg:w-[480px] xl:w-[540px] flex flex-col h-full bg-neutral-900 border-r border-neutral-800 shrink-0 overflow-hidden">
      {/* Horizontal Scrollable Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto p-2 border-b border-neutral-800 bg-neutral-950/40 no-scrollbar shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/80'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && tab.badge > 0 && (
                <span className="text-[10px] font-mono text-neutral-400 ml-0.5 tabular-nums">
                  ({tab.badge})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {activeSection === 'personal' && (
          <PersonalSection
            data={resume.personal}
            onChange={(updated) => onChange({ ...resume, personal: updated })}
          />
        )}

        {activeSection === 'summary' && (
          <SummarySection
            summary={resume.summary}
            roleHeadline={resume.personal.headline}
            onChange={(updated) => onChange({ ...resume, summary: updated })}
            onOpenAiSummaryModal={onOpenAiSummaryModal}
          />
        )}

        {activeSection === 'experience' && (
          <ExperienceSection
            experiences={resume.experiences}
            onChange={(updated) => onChange({ ...resume, experiences: updated })}
            onOpenAiBulletModal={onOpenAiBulletModal}
          />
        )}

        {activeSection === 'skills' && (
          <SkillsSection
            categories={resume.skillCategories}
            roleHeadline={resume.personal.headline}
            onChange={(updated) => onChange({ ...resume, skillCategories: updated })}
          />
        )}

        {activeSection === 'education' && (
          <EducationSection
            educations={resume.educations}
            onChange={(updated) => onChange({ ...resume, educations: updated })}
          />
        )}

        {activeSection === 'projects' && (
          <ProjectsSection
            projects={resume.projects}
            onChange={(updated) => onChange({ ...resume, projects: updated })}
          />
        )}

        {activeSection === 'certifications' && (
          <CertificationsSection
            certifications={resume.certifications}
            onChange={(updated) => onChange({ ...resume, certifications: updated })}
          />
        )}

        {activeSection === 'languages' && (
          <LanguagesSection
            languages={resume.languages}
            onChange={(updated) => onChange({ ...resume, languages: updated })}
          />
        )}

        {activeSection === 'styling' && (
          <StylingSection
            theme={resume.theme}
            onChange={(updated) => onChange({ ...resume, theme: updated })}
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="h-10 border-t border-neutral-800 bg-neutral-950/60 px-4 flex items-center justify-between text-[11px] text-neutral-500 shrink-0">
        <div className="flex items-center gap-1.5 text-emerald-400/80">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Auto-saved to local browser</span>
        </div>
        <div className="text-neutral-500 font-mono">
          {resume.personal.fullName || 'Untitled'}
        </div>
      </div>
    </div>
  );
};
