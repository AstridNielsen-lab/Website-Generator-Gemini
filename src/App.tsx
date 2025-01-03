import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useHistory } from './hooks/useHistory';
import Header from './components/Layout/Header';
import Chat from './components/Chat/Chat';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Tutorial from './components/Tutorial';
import AuthModal from './components/Auth/AuthModal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const { user, isLoading: isAuthLoading } = useAuth();
  const { addInteraction } = useHistory();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleCodeGenerated = async (message: string, response: string, code: string) => {
    setGeneratedCode(code);
    if (user) {
      await addInteraction({ message, response, code });
    }
  };

  const handleReset = () => {
    setGeneratedCode('');
  };

  if (isAuthLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
        <Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
        
        {!user ? (
          <AuthModal />
        ) : (
          <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/2 h-full border-b md:border-b-0 md:border-r dark:border-gray-700 overflow-hidden">
              <Chat onCodeGenerated={handleCodeGenerated} />
            </div>
            <div className="w-full md:w-1/2 h-full overflow-hidden">
              <CodeEditor code={generatedCode} onReset={handleReset} />
            </div>
          </main>
        )}

        <Tutorial />
      </div>
    </div>
  );
}