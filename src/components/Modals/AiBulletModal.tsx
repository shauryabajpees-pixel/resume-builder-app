import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Copy, RefreshCw } from 'lucide-react';

interface AiBulletModalProps {
  isOpen: boolean;
  bullet: string;
  role: string;
  company: string;
  onClose: () => void;
  onSelect: (improvedBullet: string) => void;
}

export const AiBulletModal: React.FC<AiBulletModalProps> = ({
  isOpen,
  bullet,
  role,
  company,
  onClose,
  onSelect,
}) => {
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const fetchVariations = async () => {
    if (!bullet.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet, role, company }),
      });
      const data = await res.json();
      setVariations(data.variations || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && bullet) {
      fetchVariations();
    }
  }, [isOpen, bullet]);

  if (!isOpen) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-neutral-100">AI Bullet Point Enhancer</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Bullet */}
        <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-lg p-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
            Original Bullet
          </span>
          <p className="text-xs text-neutral-300 leading-relaxed italic">
            "{bullet || 'No text provided'}"
          </p>
          {(role || company) && (
            <div className="text-[11px] text-neutral-500 mt-1">
              Target context: {role} {company && `@ ${company}`}
            </div>
          )}
        </div>

        {/* Variations List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-300">
              Enhanced Variations (STAR & Quantified Metrics)
            </span>
            <button
              onClick={fetchVariations}
              disabled={loading}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>

          {loading ? (
            <div className="space-y-2 py-4">
              <div className="h-14 bg-neutral-800/60 rounded animate-pulse" />
              <div className="h-14 bg-neutral-800/60 rounded animate-pulse" />
              <div className="h-14 bg-neutral-800/60 rounded animate-pulse" />
            </div>
          ) : (
            <div className="space-y-2">
              {variations.map((v, idx) => (
                <div
                  key={idx}
                  className="group bg-neutral-800/40 hover:bg-neutral-800/80 border border-neutral-700/60 rounded-lg p-3 transition-colors flex flex-col justify-between gap-2.5"
                >
                  <p className="text-xs text-neutral-200 leading-relaxed font-sans">{v}</p>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-neutral-700/30">
                    <button
                      type="button"
                      onClick={() => handleCopy(v, idx)}
                      className="px-2 py-1 text-[11px] text-neutral-400 hover:text-neutral-200 rounded flex items-center gap-1 transition-colors"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelect(v);
                        onClose();
                      }}
                      className="px-3 py-1 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
                    >
                      Apply to Resume
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
