import React from 'react';
import { templates } from '../../utils/templates';

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {Object.values(templates).map(template => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className="p-4 border rounded-lg hover:border-blue-500 dark:border-gray-700 transition-colors text-left"
        >
          <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
        </button>
      ))}
    </div>
  );
}