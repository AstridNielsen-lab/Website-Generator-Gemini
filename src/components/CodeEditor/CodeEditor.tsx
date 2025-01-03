import React, { useState, useEffect } from 'react';
import { handleGeneratedCode } from '../../utils/codeHandler';
import EditorToolbar from './EditorToolbar';
import CodePanel from './CodePanel';
import PreviewPanel from './PreviewPanel';
import ViewControls from './ViewControls';
import ProjectStructure from './ProjectStructure';
import FileEditor from './FileEditor';
import ResizablePanel from './ResizablePanel';
import type { ProjectFolder } from '../../types';
import JSZip from 'jszip';

interface CodeEditorProps {
  code: string;
  onReset: () => void;
}

export default function CodeEditor({ code, onReset }: CodeEditorProps) {
  const [view, setView] = useState<'split' | 'code' | 'preview'>('split');
  const [previousView, setPreviousView] = useState<'split' | 'code' | 'preview'>('split');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [projectStructure, setProjectStructure] = useState<ProjectFolder>({
    name: 'project',
    type: 'folder',
    children: []
  });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [panelSize, setPanelSize] = useState(240);

  useEffect(() => {
    if (code) {
      const { updatedStructure, files } = handleGeneratedCode(code, projectStructure);
      setProjectStructure(updatedStructure);
      setFileContents(files);
    }
  }, [code]);

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
    setPreviousView(view);
    setView('code');
  };

  const handleFileSave = (path: string, content: string) => {
    setFileContents(prev => ({
      ...prev,
      [path]: content
    }));
  };

  const handleBackToOverview = () => {
    setSelectedFile(null);
    setView(previousView);
  };

  const handleCopy = async () => {
    try {
      const contentToCopy = selectedFile ? fileContents[selectedFile] : code;
      await navigator.clipboard.writeText(contentToCopy);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
      alert('Failed to copy code to clipboard');
    }
  };

  const handleDownload = async () => {
    try {
      const zip = new JSZip();
      
      Object.entries(fileContents).forEach(([path, content]) => {
        const normalizedPath = path.replace(/^\//, '');
        zip.file(normalizedPath, content);
      });
      
      if (Object.keys(fileContents).length === 0 && code) {
        zip.file('index.html', code);
      }
      
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
      alert('Failed to download code');
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
      <EditorToolbar 
        title={selectedFile || "Generated Code"}
        onReset={selectedFile ? handleBackToOverview : onReset}
        onCopy={handleCopy}
        onDownload={handleDownload}
        showBackButton={!!selectedFile}
      />
      {!selectedFile && (
        <ViewControls
          view={view}
          device={device}
          onViewChange={setView}
          onDeviceChange={setDevice}
        />
      )}
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanel 
          defaultSize={panelSize} 
          minSize={200} 
          maxSize={400}
          onResize={setPanelSize}
        >
          <ProjectStructure 
            structure={projectStructure}
            selectedFile={selectedFile}
            onSelect={handleFileSelect}
          />
        </ResizablePanel>
        
        <div className="flex-1">
          {selectedFile ? (
            <FileEditor
              path={selectedFile}
              content={fileContents[selectedFile] || ''}
              onSave={handleFileSave}
              onBack={handleBackToOverview}
            />
          ) : (
            <div className="h-full flex">
              {(view === 'split' || view === 'code') && (
                <div className={`h-full ${view === 'split' ? 'w-1/2' : 'w-full'}`}>
                  <CodePanel code={code} />
                </div>
              )}
              {(view === 'split' || view === 'preview') && (
                <div className={`h-full ${view === 'split' ? 'w-1/2' : 'w-full'}`}>
                  <PreviewPanel
                    code={fileContents['/index.html'] || code}
                    device={device}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="px-4 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-700">
        VITE v5.4.8
      </div>
    </div>
  );
}