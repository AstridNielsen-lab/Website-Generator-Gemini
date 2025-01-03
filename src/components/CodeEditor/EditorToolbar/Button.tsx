```typescript
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive: boolean;
  color: string;
}

export default function Button({ 
  icon: Icon,
  label,
  onClick,
  isActive,
  color
}: ButtonProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative p-2 rounded-lg transition-all duration-200 ${
          isActive
            ? `bg-${color}-100 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-300`
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label={label}
      >
        <Icon className="w-5 h-5" />
      </button>
      
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </div>
  );
}
```