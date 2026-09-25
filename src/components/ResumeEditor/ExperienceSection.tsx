import React from 'react';
import { Experience } from '../../types/resume';
import { Plus, Trash2, Sparkles, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
  onChange: (updated: Experience[]) => void;
  onOpenAiBulletModal: (bullet: string, role: string, company: string, onSelect: (newBullet: string) => void) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  onChange,
  onOpenAiBulletModal,
}) => {
  const handleAddExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    onChange([newExp, ...experiences]);
  };

  const handleRemoveExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  const handleUpdateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleAddBullet = (expId: string) => {
    onChange(
      experiences.map((exp) =>
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
      )
    );
  };

  const handleUpdateBullet = (expId: string, index: number, value: string) => {
    onChange(
      experiences.map((exp) => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets[index] = value;
          return { ...exp, bullets: newBullets };
        }
        return exp;
      })
    );
  };

  const handleRemoveBullet = (expId: string, index: number) => {
    onChange(
      experiences.map((exp) => {
        if (exp.id === expId) {
          const newBullets = exp.bullets.filter((_, i) => i !== index);
          return { ...exp, bullets: newBullets.length ? newBullets : [''] };
        }
        return exp;
      })
    );
  };

  const handleMoveExperience = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const newExps = [...experiences];
    const temp = newExps[index];
    newExps[index] = newExps[targetIndex];
    newExps[targetIndex] = temp;
    onChange(newExps);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200">Work Experience</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Highlight your relevant career history using action verbs and quantified metrics (STAR method).
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-100 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-8 border border-dashed border-neutral-800 rounded-lg p-6">
          <p className="text-xs text-neutral-400">No positions added yet.</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="mt-2 text-xs text-neutral-200 font-medium hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add your first job
          </button>
        </div>
      )}

      <div className="space-y-4">
        {experiences.map((exp, expIdx) => (
          <div
            key={exp.id}
            className="border border-neutral-800 bg-neutral-900/60 rounded-lg p-4 space-y-3 transition-colors hover:border-neutral-700/80"
          >
            {/* Header row with move & delete */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
              <span className="text-xs font-semibold text-neutral-300">
                {exp.role || exp.company ? `${exp.role || 'Role'} · ${exp.company || 'Company'}` : `Position #${expIdx + 1}`}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={expIdx === 0}
                  onClick={() => handleMoveExperience(expIdx, 'up')}
                  title="Move Up"
                  className="p-1 text-neutral-400 hover:text-neutral-200 disabled:opacity-30 transition-colors"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={expIdx === experiences.length - 1}
                  onClick={() => handleMoveExperience(expIdx, 'down')}
                  title="Move Down"
                  className="p-1 text-neutral-400 hover:text-neutral-200 disabled:opacity-30 transition-colors"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(exp.id)}
                  title="Delete Position"
                  className="p-1 text-rose-400/80 hover:text-rose-300 hover:bg-rose-950/30 rounded transition-colors ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Job Title / Role <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Company / Organization <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                  placeholder="e.g. Stripe, Acme Corp"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                  placeholder="e.g. San Francisco, CA or Remote"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-neutral-300">Dates</label>
                  <label className="flex items-center gap-1.5 text-[11px] text-neutral-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => handleUpdateExperience(exp.id, 'current', e.target.checked)}
                      className="rounded bg-neutral-800 border-neutral-700 text-neutral-100 focus:ring-0"
                    />
                    <span>Present / Current</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2021-03"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                  <input
                    type="text"
                    disabled={exp.current}
                    value={exp.current ? 'Present' : exp.endDate}
                    onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="e.g. 2023-08"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Bullets List */}
            <div className="space-y-2 pt-2 border-t border-neutral-800/80">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-neutral-300">
                  Key Achievements & Responsibilities
                </label>
                <button
                  type="button"
                  onClick={() => handleAddBullet(exp.id)}
                  className="text-[11px] text-neutral-400 hover:text-neutral-200 inline-flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Bullet</span>
                </button>
              </div>

              <div className="space-y-2">
                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-1.5 group">
                    <span className="text-neutral-500 text-xs mt-2 select-none">•</span>
                    <div className="flex-1 relative">
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                        placeholder="e.g. Architected streaming data pipeline with Kafka, reducing end-to-end latency by 35%..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center gap-0.5 mt-1 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenAiBulletModal(bullet, exp.role, exp.company, (improved) =>
                            handleUpdateBullet(exp.id, bIdx, improved)
                          )
                        }
                        title="AI Polish (STAR & metrics)"
                        className="p-1.5 text-amber-400/90 hover:text-amber-300 hover:bg-amber-950/40 rounded transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(exp.id, bIdx)}
                        title="Remove Bullet"
                        className="p-1.5 text-neutral-500 hover:text-rose-400 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
