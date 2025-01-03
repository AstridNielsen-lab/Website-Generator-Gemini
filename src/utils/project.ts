import { Project, ProjectFile } from '../types';

export async function createProject(template: string, name: string): Promise<Project> {
  return {
    id: crypto.randomUUID(),
    name,
    template,
    files: [],
    dependencies: {},
    devDependencies: {}
  };
}

export async function addProjectFile(project: Project, file: ProjectFile): Promise<Project> {
  return {
    ...project,
    files: [...project.files, file]
  };
}

export async function updateProjectFile(project: Project, path: string, content: string): Promise<Project> {
  const files = project.files.map(file => 
    file.path === path ? { ...file, content } : file
  );
  return { ...project, files };
}

export async function addDependency(project: Project, name: string, version: string, isDev = false): Promise<Project> {
  if (isDev) {
    return {
      ...project,
      devDependencies: { ...project.devDependencies, [name]: version }
    };
  }
  return {
    ...project,
    dependencies: { ...project.dependencies, [name]: version }
  };
}