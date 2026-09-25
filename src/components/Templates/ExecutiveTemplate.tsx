import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experiences, educations, skillCategories, projects, certifications, languages, theme } = data;
  const accent = theme.accentColor || '#0f766e';

  const spacingClasses = {
    compact: 'space-y-3.5',
    normal: 'space-y-4.5',
    relaxed: 'space-y-6',
  }[theme.spacing];

  const fontSizeClasses = {
    sm: 'text-[13px] leading-relaxed',
    base: 'text-[14px] leading-relaxed',
    lg: 'text-[15px] leading-relaxed',
  }[theme.fontSize];

  return (
    <div className={`p-8 md:p-10 text-neutral-900 bg-white font-serif-doc ${fontSizeClasses}`}>
      {/* Centered Header */}
      <header className="text-center border-b border-neutral-300 pb-4 mb-4">
        <h1 className="text-3xl sm:text-4xl font-normal tracking-wide text-neutral-950 uppercase mb-1">
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.headline && (
          <p className="text-sm font-sans tracking-widest uppercase mb-2 font-medium" style={{ color: accent }}>
            {personal.headline}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-sans text-neutral-600">
          {personal.location && <span>{personal.location}</span>}
          {personal.location && personal.email && <span className="text-neutral-400">·</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.email && personal.phone && <span className="text-neutral-400">·</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.website && (
            <>
              <span className="text-neutral-400">·</span>
              <span>{personal.website.replace(/^https?:\/\//, '')}</span>
            </>
          )}
          {personal.linkedin && (
            <>
              <span className="text-neutral-400">·</span>
              <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className={spacingClasses}>
        {/* Executive Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-1 mb-2">
              Executive Profile
            </h2>
            <p className="text-neutral-800 leading-relaxed text-justify italic">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-1 mb-3">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="font-bold text-neutral-950 text-base">{exp.role}</span>
                      <span className="text-neutral-800 italic">, {exp.company}</span>
                    </div>
                    <div className="text-xs font-sans text-neutral-500 tabular-nums">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      {exp.location && ` | ${exp.location}`}
                    </div>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1.5 space-y-1 text-neutral-800 list-disc list-outside pl-4 marker:text-neutral-500">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-snug">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Core Competencies */}
        {skillCategories.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-1 mb-2">
              Core Competencies & Expertise
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-neutral-800">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <span className="font-semibold text-neutral-900">{cat.name}: </span>
                  <span className="text-neutral-700 font-sans">{cat.skills.join(' • ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-1 mb-2.5">
              Education & Academic Credentials
            </h2>
            <div className="space-y-2">
              {educations.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-neutral-950">{edu.institution}</span>
                    <span className="text-neutral-800 italic"> — {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</span>
                    {edu.honors && <div className="text-xs text-neutral-600 mt-0.5">{edu.honors}</div>}
                  </div>
                  <div className="text-xs font-sans text-neutral-500 tabular-nums">
                    {edu.startDate} – {edu.endDate}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-1 mb-2.5">
              Strategic Initiatives & Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-900">{proj.title}</span>
                    {proj.techStack?.length > 0 && (
                      <span className="text-xs font-sans text-neutral-500">
                        {proj.techStack.join(' · ')}
                      </span>
                    )}
                  </div>
                  {proj.description && <p className="text-xs text-neutral-700 italic mt-0.5">{proj.description}</p>}
                  {proj.bullets?.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-neutral-800 list-disc list-outside pl-4 marker:text-neutral-500">
                      {proj.bullets.map((b, idx) => (
                        <li key={idx} className="text-xs leading-snug">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-1 mb-1.5">
                  Certifications
                </h2>
                <div className="space-y-1 text-xs text-neutral-800">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-neutral-500 font-sans">, {c.issuer} ({c.issueDate})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-1 mb-1.5">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-sans text-neutral-800">
                  {languages.map((l) => (
                    <span key={l.id}>
                      <span className="font-medium">{l.language}</span>{' '}
                      <span className="text-neutral-500">({l.proficiency})</span>
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
