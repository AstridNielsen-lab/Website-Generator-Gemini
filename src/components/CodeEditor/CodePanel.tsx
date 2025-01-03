import React from 'react';
import { Save, Download } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import JSZip from 'jszip';

interface CodePanelProps {
  code: string;
  className?: string;
  onSave?: () => void;
}

export default function CodePanel({ code, className = '', onSave }: CodePanelProps) {
  const handleDownload = async () => {
    const zip = new JSZip();
    
    // Add the code file to the zip
    zip.file('code.txt', code);
    
    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-code.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to create zip:', err);
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-4 top-4 flex space-x-2 z-10">
        {onSave && (
          <button
            onClick={onSave}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            title="Save changes"
          >
            <Save className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleDownload}
          className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
          title="Download code"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
      <div className={`overflow-auto ${className}`}>
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