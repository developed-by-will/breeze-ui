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
        path: 'block/login-01/formValidations.ts',
        target: 'app/(pages)/login-01/formValidations.ts',
        type: 'registry:component'
      },
      {
        path: 'block/login-01/requestHandler.ts',
        target: 'lib/breeze-ui/requestHandler.ts',
        type: 'registry:component'
      }
    ],
    category: 'Authentication',
    subcategory: 'Login'
  },
  {
    name: 'data-table',
    description: 'Data Table',
    type: 'registry:block',
    registryDependencies: [
      'checkbox',
      'select',
      'dropdown-menu',
      'table',
      'skeleton',
      'input',
      'button'
    ],
    dependencies: ['@tanstack/react-table', 'lucide-react'],
    files: [
      {
        path: 'block/data-table/data-table.tsx',
        target: 'components/breeze-ui/data-table/data-table.tsx',
        type: 'registry:component'
      },
      {
        path: 'block/data-table/index.ts',
        target: 'components/breeze-ui/data-table/index.ts',
        type: 'registry:component'
      },
      {
        path: 'block/data-table/types.ts',
        target: 'components/breeze-ui/data-table/types.ts',
        type: 'registry:component'
      },
      {
        path: 'block/data-table/components/column-header.tsx',
        target: 'components/breeze-ui/data-table/components/column-header.tsx',
        type: 'registry:component'
      },
      {
        path: 'block/data-table/components/pagination.tsx',
        target: 'components/breeze-ui/data-table/components/pagination.tsx',
        type: 'registry:component'
      },
      {
        path: 'block/data-table/components/view-options.tsx',
        target: 'components/breeze-ui/data-table/components/view-options.tsx',
        type: 'registry:component'
      }
    ],
    category: 'Tables',
    subcategory: 'Data Management'
  }
];
