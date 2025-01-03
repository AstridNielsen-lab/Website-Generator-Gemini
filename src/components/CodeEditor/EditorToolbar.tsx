import React from 'react';
import { Download, Copy, RefreshCw } from 'lucide-react';

interface EditorToolbarProps {
  title: string;
  onReset: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

export default function EditorToolbar({ 
  title, 
  onReset,
  onCopy,
  onDownload 
}: EditorToolbarProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="flex space-x-2">
        <button
          onClick={onCopy}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Copy code"
        >
          <Copy className="w-5 h-5" />
        </button>
        <button
          onClick={onDownload}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Download"
        >
          <Download className="w-5 h-5" />
        </button>
        <button
          onClick={onReset}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Reset"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}