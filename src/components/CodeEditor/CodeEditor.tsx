import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import JSZip from 'jszip';
import EditorToolbar from './EditorToolbar';

interface CodeEditorProps {
  code: string;
  onReset: () => void;
}

export default function CodeEditor({ code, onReset }: CodeEditorProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    zip.file('index.html', code);
    
    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to create zip:', err);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
      <EditorToolbar
        onCopy={handleCopy}
        onDownload={handleDownload}
        onReset={onReset}
      />
      <div className="flex-1 overflow-auto">
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