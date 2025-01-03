export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export interface ProjectFile {
  name: string;
  type: 'file';
  path: string;
}

export interface ProjectFolder {
  name: string;
  type: 'folder';
  children?: (ProjectFolder | ProjectFile)[];
}

export interface Project {
  id: string;
  name: string;
  template: string;
  files: ProjectFile[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export interface DeploymentConfig {
  provider: 'netlify';
  buildCommand: string;
  outputDir: string;
  environmentVariables: Record<string, string>;
}