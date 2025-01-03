import React from 'react';
import { Monitor, Tablet, Smartphone, Code, Eye, Columns } from 'lucide-react';

interface ViewControlsProps {
  view: 'split' | 'code' | 'preview';
  device: 'desktop' | 'tablet' | 'mobile';
  onViewChange: (view: 'split' | 'code' | 'preview') => void;
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

export default function ViewControls({
  view,
  device,
  onViewChange,
  onDeviceChange,
}: ViewControlsProps) {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="flex space-x-2">
        <button
          onClick={() => onViewChange('split')}
          className={`p-2 rounded-lg transition-colors ${
            view === 'split'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Split View"
        >
          <Columns className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewChange('code')}
          className={`p-2 rounded-lg transition-colors ${
            view === 'code'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Code View"
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewChange('preview')}
          className={`p-2 rounded-lg transition-colors ${
            view === 'preview'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Preview"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onDeviceChange('desktop')}
          className={`p-2 rounded-lg transition-colors ${
            device === 'desktop'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Desktop View"
        >
          <Monitor className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDeviceChange('tablet')}
          className={`p-2 rounded-lg transition-colors ${
            device === 'tablet'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Tablet View"
        >
          <Tablet className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDeviceChange('mobile')}
          className={`p-2 rounded-lg transition-colors ${
            device === 'mobile'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Mobile View"
        >
          <Smartphone className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}