import React, { useState, useCallback } from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultSize: number;
  minSize?: number;
  maxSize?: number;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export default function ResizablePanel({
  children,
  defaultSize,
  minSize = 100,
  maxSize = 800,
  direction = 'horizontal',
  className = '',
}: ResizablePanelProps) {
  const [size, setSize] = useState(defaultSize);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const startSize = size;
    const startPos = direction === 'horizontal' ? e.clientX : e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
      const diff = currentPos - startPos;
      const newSize = Math.min(Math.max(startSize + diff, minSize), maxSize);
      setSize(newSize);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [size, minSize, maxSize, direction]);

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ 
        [direction === 'horizontal' ? 'width' : 'height']: size,
        cursor: isResizing ? (direction === 'horizontal' ? 'col-resize' : 'row-resize') : 'default'
      }}
    >
      {children}
      <div
        className={`absolute ${
          direction === 'horizontal'
            ? 'right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500'
            : 'bottom-0 left-0 h-1 w-full cursor-row-resize hover:bg-blue-500'
        } opacity-0 hover:opacity-100 transition-opacity`}
        onMouseDown={startResizing}
      />
    </div>
  );
}