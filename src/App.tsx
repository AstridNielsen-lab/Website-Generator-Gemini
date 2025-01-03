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

  const handleCodeGenerated = async (message: string, response: string, code: string) => {
    setGeneratedCode(code);
  };

  const handleReset = () => {
    setGeneratedCode('');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
        <Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
        
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-1/2 h-full border-b md:border-b-0 md:border-r dark:border-gray-700 overflow-hidden">
            <Chat onCodeGenerated={handleCodeGenerated} />
          </div>
          <div className="w-full md:w-1/2 h-full overflow-hidden">
            <CodeEditor code={generatedCode} onReset={handleReset} />
          </div>
        </main>

        <Tutorial />
      </div>
    </div>
  );
}