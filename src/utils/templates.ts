interface Template {
  id: string;
  name: string;
  description: string;
  files: {
    path: string;
    content: string;
  }[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export const templates: Record<string, Template> = {
  'react-ts': {
    id: 'react-ts',
    name: 'React + TypeScript',
    description: 'React application with TypeScript support',
    files: [
      {
        path: 'package.json',
        content: JSON.stringify({
          name: 'react-ts-app',
          private: true,
          version: '0.0.0',
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'tsc && vite build',
            preview: 'vite preview'
          }
        }, null, 2)
      },
      {
        path: 'src/App.tsx',
        content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div>Hello World</div>\n  );\n}`
      }
    ],
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@vitejs/plugin-react': '^4.0.0',
      'typescript': '^5.0.0',
      'vite': '^4.0.0'
    }
  },
  'next-ts': {
    id: 'next-ts',
    name: 'Next.js + TypeScript',
    description: 'Next.js application with TypeScript support',
    files: [
      {
        path: 'package.json',
        content: JSON.stringify({
          name: 'next-ts-app',
          private: true,
          version: '0.0.0',
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start'
          }
        }, null, 2)
      },
      {
        path: 'src/app/page.tsx',
        content: `export default function Home() {\n  return (\n    <div>Hello World</div>\n  );\n}`
      }
    ],
    dependencies: {
      'next': '^13.0.0',
      'react': '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@types/node': '^18.0.0',
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      'typescript': '^5.0.0'
    }
  }
};