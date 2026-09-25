import React from 'react';
import { ResumeTheme, TemplateType, FontFamilyType, SpacingType, FontSizeType, PaperSizeType } from '../../types/resume';
import { Palette, Type, Sliders, FileText } from 'lucide-react';

interface StylingSectionProps {
  theme: ResumeTheme;
  onChange: (updated: ResumeTheme) => void;
}

const COLOR_PALETTE = [
  { name: 'Slate', color: '#1e293b' },
  { name: 'Navy', color: '#1e3a8a' },
  { name: 'Teal', color: '#0f766e' },
  { name: 'Emerald', color: '#065f46' },
  { name: 'Crimson', color: '#991b1b' },
  { name: 'Royal Blue', color: '#2563eb' },
  { name: 'Purple', color: '#6b21a8' },
  { name: 'Charcoal', color: '#171717' },
  { name: 'Bronze', color: '#b45309' },
];

const TEMPLATES: { id: TemplateType; title: string; subtitle: string }[] = [
  { id: 'modern', title: 'Modern Minimal', subtitle: 'Clean accent divider with balanced rhythm' },
  { id: 'executive', title: 'Executive Serif', subtitle: 'Editorial serif header for leadership' },
  { id: 'compact', title: 'Compact 2-Column', subtitle: 'High-density layout with left sidebar' },
  { id: 'tech', title: 'Engineering & Tech', subtitle: 'Skill matrix and project repo highlights' },
  { id: 'minimalist', title: 'ATS Standard', subtitle: 'Zero distraction, maximum parsing score' },
];

export const StylingSection: React.FC<StylingSectionProps> = ({ theme, onChange }) => {
  const update = (patch: Partial<ResumeTheme>) => {
    onChange({ ...theme, ...patch });
  };

  return (
    <div className="space-y-6">
      {/* Template Chooser */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-neutral-400" />
          <h3 className="text-sm font-semibold text-neutral-200">Resume Template</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => update({ template: tmpl.id })}
              className={`p-3 rounded-lg border text-left transition-all ${
                theme.template === tmpl.id
                  ? 'border-neutral-200 bg-neutral-800 text-white shadow-sm'
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              <div className="text-xs font-semibold text-neutral-100">{tmpl.title}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">{tmpl.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-neutral-400" />
          <h3 className="text-sm font-semibold text-neutral-200">Accent Color</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {COLOR_PALETTE.map((item) => (
            <button
              key={item.color}
              type="button"
              onClick={() => update({ accentColor: item.color })}
              title={item.name}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                theme.accentColor === item.color
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-950 scale-110'
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: item.color }}
            />
          ))}

          {/* Custom color input */}
          <div className="flex items-center gap-1.5 ml-2 border border-neutral-800 bg-neutral-900 rounded-md px-2 py-1">
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => update({ accentColor: e.target.value })}
              className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
            />
            <span className="text-[11px] font-mono text-neutral-400">{theme.accentColor}</span>
          </div>
        </div>
      </div>

      {/* Typography & Spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Font Family */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Type className="w-4 h-4 text-neutral-400" />
            <h3 className="text-sm font-semibold text-neutral-200">Font Family</h3>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'sans', label: 'Jakarta Sans' },
              { id: 'serif', label: 'Source Serif' },
              { id: 'mono', label: 'JetBrains Mono' },
              { id: 'display', label: 'Cabinet Grotesk' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => update({ fontFamily: f.id as FontFamilyType })}
                className={`py-1.5 px-2 text-xs rounded border transition-colors ${
                  theme.fontFamily === f.id
                    ? 'border-neutral-200 bg-neutral-800 text-white font-medium'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spacing / Density */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-4 h-4 text-neutral-400" />
            <h3 className="text-sm font-semibold text-neutral-200">Spacing Density</h3>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'compact', label: 'Compact' },
              { id: 'normal', label: 'Normal' },
              { id: 'relaxed', label: 'Relaxed' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => update({ spacing: s.id as SpacingType })}
                className={`py-1.5 px-2 text-xs rounded border transition-colors ${
                  theme.spacing === s.id
                    ? 'border-neutral-200 bg-neutral-800 text-white font-medium'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Scale */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">Font Size Scale</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'sm', label: 'Small (13px)' },
              { id: 'base', label: 'Regular (14px)' },
              { id: 'lg', label: 'Large (15px)' },
            ].map((fs) => (
              <button
                key={fs.id}
                type="button"
                onClick={() => update({ fontSize: fs.id as FontSizeType })}
                className={`py-1 px-1.5 text-xs rounded border transition-colors ${
                  theme.fontSize === fs.id
                    ? 'border-neutral-200 bg-neutral-800 text-white font-medium'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {fs.label}
              </button>
            ))}
          </div>
        </div>

        {/* Paper Size */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">Page Standard</label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'letter', label: 'US Letter (8.5 × 11")' },
              { id: 'a4', label: 'A4 (210 × 297 mm)' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => update({ paperSize: p.id as PaperSizeType })}
                className={`py-1 px-1.5 text-xs rounded border transition-colors ${
                  theme.paperSize === p.id
                    ? 'border-neutral-200 bg-neutral-800 text-white font-medium'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
