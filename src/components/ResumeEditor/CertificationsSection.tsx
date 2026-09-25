import React from 'react';
import { Certification } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsSectionProps {
  certifications: Certification[];
  onChange: (updated: Certification[]) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  onChange,
}) => {
  const handleAdd = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      url: '',
    };
    onChange([...certifications, newCert]);
  };

  const handleRemove = (id: string) => {
    onChange(certifications.filter((c) => c.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Certification, value: string) => {
    onChange(certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200">Certifications & Licenses</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Industry accreditations (AWS, GCP, CKA, PMP, Scrum Master).
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-100 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="space-y-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border border-neutral-800 bg-neutral-900/60 rounded-lg p-3 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300">
                {cert.name || 'Certification'}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(cert.id)}
                className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-0.5">Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                  placeholder="e.g. AWS Solutions Architect"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-0.5">Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleUpdate(cert.id, 'issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-0.5">Issue Date</label>
                <input
                  type="text"
                  value={cert.issueDate}
                  onChange={(e) => handleUpdate(cert.id, 'issueDate', e.target.value)}
                  placeholder="e.g. 2023-04"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
