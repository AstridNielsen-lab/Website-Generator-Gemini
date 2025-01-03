import type { ProjectFolder } from '../types';

export function generateProjectStructure(code: string): ProjectFolder {
  // Base structure
  const structure: ProjectFolder = {
    name: 'project',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'components',
            type: 'folder',
            children: []
          },
          {
            name: 'styles',
            type: 'folder',
            children: [
              {
                name: 'main.css',
                type: 'file',
                path: '/src/styles/main.css'
              }
            ]
          },
          {
            name: 'App.js',
            type: 'file',
            path: '/src/App.js'
          }
        ]
      },
      {
        name: 'public',
        type: 'folder',
        children: [
          {
            name: 'index.html',
            type: 'file',
            path: '/public/index.html'
          },
          {
            name: 'assets',
            type: 'folder',
            children: [
              {
                name: 'images',
                type: 'folder',
                children: []
              }
            ]
          }
        ]
      }
    ]
  };

  // Parse code to detect components and add them to structure
  const componentMatches = code.match(/class\s+(\w+)\s+extends\s+React\.Component|function\s+(\w+)\s*\(/g);
  if (componentMatches) {
    componentMatches.forEach(match => {
      const componentName = match.match(/\b\w+\b/g)?.[1];
      if (componentName && componentName !== 'App') {
        const componentsFolder = structure.children
          ?.find(child => child.name === 'src')
          ?.children?.find(child => child.name === 'components');
        
        if (componentsFolder?.children) {
          componentsFolder.children.push({
            name: `${componentName}.js`,
            type: 'file',
            path: `/src/components/${componentName}.js`
          });
        }
      }
    });
  }

  return structure;
}