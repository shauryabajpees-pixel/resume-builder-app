import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CompactTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experiences, educations, skillCategories, projects, certifications, languages, theme } = data;
  const accent = theme.accentColor || '#1e293b';

  const fontSizeClasses = {
    sm: 'text-[12.5px] leading-relaxed',
    base: 'text-[13.5px] leading-relaxed',
    lg: 'text-[14.5px] leading-relaxed',
  }[theme.fontSize];

  return (
    <div className={`bg-white text-neutral-900 grid grid-cols-12 min-h-full ${fontSizeClasses}`}>
      {/* Left Sidebar Column (35% on md) */}
      <aside className="col-span-12 sm:col-span-4 bg-neutral-50/70 p-6 md:p-7 border-r border-neutral-200 space-y-5">
        {/* Name in Sidebar */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 leading-tight">
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.headline && (
            <p className="text-xs font-semibold mt-1" style={{ color: accent }}>
              {personal.headline}
            </p>
          )}
        </div>

        {/* Contact details */}
        <div className="space-y-2 text-xs text-neutral-600">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Contact</h2>
          {personal.email && (
            <div className="flex items-center gap-2 break-all">
              <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-2 break-all">
              <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center gap-2 break-all">
              <Linkedin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {personal.github && (
            <div className="flex items-center gap-2 break-all">
              <Github className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skillCategories.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Skills</h2>
            {skillCategories.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <span className="text-xs font-semibold text-neutral-900 block">{cat.name}</span>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((s, idx) => (
                    <span key={idx} className="text-[11px] bg-white border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education in Sidebar */}
        {educations.length > 0 && (
          <div className="space-y-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Education</h2>
            {educations.map((edu) => (
              <div key={edu.id} className="text-xs space-y-0.5">
                <div className="font-bold text-neutral-900">{edu.degree}</div>
                <div className="text-neutral-700">{edu.fieldOfStudy}</div>
                <div className="text-neutral-500 font-medium">{edu.institution}</div>
                <div className="text-[11px] text-neutral-400 tabular-nums">
                  {edu.startDate} – {edu.endDate}
                </div>
                {edu.gpa && <div className="text-[11px] text-neutral-600">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Languages in Sidebar */}
        {languages.length > 0 && (
          <div className="space-y-1.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Languages</h2>
            <div className="space-y-1 text-xs text-neutral-700">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span className="font-medium text-neutral-900">{l.language}</span>
                  <span className="text-neutral-500">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Content Column (65% on md) */}
      <main className="col-span-12 sm:col-span-8 p-6 md:p-8 space-y-5">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: accent }}>
              Profile Overview
            </h2>
            <p className="text-neutral-700 leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: accent }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-neutral-900">{exp.role}</span>
                      <span className="text-neutral-600"> · {exp.company}</span>
                    </div>
                    <span className="text-xs text-neutral-500 tabular-nums">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
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

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: accent }}>
              Key Projects
            </h2>
            <div className="space-y-3">
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
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-neutral-700 list-disc list-outside pl-4 marker:text-neutral-400">
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
              Certifications & Credentials
            </h2>
            <div className="space-y-1 text-xs text-neutral-700">
              {certifications.map((c) => (
                <div key={c.id}>
                  <span className="font-semibold text-neutral-900">{c.name}</span>
                  <span className="text-neutral-500"> — {c.issuer} ({c.issueDate})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
