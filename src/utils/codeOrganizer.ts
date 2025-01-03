import { ProjectFile, ProjectFolder } from '../types';

interface ParsedFile {
  path: string;
  content: string;
  language: string;
}

export function parseGeneratedCode(code: string): ParsedFile[] {
  const files: ParsedFile[] = [];
  const fileRegex = /```(\w+)?\s*(?:\/\/\s*([^\n]+))?\n([\s\S]*?)```/g;
  
  let match;
  while ((match = fileRegex.exec(code)) !== null) {
    const language = match[1] || 'text';
    const filePath = match[2]?.trim() || determineFilePath(language, match[3]);
    const content = match[3].trim();
    
    files.push({
      path: filePath,
      content,
      language
    });
  }
  
  return files;
}

function determineFilePath(language: string, content: string): string {
  // Detect file type and suggest appropriate path
  switch (language) {
    case 'html':
      return '/public/index.html';
    case 'css':
      return '/src/styles/main.css';
    case 'javascript':
    case 'js':
      if (content.includes('React')) {
        return '/src/components/NewComponent.jsx';
      }
      return '/src/utils/helper.js';
    case 'typescript':
    case 'ts':
      if (content.includes('React')) {
        return '/src/components/NewComponent.tsx';
      }
      return '/src/utils/helper.ts';
    default:
      return '/src/generated.txt';
  }
}

export function addFileToStructure(
  structure: ProjectFolder,
  file: ParsedFile
): ProjectFolder {
  const pathParts = file.path.split('/').filter(Boolean);
  const fileName = pathParts.pop() || 'untitled';
  
  let currentFolder = structure;
  
  // Create folders if they don't exist
  for (const folderName of pathParts) {
    let folder = currentFolder.children?.find(
      child => child.type === 'folder' && child.name === folderName
    ) as ProjectFolder | undefined;
    
    if (!folder) {
      folder = {
        name: folderName,
        type: 'folder',
        children: []
      };
      currentFolder.children = currentFolder.children || [];
      currentFolder.children.push(folder);
    }
    
    currentFolder = folder;
  }
  
  // Add or update file
  const newFile: ProjectFile = {
    name: fileName,
    type: 'file',
    path: file.path
  };
  
  currentFolder.children = currentFolder.children || [];
  const existingFileIndex = currentFolder.children.findIndex(
    child => child.type === 'file' && child.name === fileName
  );
  
  if (existingFileIndex >= 0) {
    currentFolder.children[existingFileIndex] = newFile;
  } else {
    currentFolder.children.push(newFile);
  }
  
  return structure;
}