import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center space-x-2 max-w-3xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Describe your website needs..."
          className="flex-1 p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white disabled:opacity-50 hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
}