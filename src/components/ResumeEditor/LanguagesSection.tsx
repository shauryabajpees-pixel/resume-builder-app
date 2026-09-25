import React from 'react';
import { LanguageItem } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface LanguagesSectionProps {
  languages: LanguageItem[];
  onChange: (updated: LanguageItem[]) => void;
}

const PROFICIENCY_OPTIONS: LanguageItem['proficiency'][] = [
  'Native',
  'Fluent',
  'Professional',
  'Conversational',
  'Elementary',
];

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages, onChange }) => {
  const handleAdd = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional',
    };
    onChange([...languages, newLang]);
  };

  const handleRemove = (id: string) => {
    onChange(languages.filter((l) => l.id !== id));
  };

  const handleUpdate = (id: string, field: keyof LanguageItem, value: any) => {
    onChange(languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200">Languages</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Communication skills across diverse and international squads.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-100 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Language</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {languages.map((l) => (
          <div
            key={l.id}
            className="border border-neutral-800 bg-neutral-900/60 rounded-lg p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={l.language}
              onChange={(e) => handleUpdate(l.id, 'language', e.target.value)}
              placeholder="e.g. English, Spanish, German"
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
            />

            <select
              value={l.proficiency}
              onChange={(e) => handleUpdate(l.id, 'proficiency', e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500"
            >
              {PROFICIENCY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => handleRemove(l.id)}
              className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
