import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface FileEditorProps {
  path: string;
  content: string;
  onSave: (path: string, content: string) => void;
}

export default function FileEditor({ path, content, onSave }: FileEditorProps) {
  const [editableContent, setEditableContent] = useState(content);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setEditableContent(content);
    setIsDirty(false);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave(path, editableContent);
    setIsDirty(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700">
        <span className="text-sm font-mono">{path}</span>
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
      <textarea
        value={editableContent}
        onChange={handleChange}
        className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-gray-800 border-0 resize-none focus:ring-0 scrollbar-thin"
        spellCheck={false}
      />
    </div>
  );
}