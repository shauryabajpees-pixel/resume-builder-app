import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, Check } from 'lucide-react';

interface AiSummaryModalProps {
  isOpen: boolean;
  roleHeadline: string;
  skills: string[];
  currentSummary: string;
  onClose: () => void;
  onSelect: (summaryText: string) => void;
}

export const AiSummaryModal: React.FC<AiSummaryModalProps> = ({
  isOpen,
  roleHeadline,
  skills,
  currentSummary,
  onClose,
  onSelect,
}) => {
  const [role, setRole] = useState(roleHeadline || 'Senior Software Engineer');
  const [years, setYears] = useState('6+ years');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ title: string; text: string }[]>([]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          experienceYears: years,
          keySkills: skills.slice(0, 8),
          currentSummary,
        }),
      });
      const data = await res.json();
      setResults(data.summaries || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-neutral-100">AI Professional Summary Generator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-neutral-950/60 p-3 rounded-lg border border-neutral-800/80">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Target Job Title</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Principal Product Manager"
              className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-100 focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Experience Level</label>
            <input
              type="text"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g. 5+ years, 10+ years"
              className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-100 focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end pt-1">
            <button
              type="button"
              disabled={loading}
              onClick={handleGenerate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>{results.length > 0 ? 'Regenerate Options' : 'Generate Summaries'}</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-800/50 border border-neutral-700/60 rounded-lg p-3 space-y-2 hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300">{item.title}</span>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(item.text);
                    onClose();
                  }}
                  className="px-2.5 py-1 text-xs font-medium bg-neutral-700 hover:bg-neutral-600 text-white rounded transition-colors"
                >
                  Use this Summary
                </button>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">{item.text}</p>
            </div>
          ))}

          {results.length === 0 && !loading && (
            <div className="text-center py-6 text-xs text-neutral-500">
              Click <span className="font-semibold text-neutral-300">Generate Summaries</span> to draft tailored executive summaries for your profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
