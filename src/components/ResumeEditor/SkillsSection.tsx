import React, { useState } from 'react';
import { SkillCategory } from '../../types/resume';
import { Plus, Trash2, Sparkles, X, RefreshCw } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
  roleHeadline: string;
  onChange: (updated: SkillCategory[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  categories,
  roleHeadline,
  onChange,
}) => {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: 'New Skills Category',
      skills: [],
    };
    onChange([...categories, newCat]);
  };

  const handleRemoveCategory = (catId: string) => {
    onChange(categories.filter((c) => c.id !== catId));
  };

  const handleUpdateCategoryName = (catId: string, name: string) => {
    onChange(categories.map((c) => (c.id === catId ? { ...c, name } : c)));
  };

  const handleAddSkill = (catId: string, skillText: string) => {
    const trimmed = skillText.trim();
    if (!trimmed) return;

    onChange(
      categories.map((c) => {
        if (c.id === catId && !c.skills.includes(trimmed)) {
          return { ...c, skills: [...c.skills, trimmed] };
        }
        return c;
      })
    );
    setNewSkillInputs((prev) => ({ ...prev, [catId]: '' }));
  };

  const handleRemoveSkill = (catId: string, skillToRemove: string) => {
    onChange(
      categories.map((c) => {
        if (c.id === catId) {
          return { ...c, skills: c.skills.filter((s) => s !== skillToRemove) };
        }
        return c;
      })
    );
  };

  const handleSuggestSkills = async () => {
    setIsSuggesting(true);
    try {
      const res = await fetch('/api/ai/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: roleHeadline || 'Software Engineer' }),
      });
      const data = await res.json();
      if (data.categories && data.categories.length > 0) {
        const formatted: SkillCategory[] = data.categories.map((cat: any, i: number) => ({
          id: `cat-ai-${Date.now()}-${i}`,
          name: cat.name,
          skills: cat.skills || [],
        }));
        onChange(formatted);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200">Skills & Competencies</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Group skills into distinct categories for maximum ATS indexability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSuggesting}
            onClick={handleSuggestSkills}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/40 rounded transition-colors disabled:opacity-50"
          >
            {isSuggesting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>AI Suggest for Role</span>
          </button>

          <button
            type="button"
            onClick={handleAddCategory}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-100 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Group</span>
          </button>
        </div>
      </div>

      <div className="space-y-3.5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border border-neutral-800 bg-neutral-900/60 rounded-lg p-3.5 space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={cat.name}
                onChange={(e) => handleUpdateCategoryName(cat.id, e.target.value)}
                placeholder="Category Name (e.g. Languages & Frameworks)"
                className="bg-transparent border-b border-neutral-700 text-xs font-semibold text-neutral-200 px-1 py-0.5 focus:outline-none focus:border-neutral-400 transition-colors w-64"
              />

              <button
                type="button"
                onClick={() => handleRemoveCategory(cat.id)}
                title="Remove Category"
                className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Existing Skills as Tags */}
            <div className="flex flex-wrap gap-1.5 min-h-[28px] items-center">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1 text-xs bg-neutral-800 text-neutral-200 border border-neutral-700/80 px-2 py-0.5 rounded"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(cat.id, skill)}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Add Skill Input */}
              <div className="inline-flex items-center">
                <input
                  type="text"
                  value={newSkillInputs[cat.id] || ''}
                  onChange={(e) =>
                    setNewSkillInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      handleAddSkill(cat.id, newSkillInputs[cat.id] || '');
                    }
                  }}
                  placeholder="+ Add skill (press Enter)"
                  className="bg-neutral-900 border border-neutral-800 rounded px-2 py-0.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 w-36"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
