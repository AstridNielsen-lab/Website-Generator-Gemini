import React, { useState } from 'react';
import { Save, MessageSquare, X } from 'lucide-react';
import FileChat from './FileChat';

interface FileEditorProps {
  path: string;
  content: string;
  onSave: (path: string, content: string) => void;
}

export default function FileEditor({ path, content, onSave }: FileEditorProps) {
  const [editableContent, setEditableContent] = useState(content);
  const [isDirty, setIsDirty] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave(path, editableContent);
    setIsDirty(false);
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700">
          <span className="text-sm font-mono">{path}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              title="Toggle chat"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={`p-1 rounded ${
                isDirty
                  ? 'text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900'
                  : 'text-gray-400'
              }`}
              title="Save changes"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>
        <textarea
          value={editableContent}
          onChange={handleChange}
          className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-gray-800 border-0 resize-none focus:ring-0 scrollbar-thin"
          spellCheck={false}
        />
      </div>
      
      {isChatOpen && (
        <div className="w-80 border-l dark:border-gray-700 flex flex-col">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
            <span className="text-sm font-medium">File Chat</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <FileChat filePath={path} />
        </div>
      )}
    </div>
  );
}