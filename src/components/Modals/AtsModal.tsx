import React, { useState } from 'react';
import { ResumeData, AtsCheckResult } from '../../types/resume';
import { convertResumeToPlainText } from '../../utils/storage';
import { X, Sparkles, CheckCircle2, AlertTriangle, RefreshCw, Plus, Clock, FileText } from 'lucide-react';

interface AtsModalProps {
  isOpen: boolean;
  resume: ResumeData;
  onClose: () => void;
  onAddSkill: (skill: string) => void;
}

export const AtsModal: React.FC<AtsModalProps> = ({
  isOpen,
  resume,
  onClose,
  onAddSkill,
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AtsCheckResult | null>(null);

  if (!isOpen) return null;

  const handleScan = async () => {
    setLoading(true);
    try {
      const resumeText = convertResumeToPlainText(resume);
      const res = await fetch('/api/ai/ats-critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="text-sm font-semibold text-neutral-100">
                ATS Compatibility & Keyword Matcher
              </h3>
              <p className="text-xs text-neutral-400">
                Scan your resume against ATS ranking criteria and optional target job requirements.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content scroll area */}
        <div className="overflow-y-auto space-y-4 pr-1">
          {/* Job Description Input */}
          <div className="space-y-1.5 bg-neutral-950/60 p-3 rounded-lg border border-neutral-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-neutral-300">
                Target Job Description (Optional)
              </label>
              {jobDescription && (
                <button
                  type="button"
                  onClick={() => setJobDescription('')}
                  className="text-[11px] text-neutral-500 hover:text-neutral-300"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job requirements, required qualifications, or role description to benchmark keyword alignment..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md p-2.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
            />
            <div className="flex justify-end pt-1">
              <button
                type="button"
                disabled={loading}
                onClick={handleScan}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{result ? 'Re-Analyze Resume' : 'Run ATS Scan'}</span>
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-4">
              {/* Score Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-neutral-800/40 border border-neutral-700/60 rounded-lg p-3 text-center">
                  <div className="text-[11px] font-medium text-neutral-400">ATS Score</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                    {result.score}/100
                  </div>
                </div>

                <div className="bg-neutral-800/40 border border-neutral-700/60 rounded-lg p-3 text-center">
                  <div className="text-[11px] font-medium text-neutral-400">Job Match</div>
                  <div className="text-2xl font-bold font-mono text-blue-400 mt-0.5">
                    {result.matchPercentage}%
                  </div>
                </div>

                <div className="bg-neutral-800/40 border border-neutral-700/60 rounded-lg p-3 text-center">
                  <div className="text-[11px] font-medium text-neutral-400">Word Count</div>
                  <div className="text-xl font-bold font-mono text-neutral-200 mt-1 flex items-center justify-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{result.wordCount || 420}</span>
                  </div>
                </div>

                <div className="bg-neutral-800/40 border border-neutral-700/60 rounded-lg p-3 text-center">
                  <div className="text-[11px] font-medium text-neutral-400">Reading Time</div>
                  <div className="text-xl font-bold font-mono text-neutral-200 mt-1 flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>~{result.readingTimeMinutes || 2} min</span>
                  </div>
                </div>
              </div>

              {/* Assessment Feedback */}
              {result.summaryFeedback && (
                <div className="bg-neutral-800/30 border border-neutral-700/50 rounded-lg p-3 text-xs text-neutral-200 leading-relaxed">
                  <span className="font-semibold text-neutral-100">Reviewer Verdict: </span>
                  {result.summaryFeedback}
                </div>
              )}

              {/* Missing Keywords (if any) */}
              {result.missingKeywords && result.missingKeywords.length > 0 && (
                <div className="border border-amber-900/40 bg-amber-950/20 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>High-Value Missing Keywords</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    These keywords are frequently expected for this profile. Click to instantly add to your Skills section.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((kw, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onAddSkill(kw)}
                        className="inline-flex items-center gap-1 text-xs bg-amber-950/60 text-amber-200 border border-amber-800/60 px-2 py-0.5 rounded hover:bg-amber-900/60 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{kw}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-emerald-900/40 bg-emerald-950/10 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ATS Strengths</span>
                  </div>
                  <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-outside pl-4 marker:text-emerald-500">
                    {result.strengths.map((str, idx) => (
                      <li key={idx} className="leading-snug">
                        {str}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-blue-900/40 bg-blue-950/10 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Target Improvements</span>
                  </div>
                  <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-outside pl-4 marker:text-blue-500">
                    {result.improvements.map((imp, idx) => (
                      <li key={idx} className="leading-snug">
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!result && !loading && (
            <div className="text-center py-8 text-xs text-neutral-500">
              Click <span className="font-semibold text-neutral-300">Run ATS Scan</span> to evaluate your resume structure, action verbs, and keyword density.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
