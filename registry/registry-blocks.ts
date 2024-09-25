import { Registry } from '@/registry/schema';

export const blocks: Registry = [
  {
    name: 'login-01',
    description: 'Login 01',
    type: 'registry:block',
    registryDependencies: ['button', 'card', 'input', 'label'],
    dependencies: ['react-icons'],
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
      },
      {
        path: 'block/login-01/pexels-nietjuh-1906440.jpg',
        target: 'app/login-01/pexels-nietjuh-1906440.jpg',
        type: 'registry:example'
      },
      {
        path: 'block/login-01/generic-company-logo.png',
        target: 'app/login-01/generic-company-logo.png',
        type: 'registry:example'
      }
    ],
    category: 'Authentication',
    subcategory: 'Login'
  }
];
