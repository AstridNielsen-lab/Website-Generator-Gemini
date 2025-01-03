import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  className?: string;
}

interface TerminalEntry {
  type: 'input' | 'output';
  content: string;
  timestamp: string;
}

export default function Terminal({ className = '' }: TerminalProps) {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      type: 'output',
      content: '~/project\n❯ npm install\n\nadded 317 packages in 6s\n\n81 packages are looking for funding\n  run `npm fund` for details',
      timestamp: new Date().toISOString()
    },
    {
      type: 'output',
      content: '~/project 6s\n❯ npm run dev\n\n> ai-site-generator@0.0.0 dev\n> vite',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newEntry: TerminalEntry = {
      type: 'input',
      content: input,
      timestamp: new Date().toISOString()
    };

    setEntries(prev => [...prev, newEntry]);
    setInput('');
  };

  return (
    <div className={`flex flex-col bg-gray-900 text-gray-100 font-mono text-sm ${className}`}>
      <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <TerminalIcon className="w-4 h-4 mr-2" />
        <span className="text-xs">Terminal</span>
      </div>
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-auto whitespace-pre-wrap"
      >
        {entries.map((entry, index) => (
          <div key={index} className="mb-2">
            <span className="text-gray-500">
              {entry.type === 'input' ? '❯ ' : ''}
            </span>
            {entry.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-2 border-t border-gray-700">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">❯</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            placeholder="Enter command..."
          />
        </div>
      </form>
    </div>
  );
}