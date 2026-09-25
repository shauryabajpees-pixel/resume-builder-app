import React, { useState } from 'react';
import { Sparkles, RefreshCw, Wand2 } from 'lucide-react';

interface SummarySectionProps {
  summary: string;
  roleHeadline: string;
  onChange: (value: string) => void;
  onOpenAiSummaryModal: () => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  roleHeadline,
  onChange,
  onOpenAiSummaryModal,
}) => {
  const [isQuickPolishing, setIsQuickPolishing] = useState(false);

  const words = summary.trim() ? summary.trim().split(/\s+/).length : 0;
  const chars = summary.length;

  const handleQuickImprove = async () => {
    if (!summary.trim()) {
      onOpenAiSummaryModal();
      return;
    }

    setIsQuickPolishing(true);
    try {
      const res = await fetch('/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: roleHeadline || 'Professional',
          currentSummary: summary,
        }),
      });
      const data = await res.json();
      if (data.summaries && data.summaries.length > 0) {
        onChange(data.summaries[0].text);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsQuickPolishing(false);
    }
  };

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200">Professional Summary</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            A concise 2-4 sentence narrative highlighting your core strengths and quantifiable career achievements.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenAiSummaryModal}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/40 rounded transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Generator</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Accomplished Staff Engineer with 8+ years leading cloud architecture and distributed microservices..."
          className="w-full bg-neutral-900 border border-neutral-800 rounded-md p-3 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors leading-relaxed"
        />

        <div className="flex items-center justify-between mt-1 text-[11px] text-neutral-500">
          <div className="flex items-center gap-3">
            <span>{words} words</span>
            <span>·</span>
            <span>{chars} characters</span>
            {words > 0 && words < 30 && (
              <span className="text-amber-400/80">A bit brief (recommended: 40-70 words)</span>
            )}
            {words >= 30 && words <= 85 && (
              <span className="text-emerald-400/80">Ideal length for ATS scan</span>
            )}
            {words > 85 && (
              <span className="text-amber-400/80">May exceed 1-page budget</span>
            )}
          </div>

          <button
            type="button"
            disabled={isQuickPolishing}
            onClick={handleQuickImprove}
            className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1 transition-colors disabled:opacity-50"
          >
            {isQuickPolishing ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <Wand2 className="w-3 h-3 text-amber-400" />
            )}
            <span>Quick Polish</span>
          </button>
        </div>
      </div>
    </div>
  );
};
