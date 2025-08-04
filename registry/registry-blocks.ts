import { Registry } from '@/registry/schema';

export const blocks: Registry = [
  {
    name: 'login-01',
    description: 'Login 01',
    type: 'registry:block',
    registryDependencies: ['button', 'card', 'input', 'label', 'form', 'badge'],
    dependencies: [
      'react-icons',
      'next-themes',
      '@tanstack/query-async-storage-persister',
      '@tanstack/react-query',
      '@tanstack/react-query-persist-client',
      'react-hook-form',
      '@hookform/resolvers',
      'zod'
    ],
    files: [
      {
        path: 'block/login-01/page.tsx',
        target: 'app/(pages)/login-01/index.tsx',
        type: 'registry:page'
      },
      {
        path: 'block/login-01/components/form.tsx',
        target: 'app/(pages)/login-01/components/form.tsx',
        type: 'registry:component'
      },
      {
        path: 'block/login-01/components/providerDetails.tsx',
        target: 'app/(pages)/login-01/components/providerDetails.tsx',
        type: 'registry:component'
      },
      {
        path: 'block/login-01/constants.ts',
        target: 'app/(pages)/login-01/constants.ts',
        type: 'registry:component'
      },
      {
        path: 'block/login-01/formValidations.ts',
        target: 'app/(pages)/login-01/formValidations.ts',
        type: 'registry:component'
      },
      {
        path: 'lib/breeze-ui/tanstackMutationHandler.ts',
        target: 'lib/breeze-ui/tanstackMutationHandler.ts',
        type: 'registry:component'
      }
    ],
    category: 'Authentication',
    subcategory: 'Login'
  }
];
