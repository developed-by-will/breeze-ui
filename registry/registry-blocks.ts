import { Registry } from '@/registry/schema';

export const blocks: Registry = [
  {
    name: 'login-01',
    description: 'Login 01',
    type: 'registry:block',
    registryDependencies: ['button', 'card', 'input', 'label'],
    dependencies: ['react-icons', 'next-themes'],
    files: [
      {
        path: 'block/login-01/page.tsx',
        target: 'app/login-01/page.tsx',
        type: 'registry:page'
      },
      {
        path: 'block/login-01/components/form.tsx',
        target: 'app/login-01/components/form.tsx',
        type: 'registry:component'
      }
    ],
    category: 'Authentication',
    subcategory: 'Login'
  }
];
