import { ResumeData } from '../types/resume';
import { sampleSoftwareEngineer } from '../data/sampleResumes';

const STORAGE_KEY = 'resumecraft_current_resume';
const RESUMES_LIST_KEY = 'resumecraft_saved_resumes';

export function loadCurrentResume(): ResumeData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load resume from storage:', e);
  }
  return sampleSoftwareEngineer;
}

export function saveCurrentResume(resume: ResumeData): void {
  try {
    const updated = { ...resume, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Also update in list
    const list = getSavedResumesList();
    const index = list.findIndex((r) => r.id === updated.id);
    if (index >= 0) {
      list[index] = { id: updated.id, title: updated.title, updatedAt: updated.updatedAt };
    } else {
      list.push({ id: updated.id, title: updated.title, updatedAt: updated.updatedAt });
    }
    localStorage.setItem(RESUMES_LIST_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save resume:', e);
  }
}

export function getSavedResumesList(): { id: string; title: string; updatedAt: string }[] {
  try {
    const list = localStorage.getItem(RESUMES_LIST_KEY);
    if (list) {
      return JSON.parse(list);
    }
  } catch (e) {
    console.error('Failed to load resumes list:', e);
  }
  return [
    {
      id: sampleSoftwareEngineer.id,
      title: sampleSoftwareEngineer.title,
      updatedAt: sampleSoftwareEngineer.updatedAt,
    },
  ];
}

export function downloadJsonFile(resume: ResumeData): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement('a');
  const filename = `${resume.personal.fullName.replace(/\s+/g, '_') || 'Resume'}_Resume.json`;
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function convertResumeToPlainText(resume: ResumeData): string {
  const p = resume.personal;
  let text = `${p.fullName.toUpperCase()}\n`;
  if (p.headline) text += `${p.headline}\n`;
  const contactParts = [p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean);
  text += `${contactParts.join(' | ')}\n\n`;

  if (resume.summary) {
    text += `PROFESSIONAL SUMMARY\n--------------------\n${resume.summary}\n\n`;
  }

  if (resume.experiences.length > 0) {
    text += `EXPERIENCE\n----------\n`;
    resume.experiences.forEach((exp) => {
      text += `${exp.role} | ${exp.company} | ${exp.location}\n`;
      text += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
      exp.bullets.forEach((b) => {
        text += `• ${b}\n`;
      });
      text += '\n';
    });
  }

  if (resume.skillCategories.length > 0) {
    text += `SKILLS\n------\n`;
    resume.skillCategories.forEach((cat) => {
      text += `${cat.name}: ${cat.skills.join(', ')}\n`;
    });
    text += '\n';
  }

  if (resume.projects.length > 0) {
    text += `PROJECTS\n--------\n`;
    resume.projects.forEach((proj) => {
      text += `${proj.title}${proj.techStack?.length ? ` (${proj.techStack.join(', ')})` : ''}\n`;
      if (proj.description) text += `${proj.description}\n`;
      proj.bullets.forEach((b) => {
        text += `• ${b}\n`;
      });
      text += '\n';
    });
  }

  if (resume.educations.length > 0) {
    text += `EDUCATION\n---------\n`;
    resume.educations.forEach((edu) => {
      text += `${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}\n`;
      text += `${edu.institution} | ${edu.location} (${edu.startDate} - ${edu.endDate})\n`;
      if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
      if (edu.honors) text += `Honors: ${edu.honors}\n`;
      text += '\n';
    });
  }

  if (resume.certifications.length > 0) {
    text += `CERTIFICATIONS\n--------------\n`;
    resume.certifications.forEach((c) => {
      text += `${c.name} - ${c.issuer} (${c.issueDate})\n`;
    });
    text += '\n';
  }

  return text;
}
