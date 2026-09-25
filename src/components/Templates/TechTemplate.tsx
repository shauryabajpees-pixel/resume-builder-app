import React from 'react';
import { ResumeData } from '../../types/resume';
import { Terminal, ExternalLink, Github, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experiences, educations, skillCategories, projects, certifications, languages, theme } = data;
  const accent = theme.accentColor || '#0284c7';

  const fontSizeClasses = {
    sm: 'text-[12.5px] leading-relaxed',
    base: 'text-[13.5px] leading-relaxed',
    lg: 'text-[14.5px] leading-relaxed',
  }[theme.fontSize];

  return (
    <div className={`p-8 md:p-10 text-neutral-900 bg-white font-sans-doc ${fontSizeClasses}`}>
      {/* Header */}
      <header className="border-b border-neutral-200 pb-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5" style={{ color: accent }} />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-mono">
                {personal.fullName || 'developer'}
              </h1>
            </div>
            {personal.headline && (
              <p className="text-sm font-medium text-neutral-600 mt-1 font-mono">
                &gt; {personal.headline}
              </p>
            )}
          </div>

          <div className="text-xs text-neutral-600 space-y-1 sm:text-right font-mono">
            {personal.email && (
              <div className="flex sm:justify-end items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex sm:justify-end items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex sm:justify-end items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personal.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Links row */}
        {(personal.github || personal.linkedin || personal.website) && (
          <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-neutral-100 text-xs font-mono text-neutral-600">
            {personal.github && (
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5" />
                <span>{personal.github.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
            {personal.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span>{personal.website.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </span>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="space-y-5">
        {/* Technical Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-500 mb-1.5">
              // Technical Summary
            </h2>
            <p className="text-neutral-700 leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Technical Skills Matrix */}
        {skillCategories.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-500 mb-2">
              // Technical Skills Matrix
            </h2>
            <div className="bg-neutral-50 border border-neutral-200 rounded-md p-3 space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="text-xs">
                  <span className="font-mono font-bold text-neutral-800">{cat.name}: </span>
                  <span className="text-neutral-700 font-mono text-[11.5px]">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-500 mb-3">
              // Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3.5" style={{ borderColor: accent }}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-neutral-900 font-mono">{exp.role}</span>
                      <span className="text-neutral-600 font-medium"> @ {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500 tabular-nums">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1.5 space-y-1 text-neutral-700 list-disc list-outside pl-4 marker:text-neutral-400">
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

        {/* Key Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-500 mb-3">
              // Open Source & Featured Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border border-neutral-200 rounded p-3 bg-white space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-900 font-mono text-xs">{proj.title}</span>
                    {proj.link && (
                      <span className="text-[11px] text-neutral-500 underline font-mono">
                        link
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-xs text-neutral-600">{proj.description}</p>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="text-[10.5px] font-mono text-neutral-500 pt-1">
                      stack: {proj.techStack.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {educations.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-500 mb-2">
                // Education
              </h2>
              <div className="space-y-2 text-xs">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-neutral-900">{edu.degree}</div>
                    <div className="text-neutral-700">{edu.institution}</div>
                    <div className="text-neutral-500 font-mono text-[11px] tabular-nums">
                      {edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-500 mb-2">
                // Certifications
              </h2>
              <div className="space-y-1.5 text-xs">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <span className="font-medium text-neutral-900">{c.name}</span>
                    <div className="text-neutral-500 font-mono text-[11px]">{c.issuer} ({c.issueDate})</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
