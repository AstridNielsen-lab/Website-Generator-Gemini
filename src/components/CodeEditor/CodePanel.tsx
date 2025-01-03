import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodePanelProps {
  code: string;
  className?: string;
}

export default function CodePanel({ code, className = '' }: CodePanelProps) {
  return (
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
  );
}