import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { ModernTemplate } from '../Templates/ModernTemplate';
import { ExecutiveTemplate } from '../Templates/ExecutiveTemplate';
import { CompactTemplate } from '../Templates/CompactTemplate';
import { TechTemplate } from '../Templates/TechTemplate';
import { MinimalistTemplate } from '../Templates/MinimalistTemplate';
import { ZoomIn, ZoomOut, RotateCcw, Printer, Layout, Sparkles } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  onOpenAtsModal: () => void;
  onOpenThemeSettings: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  onOpenAtsModal,
  onOpenThemeSettings,
}) => {
  const [zoom, setZoom] = useState<number>(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 140));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 60));
  const handleResetZoom = () => setZoom(100);

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (resume.theme.template) {
      case 'executive':
        return <ExecutiveTemplate data={resume} />;
      case 'compact':
        return <CompactTemplate data={resume} />;
      case 'tech':
        return <TechTemplate data={resume} />;
      case 'minimalist':
        return <MinimalistTemplate data={resume} />;
      case 'modern':
      default:
        return <ModernTemplate data={resume} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950/60 overflow-hidden relative">
      {/* Top Floating Utility Bar */}
      <div className="no-print h-12 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="font-medium text-neutral-300 capitalize">
            {resume.theme.template} Template
          </span>
          <span className="text-neutral-600">·</span>
          <span>{resume.theme.paperSize.toUpperCase()}</span>
          <span className="text-neutral-600">·</span>
          <span className="tabular-nums">{zoom}%</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Zoom controls */}
          <div className="flex items-center bg-neutral-800/80 rounded border border-neutral-700/60 p-0.5 mr-2">
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1 text-neutral-300 hover:text-white hover:bg-neutral-700 rounded transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom (100%)"
              className="px-1.5 py-0.5 text-[11px] font-mono text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors"
            >
              {zoom}%
            </button>
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1 text-neutral-300 hover:text-white hover:bg-neutral-700 rounded transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick ATS Review */}
          <button
            onClick={onOpenAtsModal}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/50 rounded transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATS Match</span>
          </button>

          {/* Theme Settings Button */}
          <button
            onClick={onOpenThemeSettings}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Design</span>
          </button>

          {/* Print / PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start resume-paper-container">
        <div
          className="transition-transform duration-150 origin-top flex flex-col items-center"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Simulated Paper Sheet */}
          <div
            id="printable-resume"
            className="resume-sheet bg-white shadow-2xl rounded-sm w-[210mm] min-h-[297mm] transition-all overflow-hidden"
            style={{
              width: resume.theme.paperSize === 'a4' ? '210mm' : '8.5in',
              minHeight: resume.theme.paperSize === 'a4' ? '297mm' : '11in',
            }}
          >
            {renderTemplate()}
          </div>

          <div className="no-print mt-6 mb-8 text-center text-xs text-neutral-500">
            Tip: Use <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-300 border border-neutral-700">Ctrl/Cmd + P</kbd> or click <span className="font-semibold text-neutral-300">Print / PDF</span> to save as high-resolution vector PDF.
          </div>
        </div>
      </div>
    </div>
  );
};
