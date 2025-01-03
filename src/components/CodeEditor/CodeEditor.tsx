import React, { useState } from 'react';
import EditorToolbar from './EditorToolbar';
import CodePanel from './CodePanel';
import PreviewPanel from './PreviewPanel';
import ViewControls from './ViewControls';
import ProjectStructure from './ProjectStructure';
import FileEditor from './FileEditor';
import ResizablePanel from './ResizablePanel';
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
  const [fileContents, setFileContents] = useState<Record<string, string>>({});

  const handleGenerateStructure = () => {
    const structure = generateProjectStructure(code);
    setProjectStructure(structure);
    
    // Initialize file contents
    const contents: Record<string, string> = {};
    const traverseStructure = (folder: ProjectFolder) => {
      folder.children?.forEach(item => {
        if (item.type === 'file') {
          contents[item.path] = '// Edit this file\n';
        } else {
          traverseStructure(item);
        }
      });
    };
    traverseStructure(structure);
    setFileContents(contents);
  };

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
  };

  const handleFileSave = (path: string, content: string) => {
    setFileContents(prev => ({
      ...prev,
      [path]: content
    }));
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
          <ResizablePanel defaultSize={240} minSize={200} maxSize={400} className="border-r dark:border-gray-700">
            <div className="h-full overflow-y-auto scrollbar-thin p-2">
              <ProjectStructure 
                structure={projectStructure} 
                onSelect={handleFileSelect}
              />
            </div>
          </ResizablePanel>
        )}
        <div className="flex-1 flex">
          {selectedFile ? (
            <ResizablePanel defaultSize={500} minSize={300} maxSize={1000} className="border-r dark:border-gray-700">
              <FileEditor
                path={selectedFile}
                content={fileContents[selectedFile] || ''}
                onSave={handleFileSave}
              />
            </ResizablePanel>
          ) : (
            (view === 'split' || view === 'code') && (
              <ResizablePanel 
                defaultSize={view === 'split' ? window.innerWidth / 3 : window.innerWidth} 
                className="overflow-auto scrollbar-thin"
              >
                <CodePanel code={code} />
              </ResizablePanel>
            )
          )}
          {(view === 'split' || view === 'preview') && (
            <div className="flex-1 overflow-auto scrollbar-thin">
              <PreviewPanel
                code={code}
                device={device}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}