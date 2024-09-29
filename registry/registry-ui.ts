import { Registry } from '@/registry/schema';

export const ui: Registry = [
  {
    name: 'Breadcrumbs',
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
    name: 'SyntaxHighlighter',
    type: 'registry:ui',
    dependencies: ['react-syntax-highlighter', '@types/react-syntax-highlighter'],
    registryDependencies: ['alert-dialog', 'button'],
    files: [
      {
        path: 'ui/syntaxHighlighter/index.tsx',
        target: 'components/breeze-ui/syntax-highlighter.tsx',
        type: 'registry:page'
      }
    ]
  }
];
