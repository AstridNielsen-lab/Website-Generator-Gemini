import React from 'react';
import { Folder, File, ChevronDown, ChevronRight } from 'lucide-react';
import { ProjectFolder } from '../../types';

interface ProjectStructureProps {
  structure: ProjectFolder;
  onSelect: (path: string) => void;
}

export default function ProjectStructure({ structure, onSelect }: ProjectStructureProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleFolder = () => setIsOpen(!isOpen);

  return (
    <div className="text-sm">
      <div 
        className="flex items-center space-x-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
        onClick={toggleFolder}
      >
        <button className="p-1">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        <Folder className="w-4 h-4 text-blue-500" />
        <span>{structure.name}</span>
      </div>
      
      {isOpen && (
        <div className="ml-4">
          {structure.children?.map((item, index) => (
            <div key={index}>
              {item.type === 'folder' ? (
                <ProjectStructure structure={item} onSelect={onSelect} />
              ) : (
                <div 
                  className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer ml-5"
                  onClick={() => onSelect(item.path)}
                >
                  <File className="w-4 h-4 text-gray-500" />
                  <span>{item.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}