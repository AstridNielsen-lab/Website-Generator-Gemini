import React, { useState } from 'react';
import EditorToolbar from './EditorToolbar';
import CodePanel from './CodePanel';
import PreviewPanel from './PreviewPanel';
import ViewControls from './ViewControls';

interface CodeEditorProps {
  code: string;
  onReset: () => void;
}

export default function CodeEditor({ code, onReset }: CodeEditorProps) {
  const [view, setView] = useState<'split' | 'code' | 'preview'>('split');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
      <EditorToolbar
        title="Generator Website"
        onReset={onReset}
      />
      <ViewControls
        view={view}
        device={device}
        onViewChange={setView}
        onDeviceChange={setDevice}
      />
      <div className="flex-1 flex overflow-hidden">
        {(view === 'split' || view === 'code') && (
          <CodePanel 
            code={code}
            className={`${view === 'split' ? 'w-1/2' : 'w-full'} overflow-auto scrollbar-thin`}
          />
        )}
        {(view === 'split' || view === 'preview') && (
          <PreviewPanel
            code={code}
            device={device}
            className={`${view === 'split' ? 'w-1/2' : 'w-full'} overflow-auto scrollbar-thin`}
          />
        )}
      </div>
    </div>
  );
}