import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Chat from './components/Chat/Chat';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Tutorial from './components/Tutorial';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleReset = () => {
    setGeneratedCode('');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
        <Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
        
        <main className="flex-1 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r dark:border-gray-700">
            <Chat onCodeGenerated={setGeneratedCode} />
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full">
            <CodeEditor code={generatedCode} onReset={handleReset} />
          </div>
        </main>

        <Tutorial />
      </div>
    </div>
  );
}