import React, { useState } from 'react';
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
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleButtonClick = async (action: string, callback: () => void) => {
    setActiveButton(action);
    await callback();
    setTimeout(() => setActiveButton(null), 500);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="flex space-x-2">
        <div className="relative">
          <button
            onClick={() => handleButtonClick('copy', onCopy)}
            onMouseEnter={() => setShowTooltip('copy')}
            onMouseLeave={() => setShowTooltip(null)}
            className={`p-2 rounded-lg transition-all ${
              activeButton === 'copy'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 scale-95'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
            }`}
            aria-label="Copy code"
          >
            <Copy className="w-5 h-5" />
          </button>
          {showTooltip === 'copy' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
              <div className="px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap shadow-lg">
                Copy to Clipboard
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => handleButtonClick('download', onDownload)}
            onMouseEnter={() => setShowTooltip('download')}
            onMouseLeave={() => setShowTooltip(null)}
            className={`p-2 rounded-lg transition-all ${
              activeButton === 'download'
                ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 scale-95'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
            }`}
            aria-label="Download code"
          >
            <Download className="w-5 h-5" />
          </button>
          {showTooltip === 'download' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
              <div className="px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap shadow-lg">
                Download as ZIP
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => handleButtonClick('reset', onReset)}
            onMouseEnter={() => setShowTooltip('reset')}
            onMouseLeave={() => setShowTooltip(null)}
            className={`p-2 rounded-lg transition-all ${
              activeButton === 'reset'
                ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 scale-95'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
            }`}
            aria-label="Reset code"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          {showTooltip === 'reset' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
              <div className="px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap shadow-lg">
                Reset Editor
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}