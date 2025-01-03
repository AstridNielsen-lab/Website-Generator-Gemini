import React, { useState, useEffect } from 'react';
import { parseCodeBlock } from '../../utils/fileParser';
import { addFileToProject } from '../../utils/projectStructure';
import EditorToolbar from './EditorToolbar';
import CodePanel from './CodePanel';
import PreviewPanel from './PreviewPanel';
import ViewControls from './ViewControls';
import ProjectStructure from './ProjectStructure';
import FileEditor from './FileEditor';
import ResizablePanel from './ResizablePanel';
import ExpandableSection from './ExpandableSection';
import type { ProjectFolder } from '../../types';

interface CodeEditorProps {
  code: string;
  onReset: () => void;
}

export default function CodeEditor({ code, onReset }: CodeEditorProps) {
  const [view, setView] = useState<'split' | 'code' | 'preview'>('split');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [projectStructure, setProjectStructure] = useState<ProjectFolder>({
    name: 'project',
    type: 'folder',
    children: []
  });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});

  useEffect(() => {
    if (code) {
      const parsedFiles = parseCodeBlock(code);
      let updatedStructure = { ...projectStructure };
      const newFileContents: Record<string, string> = {};
      
      parsedFiles.forEach(file => {
        updatedStructure = addFileToProject(updatedStructure, file);
        newFileContents[file.path] = file.content;
      });
      
      setProjectStructure(updatedStructure);
      setFileContents(newFileContents);
    }
  }, [code]);

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
        title="Generated Code"
        onReset={onReset}
        onGenerateStructure={() => {}}
      />
      <ViewControls
        view={view}
        device={device}
        onViewChange={setView}
        onDeviceChange={setDevice}
      />
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanel defaultSize={240} minSize={200} maxSize={400} className="border-r dark:border-gray-700">
          <ExpandableSection title="Project Structure" defaultExpanded={true}>
            <div className="overflow-y-auto scrollbar-thin max-h-[calc(100vh-300px)]">
              <ProjectStructure 
                structure={projectStructure}
                onSelect={handleFileSelect}
              />
            </div>
          </ExpandableSection>
        </ResizablePanel>
        
        <div className="flex-1 flex">
          {selectedFile ? (
            <div className="flex-1">
              <FileEditor
                path={selectedFile}
                content={fileContents[selectedFile] || ''}
                onSave={handleFileSave}
              />
            </div>
          ) : (
            <>
              {(view === 'split' || view === 'code') && (
                <div className={`${view === 'split' ? 'w-1/2' : 'w-full'}`}>
                  <CodePanel code={code} />
                </div>
              )}
              {(view === 'split' || view === 'preview') && (
                <div className={`${view === 'split' ? 'w-1/2' : 'w-full'}`}>
                  <PreviewPanel
                    code={fileContents['/index.html'] || code}
                    device={device}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}