import React from 'react';
import { Education } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface EducationSectionProps {
  educations: Education[];
  onChange: (updated: Education[]) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  educations,
  onChange,
}) => {
  const handleAddEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: '',
    };
    onChange([...educations, newEdu]);
  };

  const handleRemoveEducation = (id: string) => {
    onChange(educations.filter((e) => e.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    onChange(
      educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200">Education</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Degrees, academic background, honors, and certifications.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddEducation}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-100 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-3.5">
        {educations.map((edu, idx) => (
          <div
            key={edu.id}
            className="border border-neutral-800 bg-neutral-900/60 rounded-lg p-3.5 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-xs font-semibold text-neutral-300">
                {edu.institution ? `${edu.institution} (${edu.degree || 'Degree'})` : `Degree #${idx + 1}`}
              </span>

              <button
                type="button"
                onClick={() => handleRemoveEducation(edu.id)}
                title="Remove Education"
                className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  School / University <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Degree <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                  placeholder="e.g. Bachelor of Science"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleUpdate(edu.id, 'fieldOfStudy', e.target.value)}
                  placeholder="e.g. Computer Science, Economics"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Dates (Start – Graduation)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => handleUpdate(edu.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2018"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                    placeholder="e.g. 2022"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => handleUpdate(edu.id, 'gpa', e.target.value)}
                  placeholder="e.g. 3.8 / 4.0"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Honors / Awards (Optional)
                </label>
                <input
                  type="text"
                  value={edu.honors || ''}
                  onChange={(e) => handleUpdate(edu.id, 'honors', e.target.value)}
                  placeholder="e.g. Summa Cum Laude, Dean's List"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
