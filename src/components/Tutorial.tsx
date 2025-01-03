import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function Tutorial() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">Welcome to AI Site Generator!</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <p>Here's how to use this tool:</p>
          
          <ol className="list-decimal list-inside space-y-2">
            <li>Chat with the AI on the left side to describe your website needs</li>
            <li>The AI will help plan and generate the website code</li>
            <li>View and edit the generated code on the right side</li>
            <li>Download the code or copy it to your clipboard</li>
          </ol>

          <p>You can also drag and drop files into the chat to help the AI understand your requirements better!</p>
          
          <button
            onClick={() => setIsVisible(false)}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}