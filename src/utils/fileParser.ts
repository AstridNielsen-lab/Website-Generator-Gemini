import type { ProjectFile } from '../types';

interface ParsedFile {
  path: string;
  content: string;
  language: string;
}

export function parseCodeBlock(code: string): ParsedFile[] {
  const files: ParsedFile[] = [];
  const fileRegex = /\/\/\s*([^\n]+)\n```(\w+)?\n([\s\S]*?)```/g;
  
  let match;
  while ((match = fileRegex.exec(code)) !== null) {
    const [, path, language = 'text', content] = match;
    
    if (path && content) {
      files.push({
        path: path.trim(),
        content: content.trim(),
        language: language.trim()
      });
    }
  }
  
  // If no structured blocks found, try to parse as a single file
  if (files.length === 0) {
    const singleFileRegex = /```(\w+)?\n([\s\S]*?)```/;
    const singleMatch = code.match(singleFileRegex);
    
    if (singleMatch) {
      const [, language = 'html', content] = singleMatch;
      files.push({
        path: '/index.html',
        content: content.trim(),
        language: language.trim()
      });
    }
  }
  
  return files;
}