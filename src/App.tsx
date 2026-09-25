import React, { useState, useEffect } from 'react';
import { ResumeData, SkillCategory } from './types/resume';
import { loadCurrentResume, saveCurrentResume } from './utils/storage';
import { PRESET_RESUMES, sampleBlankResume } from './data/sampleResumes';
import { Navbar } from './components/Navbar';
import { ResumeEditor } from './components/ResumeEditor/ResumeEditor';
import { ResumePreview } from './components/ResumePreview/ResumePreview';
import { AiBulletModal } from './components/Modals/AiBulletModal';
import { AiSummaryModal } from './components/Modals/AiSummaryModal';
import { AtsModal } from './components/Modals/AtsModal';
import { ExportModal } from './components/Modals/ExportModal';
import { Edit3, Eye } from 'lucide-react';

export default function App() {
  const [resume, setResume] = useState<ResumeData>(() => loadCurrentResume());
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  // Modal states
  const [bulletModalData, setBulletModalData] = useState<{
    isOpen: boolean;
    bullet: string;
    role: string;
    company: string;
    onSelect: (newB: string) => void;
  }>({
    isOpen: false,
    bullet: '',
    role: '',
    company: '',
    onSelect: () => {},
  });

  const [aiSummaryModalOpen, setAiSummaryModalOpen] = useState(false);
  const [atsModalOpen, setAtsModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Sync to localStorage
  const handleUpdateResume = (updated: ResumeData) => {
    setResume(updated);
    saveCurrentResume(updated);
  };

  const handleSelectPreset = (key: string) => {
    const selected = PRESET_RESUMES[key] || sampleBlankResume;
    // Clone with a unique timestamp ID to prevent mutation
    const cloned: ResumeData = {
      ...selected,
      id: `resume-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    handleUpdateResume(cloned);
  };

  const handleOpenAiBullet = (
    bullet: string,
    role: string,
    company: string,
    onSelect: (newB: string) => void
  ) => {
    setBulletModalData({
      isOpen: true,
      bullet,
      role,
      company,
      onSelect,
    });
  };

  const handleAddSkillFromAts = (skill: string) => {
    const categories = [...resume.skillCategories];
    if (categories.length === 0) {
      categories.push({
        id: `cat-${Date.now()}`,
        name: 'Target Skills',
        skills: [skill],
      });
    } else {
      // Add to first category if not already present
      if (!categories[0].skills.includes(skill)) {
        categories[0] = {
          ...categories[0],
          skills: [...categories[0].skills, skill],
        };
      }
    }
    handleUpdateResume({ ...resume, skillCategories: categories });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-950 text-neutral-100 overflow-hidden select-none">
      {/* Top Navbar */}
      <Navbar
        currentResume={resume}
        onSelectPreset={handleSelectPreset}
        onOpenAtsModal={() => setAtsModalOpen(true)}
        onOpenExportModal={() => setExportModalOpen(true)}
        onOpenStyling={() => {
          setActiveSection('styling');
          setMobileTab('editor');
        }}
        onPrint={() => window.print()}
      />

      {/* Mobile Editor/Preview Switcher */}
      <div className="lg:hidden flex items-center justify-center p-1 bg-neutral-900 border-b border-neutral-800 shrink-0 no-print">
        <div className="flex bg-neutral-950 rounded-lg p-0.5 border border-neutral-800">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex items-center gap-1.5 px-4 py-1 rounded-md text-xs font-medium transition-colors ${
              mobileTab === 'editor'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex items-center gap-1.5 px-4 py-1 rounded-md text-xs font-medium transition-colors ${
              mobileTab === 'preview'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar */}
        <div className={`h-full ${mobileTab === 'editor' ? 'flex' : 'hidden'} lg:flex shrink-0`}>
          <ResumeEditor
            resume={resume}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onChange={handleUpdateResume}
            onOpenAiBulletModal={handleOpenAiBullet}
            onOpenAiSummaryModal={() => setAiSummaryModalOpen(true)}
          />
        </div>

        {/* Live Resume Preview Canvas */}
        <div className={`flex-1 h-full ${mobileTab === 'preview' ? 'flex' : 'hidden'} lg:flex`}>
          <ResumePreview
            resume={resume}
            onOpenAtsModal={() => setAtsModalOpen(true)}
            onOpenThemeSettings={() => {
              setActiveSection('styling');
              setMobileTab('editor');
            }}
          />
        </div>
      </div>

      {/* Modals */}
      <AiBulletModal
        isOpen={bulletModalData.isOpen}
        bullet={bulletModalData.bullet}
        role={bulletModalData.role}
        company={bulletModalData.company}
        onClose={() => setBulletModalData((prev) => ({ ...prev, isOpen: false }))}
        onSelect={bulletModalData.onSelect}
      />

      <AiSummaryModal
        isOpen={aiSummaryModalOpen}
        roleHeadline={resume.personal.headline}
        skills={resume.skillCategories.flatMap((c) => c.skills)}
        currentSummary={resume.summary}
        onClose={() => setAiSummaryModalOpen(false)}
        onSelect={(newSummary) => handleUpdateResume({ ...resume, summary: newSummary })}
      />

      <AtsModal
        isOpen={atsModalOpen}
        resume={resume}
        onClose={() => setAtsModalOpen(false)}
        onAddSkill={handleAddSkillFromAts}
      />

      <ExportModal
        isOpen={exportModalOpen}
        resume={resume}
        onClose={() => setExportModalOpen(false)}
        onImport={(imported) => handleUpdateResume(imported)}
      />
    </div>
  );
}
