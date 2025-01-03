import React from 'react';
import { Download, Copy, RefreshCw, FolderTree } from 'lucide-react';

interface EditorToolbarProps {
  title: string;
  onReset: () => void;
  onGenerateStructure: () => void;
}

export default function EditorToolbar({ title, onReset, onGenerateStructure }: EditorToolbarProps) {
  const handleCopy = async () => {
    try {
      const code = document.querySelector('pre code')?.textContent;
      if (code) {
        await navigator.clipboard.writeText(code);
        alert('Code copied to clipboard!');
      }
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    const code = document.querySelector('pre code')?.textContent;
    if (code) {
      const blob = new Blob([code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="flex space-x-2">
        <button
          onClick={onGenerateStructure}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Generate Project Structure"
        >
          <FolderTree className="w-5 h-5" />
        </button>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Copy code"
        >
          <Copy className="w-5 h-5" />
        </button>
        <button
          onClick={handleDownload}
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