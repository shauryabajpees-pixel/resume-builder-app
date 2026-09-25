import React, { useRef, useState } from 'react';
import { ResumeData } from '../../types/resume';
import { downloadJsonFile, convertResumeToPlainText } from '../../utils/storage';
import { X, Download, Copy, Upload, Check, FileCode, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  resume: ResumeData;
  onClose: () => void;
  onImport: (importedResume: ResumeData) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  resume,
  onClose,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyPlainText = () => {
    const text = convertResumeToPlainText(resume);
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownloadJson = () => {
    downloadJsonFile(resume);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.personal || !parsed.theme) {
          throw new Error('Invalid resume data structure');
        }
        onImport(parsed);
        onClose();
      } catch (err: any) {
        setImportError('Failed to parse resume JSON. Ensure it was exported from ResumeCraft.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-lg p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-sm font-semibold text-neutral-100">Export & Import Resume</h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {importError && (
          <div className="bg-rose-950/40 border border-rose-900/50 rounded-lg p-2.5 text-xs text-rose-300">
            {importError}
          </div>
        )}

        <div className="space-y-3">
          {/* Download JSON */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-950/60 border border-neutral-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300">
                <FileCode className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-200">JSON Data Backup</div>
                <div className="text-[11px] text-neutral-400">Save your full resume structure locally</div>
              </div>
            </div>
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>

          {/* Copy Plain Text */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-950/60 border border-neutral-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-200">Plain Text / Markdown</div>
                <div className="text-[11px] text-neutral-400">Ready to paste into plain-text job boards</div>
              </div>
            </div>
            <button
              onClick={handleCopyPlainText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          {/* Import JSON */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-950/60 border border-neutral-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-200">Restore from File</div>
                <div className="text-[11px] text-neutral-400">Import a previously saved Resume JSON</div>
              </div>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Choose File</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
