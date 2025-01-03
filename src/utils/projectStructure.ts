import { ProjectFolder, ProjectFile } from '../types';

// Create folder structure from path
function createFolderStructure(path: string): string[] {
  return path.split('/').filter(Boolean);
}

// Find or create folder in structure
function findOrCreateFolder(
  structure: ProjectFolder,
  folderName: string
): ProjectFolder {
  const existingFolder = structure.children?.find(
    child => child.type === 'folder' && child.name === folderName
  ) as ProjectFolder | undefined;
  
  if (existingFolder) {
    return existingFolder;
  }
  
  const newFolder: ProjectFolder = {
    name: folderName,
    type: 'folder',
    children: []
  };
  
  structure.children = structure.children || [];
  structure.children.push(newFolder);
  
  return newFolder;
}

// Add file to structure
export function addFileToProject(
  structure: ProjectFolder,
  file: { path: string; content: string }
): ProjectFolder {
  const pathParts = createFolderStructure(file.path);
  const fileName = pathParts.pop() || 'untitled';
  
  let currentFolder = structure;
  
  // Create nested folders
  for (const folderName of pathParts) {
    currentFolder = findOrCreateFolder(currentFolder, folderName);
  }
  
  // Create or update file
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