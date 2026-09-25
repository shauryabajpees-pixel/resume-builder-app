import React, { useState } from 'react';
import { PRESET_RESUMES } from '../data/sampleResumes';
import { ResumeData } from '../types/resume';
import { Printer, Sparkles, Download, Layers, ChevronDown, Check } from 'lucide-react';

interface NavbarProps {
  currentResume: ResumeData;
  onSelectPreset: (key: string) => void;
  onOpenAtsModal: () => void;
  onOpenExportModal: () => void;
  onOpenStyling: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentResume,
  onSelectPreset,
  onOpenAtsModal,
  onOpenExportModal,
  onOpenStyling,
  onPrint,
}) => {
  const [presetDropdownOpen, setPresetDropdownOpen] = useState(false);

  return (
    <header className="no-print h-14 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
      {/* Zone 1: Single-Element Wordmark */}
      <a href="/" className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
        ResumeCraft
      </a>

      {/* Zone 2: Clean 4 Navigation Links / Actions */}
      <nav className="flex items-center gap-1 sm:gap-2 text-xs font-medium text-neutral-300">
        {/* Presets Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setPresetDropdownOpen(!presetDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-neutral-800 hover:text-white transition-colors whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>Samples</span>
            <ChevronDown className="w-3 h-3 text-neutral-500" />
          </button>

          {presetDropdownOpen && (
            <div className="absolute left-0 mt-1 w-52 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl p-1 z-40">
              <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                Load Sample Profile
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectPreset('swe');
                  setPresetDropdownOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800 rounded transition-colors flex items-center justify-between"
              >
                <span>Senior Software Engineer</span>
                {currentResume.id === 'resume-swe-senior' && <Check className="w-3 h-3 text-emerald-400" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectPreset('pm');
                  setPresetDropdownOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800 rounded transition-colors flex items-center justify-between"
              >
                <span>Principal Product Manager</span>
                {currentResume.id === 'resume-pm-lead' && <Check className="w-3 h-3 text-emerald-400" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectPreset('blank');
                  setPresetDropdownOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded transition-colors border-t border-neutral-800/60 mt-1"
              >
                <span>Clear to Blank Slate</span>
              </button>
            </div>
          )}
        </div>

        {/* Styling / Templates */}
        <button
          type="button"
          onClick={onOpenStyling}
          className="px-2.5 py-1.5 rounded-md hover:bg-neutral-800 hover:text-white transition-colors whitespace-nowrap"
        >
          Templates
        </button>

        {/* ATS Checker */}
        <button
          type="button"
          onClick={onOpenAtsModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-emerald-400 hover:bg-neutral-800 transition-colors whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>ATS Score</span>
        </button>

        {/* Export / Backup */}
        <button
          type="button"
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-neutral-800 hover:text-white transition-colors whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5 text-neutral-400" />
          <span>Export</span>
        </button>
      </nav>

      {/* Zone 3: 1-2 Primary Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-md transition-colors shadow-sm whitespace-nowrap"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / PDF</span>
        </button>
      </div>
    </header>
  );
};
