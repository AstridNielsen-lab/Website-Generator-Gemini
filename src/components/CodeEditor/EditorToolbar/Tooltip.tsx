import React from 'react';

interface TooltipProps {
  label: string;
}

export default function Tooltip({ label }: TooltipProps) {
  return (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
      <div className="px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap shadow-lg">
        {label}
      </div>
    </div>
  );
}