import React from 'react';
import { PersonalInfo } from '../../types/resume';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface PersonalSectionProps {
  data: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-neutral-200">Personal & Contact Information</h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Recruiters and hiring managers use this information to contact you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Professional Headline
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={data.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
              placeholder="e.g. Senior Full-Stack Engineer"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Email Address <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="alex.morgan@example.com"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Location (City, State / Country)
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Portfolio / Website
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://alexmorgan.dev"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">LinkedIn Profile</label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/alexmorgan"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-neutral-300 mb-1">GitHub / Code Repository</label>
          <div className="relative">
            <Github className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={data.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/alexmorgan"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
