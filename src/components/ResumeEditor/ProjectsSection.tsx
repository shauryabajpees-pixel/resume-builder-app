import React from 'react';
import { Project } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onChange: (updated: Project[]) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onChange }) => {
  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      link: '',
      github: '',
      techStack: [],
      bullets: [''],
    };
    onChange([...projects, newProj]);
  };

  const handleRemoveProject = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Project, value: any) => {
    onChange(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleAddBullet = (id: string) => {
    onChange(
      projects.map((p) => (p.id === id ? { ...p, bullets: [...p.bullets, ''] } : p))
    );
  };

  const handleUpdateBullet = (id: string, index: number, value: string) => {
    onChange(
      projects.map((p) => {
        if (p.id === id) {
          const newB = [...p.bullets];
          newB[index] = value;
          return { ...p, bullets: newB };
        }
        return p;
      })
    );
  };

  const handleRemoveBullet = (id: string, index: number) => {
    onChange(
      projects.map((p) => {
        if (p.id === id) {
          return { ...p, bullets: p.bullets.filter((_, i) => i !== index) };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200">Key Projects & Open Source</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Demonstrate real-world application, technical breadth, and initiative.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-100 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-3.5">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="border border-neutral-800 bg-neutral-900/60 rounded-lg p-3.5 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-xs font-semibold text-neutral-300">
                {proj.title || `Project #${idx + 1}`}
              </span>

              <button
                type="button"
                onClick={() => handleRemoveProject(proj.id)}
                title="Remove Project"
                className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Project Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => handleUpdate(proj.id, 'title', e.target.value)}
                  placeholder="e.g. Distributed Task Queue"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  value={proj.techStack?.join(', ') || ''}
                  onChange={(e) =>
                    handleUpdate(
                      proj.id,
                      'techStack',
                      e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  placeholder="e.g. Go, Redis, Docker, gRPC"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Live URL / Demo Link
                </label>
                <input
                  type="text"
                  value={proj.link || ''}
                  onChange={(e) => handleUpdate(proj.id, 'link', e.target.value)}
                  placeholder="https://myproject.com"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  GitHub Repository
                </label>
                <input
                  type="text"
                  value={proj.github || ''}
                  onChange={(e) => handleUpdate(proj.id, 'github', e.target.value)}
                  placeholder="github.com/user/repo"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Brief Overview
                </label>
                <input
                  type="text"
                  value={proj.description || ''}
                  onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
                  placeholder="e.g. Open-source high-throughput queue with consensus clustering."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>
            </div>

            {/* Bullets */}
            <div className="space-y-2 pt-1 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-neutral-300">
                  Key Features / Metric Impact
                </label>
                <button
                  type="button"
                  onClick={() => handleAddBullet(proj.id)}
                  className="text-[11px] text-neutral-400 hover:text-neutral-200 inline-flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Highlight</span>
                </button>
              </div>

              <div className="space-y-1.5">
                {proj.bullets?.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-1.5">
                    <span className="text-neutral-500 text-xs">•</span>
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => handleUpdateBullet(proj.id, bIdx, e.target.value)}
                      placeholder="e.g. Reached 1,200+ stars on GitHub and deployed by 4 enterprise teams."
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(proj.id, bIdx)}
                      className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
