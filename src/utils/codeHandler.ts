import { ProjectFolder, ProjectFile } from '../types';
import { parseCodeBlock } from './fileParser';

export function handleGeneratedCode(code: string, projectStructure: ProjectFolder): {
  updatedStructure: ProjectFolder;
  files: Record<string, string>;
} {
  const parsedFiles = parseCodeBlock(code);
  let updatedStructure = { ...projectStructure };
  const fileContents: Record<string, string> = {};

  parsedFiles.forEach(file => {
    // Add file to project structure
    updatedStructure = addFileToStructure(updatedStructure, file);
    // Store file contents
    fileContents[file.path] = file.content;
  });

  return {
    updatedStructure,
    files: fileContents
  };
}

function addFileToStructure(
  structure: ProjectFolder,
  file: { path: string; content: string }
): ProjectFolder {
  const pathParts = file.path.split('/').filter(Boolean);
  const fileName = pathParts.pop() || 'untitled';
  
  let currentFolder = structure;
  
  // Create folders if needed
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