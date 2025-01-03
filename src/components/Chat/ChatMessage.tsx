import React from 'react';
import type { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-lg p-3 ${
          message.role === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700'
        } shadow-sm`}
      >
        <p className="whitespace-pre-wrap text-sm md:text-base">{message.content}</p>
      </div>
    </div>
  );
}