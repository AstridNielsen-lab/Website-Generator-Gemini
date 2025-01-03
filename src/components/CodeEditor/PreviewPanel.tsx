import React from 'react';

interface PreviewPanelProps {
  code: string;
  device: 'desktop' | 'tablet' | 'mobile';
  className?: string;
}

const deviceSizes = {
  desktop: 'w-full h-full',
  tablet: 'w-[768px] h-[1024px]',
  mobile: 'w-[375px] h-[667px]',
};

export default function PreviewPanel({ code, device, className = '' }: PreviewPanelProps) {
  return (
    <div className={`overflow-auto p-4 flex items-start justify-center ${className}`}>
      <div className={`${deviceSizes[device]} bg-white shadow-lg rounded-lg overflow-hidden`}>
        <iframe
          srcDoc={code}
          className="w-full h-full border-0"
          title="Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}