import React from 'react';
import { Save, Download } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodePanelProps {
  code: string;
  className?: string;
  onSave?: () => void;
}

export default function CodePanel({ code, className = '', onSave }: CodePanelProps) {
  return (
    <div className="h-full flex flex-col">
      {onSave && (
        <div className="flex justify-end p-2 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
          <button
            onClick={onSave}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            title="Save changes"
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className={`flex-1 overflow-auto ${className}`}>
        <SyntaxHighlighter
          language="html"
          style={tomorrow}
          customStyle={{
            margin: 0,
            height: '100%',
            padding: '1rem',
            fontSize: '0.9rem',
            backgroundColor: 'transparent',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}