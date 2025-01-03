import React, { useState } from 'react';
import EditorToolbar from './EditorToolbar';
import CodePanel from './CodePanel';
import PreviewPanel from './PreviewPanel';
import ViewControls from './ViewControls';
import ProjectStructure from './ProjectStructure';
import { generateProjectStructure } from '../../utils/projectGenerator';
import type { ProjectFolder } from '../../types';

interface CodeEditorProps {
  code: string;
  onReset: () => void;
}

export default function CodeEditor({ code, onReset }: CodeEditorProps) {
  const [view, setView] = useState<'split' | 'code' | 'preview'>('split');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [projectStructure, setProjectStructure] = useState<ProjectFolder | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleGenerateStructure = () => {
    const structure = generateProjectStructure(code);
    setProjectStructure(structure);
  };

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
      <EditorToolbar
        title="Generator Website"
        onReset={onReset}
        onGenerateStructure={handleGenerateStructure}
      />
      <ViewControls
        view={view}
        device={device}
        onViewChange={setView}
        onDeviceChange={setDevice}
      />
      <div className="flex-1 flex overflow-hidden">
        {projectStructure && (
          <div className="w-64 border-r dark:border-gray-700 overflow-y-auto scrollbar-thin p-2">
            <ProjectStructure 
              structure={projectStructure} 
              onSelect={handleFileSelect}
            />
          </div>
        )}
        <div className={`flex-1 flex ${projectStructure ? 'pl-2' : ''}`}>
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
    </div>
  );
}