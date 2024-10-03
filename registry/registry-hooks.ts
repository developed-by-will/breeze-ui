import { Registry } from '@/registry/schema';

export const hooks: Registry = [
  {
    name: 'use-toast',
    type: 'registry:hook',
    files: [
      {
        path: 'hooks/use-toast.ts',
        target: 'components/breeze-ui/hooks/use-toast.ts',
        type: 'registry:hook'
      }
    ]
  }
];
