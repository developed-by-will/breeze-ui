import { Registry } from '@/registry/schema';

export const ui: Registry = [
  {
    name: 'breadcrumbs',
    type: 'registry:ui',
    registryDependencies: ['breadcrumb'],
    files: [
      {
        path: 'ui/breadcrumbs/index.tsx',
        target: 'components/breeze-ui/breadcrumbs.tsx',
        type: 'registry:ui'
      }
    ]
  },
  {
    name: 'syntax-highlighter',
    type: 'registry:ui',
    dependencies: ['react-syntax-highlighter', '@types/react-syntax-highlighter'],
    registryDependencies: ['alert-dialog', 'button'],
    files: [
      {
        path: 'ui/syntaxHighlighter/index.tsx',
        target: 'components/breeze-ui/syntax-highlighter.tsx',
        type: 'registry:ui'
      }
    ]
  },
  {
    name: 'code',
    type: 'registry:ui',
    files: [
      {
        path: 'ui/code/index.tsx',
        target: 'components/breeze-ui/code.tsx',
        type: 'registry:ui'
      }
    ]
  }
];
