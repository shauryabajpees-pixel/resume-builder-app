import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experiences, educations, skillCategories, projects, certifications, languages, theme } = data;
  const accent = theme.accentColor || '#171717';

  const spacingClasses = {
    compact: 'space-y-3',
    normal: 'space-y-4.5',
    relaxed: 'space-y-6',
  }[theme.spacing];

  const fontSizeClasses = {
    sm: 'text-[13px] leading-relaxed',
    base: 'text-[14px] leading-relaxed',
    lg: 'text-[15px] leading-relaxed',
  }[theme.fontSize];

  return (
    <div className={`p-8 md:p-10 text-neutral-900 bg-white font-sans-doc ${fontSizeClasses}`}>
      {/* Header */}
      <header className="pb-4 mb-4 border-b border-neutral-300">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 uppercase">
          {personal.fullName || 'YOUR NAME'}
        </h1>
        {personal.headline && (
          <p className="text-sm font-semibold tracking-wide text-neutral-700 mt-0.5">
            {personal.headline}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-neutral-600 mt-2">
          {personal.location && <span>{personal.location}</span>}
          {personal.location && personal.email && <span>•</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.email && personal.phone && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.website && (
            <>
              <span>•</span>
              <span>{personal.website.replace(/^https?:\/\//, '')}</span>
            </>
          )}
          {personal.linkedin && (
            <>
              <span>•</span>
              <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
          {personal.github && (
            <>
              <span>•</span>
              <span>{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <div className={spacingClasses}>
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5 pb-0.5 border-b border-neutral-200">
              Summary
            </h2>
            <p className="text-neutral-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 pb-0.5 border-b border-neutral-200">
              Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-neutral-900">{exp.role}</span>
                      <span className="text-neutral-700 font-medium"> — {exp.company}</span>
                    </div>
                    <div className="text-xs text-neutral-600 tabular-nums">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      {exp.location && ` | ${exp.location}`}
                    </div>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1 space-y-1 text-neutral-700 list-disc list-outside pl-4 marker:text-neutral-600">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="leading-snug">
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

        {/* Skills */}
        {skillCategories.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5 pb-0.5 border-b border-neutral-200">
              Skills
            </h2>
            <div className="space-y-1 text-xs sm:text-sm">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <span className="font-bold text-neutral-900">{cat.name}: </span>
                  <span className="text-neutral-700">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 pb-0.5 border-b border-neutral-200">
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-900">{proj.title}</span>
                    {proj.techStack?.length > 0 && (
                      <span className="text-xs text-neutral-500 font-mono">
                        {proj.techStack.join(', ')}
                      </span>
                    )}
                  </div>
                  {proj.description && <p className="text-xs text-neutral-700 mt-0.5">{proj.description}</p>}
                  {proj.bullets?.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-neutral-700 list-disc list-outside pl-4">
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

        {/* Education */}
        {educations.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 pb-0.5 border-b border-neutral-200">
              Education
            </h2>
            <div className="space-y-2">
              {educations.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <span className="font-bold text-neutral-900">{edu.institution}</span>
                    <span className="text-neutral-700"> — {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</span>
                    {edu.honors && <div className="text-xs text-neutral-500 mt-0.5">{edu.honors}</div>}
                  </div>
                  <div className="text-xs text-neutral-600 tabular-nums">
                    {edu.startDate} – {edu.endDate}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1 pb-0.5 border-b border-neutral-200">
                  Certifications
                </h2>
                <div className="space-y-1 text-xs">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-semibold text-neutral-900">{c.name}</span>
                      <span className="text-neutral-600"> — {c.issuer} ({c.issueDate})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1 pb-0.5 border-b border-neutral-200">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-x-2 text-xs text-neutral-700">
                  {languages.map((l, idx) => (
                    <span key={l.id}>
                      {l.language} ({l.proficiency}){idx < languages.length - 1 ? ',' : ''}
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
