import { Registry } from '@/registry/schema';

export const blocks: Registry = [
  {
    name: 'login-01',
    type: 'registry:block',
    dependencies: ['react-icons'],
    registryDependencies: ['button', 'card', 'input', 'label'],
    files: [
      {
        path: 'block/login-01/page.tsx',
        target: 'app/login-01/page.tsx',
        type: 'registry:page'
      },
      {
        path: 'block/login-01/components/form.tsx',
        type: 'registry:component'
      }
    ],
    category: 'Authentication',
    subcategory: 'Login'
  }
];
