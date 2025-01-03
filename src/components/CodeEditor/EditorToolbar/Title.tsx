import React from 'react';

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {text}
    </h2>
  );
}