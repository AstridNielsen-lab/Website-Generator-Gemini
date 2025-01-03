```typescript
import React, { useState } from 'react';
import { Download, Copy, RefreshCw } from 'lucide-react';
import Button from './Button';

interface EditorToolbarProps {
  title: string;
  onReset: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

export default function EditorToolbar({ 
  title, 
  onReset,
  onCopy,
  onDownload 
}: EditorToolbarProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = async (action: string, callback: () => void) => {
    setActiveButton(action);
    await callback();
    setTimeout(() => setActiveButton(null), 500);
  };

  const buttons = [
    {
      id: 'copy',
      icon: Copy,
      label: 'Copy to Clipboard',
      onClick: () => handleButtonClick('copy', onCopy),
      color: 'blue'
    },
    {
      id: 'download',
      icon: Download,
      label: 'Download as ZIP',
      onClick: () => handleButtonClick('download', onDownload),
      color: 'green'
    },
    {
      id: 'reset',
      icon: RefreshCw,
      label: 'Reset Editor',
      onClick: () => handleButtonClick('reset', onReset),
      color: 'red'
    }
  ];

  return (
    <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>
      
      <div className="flex items-center gap-2">
        {buttons.map(button => (
          <Button
            key={button.id}
            icon={button.icon}
            label={button.label}
            onClick={button.onClick}
            isActive={activeButton === button.id}
            color={button.color}
          />
        ))}
      </div>
    </div>
  );
}
```