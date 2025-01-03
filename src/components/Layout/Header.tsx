import React from 'react';
import { Moon, Sun, Code2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <Code2 className="w-6 h-6 text-blue-600" />
        <div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {siteConfig.name}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            by {siteConfig.contact.developer}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Contact
        </a>
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}