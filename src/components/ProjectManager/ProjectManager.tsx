import React, { useState } from 'react';
import type { Project } from '../../types';
import { createProject } from '../../utils/project';
import TemplateSelector from './TemplateSelector';

interface ProjectManagerProps {
  onProjectCreate: (project: Project) => void;
}

export default function ProjectManager({ onProjectCreate }: ProjectManagerProps) {
  const [projectName, setProjectName] = useState('');

  const handleTemplateSelect = async (templateId: string) => {
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }
    
    const project = await createProject(templateId, projectName);
    onProjectCreate(project);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="w-full p-2 border rounded dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      <TemplateSelector onSelect={handleTemplateSelect} />
    </div>
  );
}