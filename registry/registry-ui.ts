import { Registry } from '@/registry/schema';

export const ui: Registry = [
  {
    name: 'breadcrumbs',
    type: 'registry:ui',
    dependencies: [''],
    registryDependencies: ['breadcrumb'],
    files: [
      {
        path: 'ui/breadcrumbs/index.tsx',
        target: 'components/breeze-ui/breadcrumbs.tsx',
        type: 'registry:page'
      }
    ]
  },
  {
    name: 'codeSnippet',
    type: 'registry:ui',
    dependencies: ['react-syntax-highlighter', '@types/react-syntax-highlighter'],
    registryDependencies: ['alert-dialog', 'button'],
    files: [
      {
        path: 'ui/codeSnippet/index.tsx',
        target: 'components/breeze-ui/codeSnippet.tsx',
        type: 'registry:page'
      }
    ]
  }
];
