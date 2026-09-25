import React from 'react';
import { ResumeData } from '../../types/resume';
import { Globe, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experiences, educations, skillCategories, projects, certifications, languages, theme } = data;
  const accent = theme.accentColor || '#1e293b';

  const spacingClasses = {
    compact: 'space-y-3.5',
    normal: 'space-y-5',
    relaxed: 'space-y-6',
  }[theme.spacing];

  const fontSizeClasses = {
    sm: 'text-[13px] leading-relaxed',
    base: 'text-[14px] leading-relaxed',
    lg: 'text-[15px] leading-relaxed',
  }[theme.fontSize];

  return (
    <div className={`p-8 md:p-10 text-neutral-900 bg-white ${fontSizeClasses}`}>
      {/* Header */}
      <header className="border-b-2 pb-5 mb-5" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-1">
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.headline && (
          <p className="text-base font-semibold tracking-wide mb-3" style={{ color: accent }}>
            {personal.headline}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-600">
          {personal.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.email}</span>
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.website && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.website.replace(/^https?:\/\//, '')}</span>
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </span>
          )}
          {personal.github && (
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </span>
          )}
        </div>
      </header>

      {/* Main Body */}
      <div className={spacingClasses}>
        {/* Professional Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
              Professional Summary
            </h2>
            <p className="text-neutral-700 leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="font-bold text-neutral-900">{exp.role}</span>
                      <span className="text-neutral-600 font-medium"> · {exp.company}</span>
                    </div>
                    <div className="text-xs font-medium text-neutral-500 tabular-nums">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      {exp.location && ` · ${exp.location}`}
                    </div>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-neutral-700 list-disc list-outside pl-4 marker:text-neutral-400">
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

        {/* Skills */}
        {skillCategories.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: accent }}>
              Core Skills & Technologies
            </h2>
            <div className="space-y-1.5 text-neutral-700">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="text-xs sm:text-sm">
                  <span className="font-semibold text-neutral-900">{cat.name}: </span>
                  <span className="text-neutral-700">{cat.skills.join(' · ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-neutral-900">
                      {proj.title}
                      {proj.link && (
                        <span className="text-xs font-normal text-neutral-500 ml-1.5 underline">
                          ({proj.link.replace(/^https?:\/\//, '')})
                        </span>
                      )}
                    </span>
                    {proj.techStack && proj.techStack.length > 0 && (
                      <span className="text-xs text-neutral-500 font-mono">
                        {proj.techStack.join(' · ')}
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-xs sm:text-sm text-neutral-700 mt-0.5">{proj.description}</p>
                  )}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="mt-1.5 space-y-1 text-neutral-700 list-disc list-outside pl-4 marker:text-neutral-400">
                      {proj.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-snug text-xs sm:text-sm">
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

        {/* Education */}
        {educations.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>
              Education
            </h2>
            <div className="space-y-2.5">
              {educations.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-neutral-900">{edu.institution}</span>
                    <span className="text-neutral-700"> — {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</span>
                    {edu.honors && <div className="text-xs text-neutral-600 italic mt-0.5">{edu.honors}</div>}
                  </div>
                  <div className="text-xs font-medium text-neutral-500 tabular-nums text-right">
                    {edu.startDate} – {edu.endDate}
                    {edu.gpa && <div className="text-neutral-600 font-semibold">GPA: {edu.gpa}</div>}
                  </div>
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
                <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
                  Certifications
                </h2>
                <div className="space-y-1.5 text-xs text-neutral-700">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-semibold text-neutral-900">{c.name}</span>
                      <span className="text-neutral-500"> · {c.issuer} ({c.issueDate})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
                  Languages
                </h2>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-700">
                  {languages.map((l) => (
                    <span key={l.id}>
                      <span className="font-medium text-neutral-900">{l.language}</span>{' '}
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
