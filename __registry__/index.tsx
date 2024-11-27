// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from 'react';

export const Index: Record<string, unknown> = {
  components: {
    breadcrumbs: {
      name: 'breadcrumbs',
      type: 'registry:ui',
      registryDependencies: ['breadcrumb'],
      files: ['registry/components/ui/breadcrumbs/index.tsx'],
      component: React.lazy(() => import('@/registry/components/ui/breadcrumbs/index.tsx')),
      source: '',
      category: 'undefined',
      subcategory: 'undefined',
      chunks: []
    },
    'syntax-highlighter': {
      name: 'syntax-highlighter',
      type: 'registry:ui',
      registryDependencies: ['alert-dialog', 'button'],
      files: ['registry/components/ui/syntaxHighlighter/index.tsx'],
      component: React.lazy(() => import('@/registry/components/ui/syntaxHighlighter/index.tsx')),
      source: '',
      category: 'undefined',
      subcategory: 'undefined',
      chunks: []
    },
    code: {
      name: 'code',
      type: 'registry:ui',
      registryDependencies: undefined,
      files: ['registry/components/ui/code/index.tsx'],
      component: React.lazy(() => import('@/registry/components/ui/code/index.tsx')),
      source: '',
      category: 'undefined',
      subcategory: 'undefined',
      chunks: []
    },
    steps: {
      name: 'steps',
      type: 'registry:ui',
      registryDependencies: undefined,
      files: ['registry/components/ui/steps/index.tsx'],
      component: React.lazy(() => import('@/registry/components/ui/steps/index.tsx')),
      source: '',
      category: 'undefined',
      subcategory: 'undefined',
      chunks: []
    },
    toast: {
      name: 'toast',
      type: 'registry:ui',
      registryDependencies: undefined,
      files: ['registry/components/ui/toast/index.tsx'],
      component: React.lazy(() => import('@/registry/components/ui/toast/index.tsx')),
      source: '',
      category: 'undefined',
      subcategory: 'undefined',
      chunks: []
    },
    'login-01': {
      name: 'login-01',
      type: 'registry:block',
      registryDependencies: ['button', 'card', 'input', 'label'],
      files: [
        'registry/components/block/login-01/page.tsx',
        'registry/components/block/login-01/components/form.tsx',
        'registry/components/block/login-01/components/providerDetails.tsx'
      ],
      component: React.lazy(() => import('@/registry/components/block/login-01/page.tsx')),
      source: '__registry__/components/block/login-01/page.tsx',
      category: 'Authentication',
      subcategory: 'Login',
      chunks: []
    },
    utils: {
      name: 'utils',
      type: 'registry:lib',
      registryDependencies: undefined,
      files: ['registry/components/lib/utils.ts'],
      component: React.lazy(() => import('@/registry/components/lib/utils.ts')),
      source: '',
      category: 'undefined',
      subcategory: 'undefined',
      chunks: []
    },
    'use-toast': {
      name: 'use-toast',
      type: 'registry:hook',
      registryDependencies: undefined,
      files: ['registry/components/ui/toast/hooks/use-toast.ts'],
      component: React.lazy(() => import('@/registry/components/ui/toast/hooks/use-toast.ts')),
      source: '',
      category: 'undefined',
      subcategory: 'undefined',
      chunks: []
    },
    'use-toast': {
      name: 'use-toast',
      type: 'registry:hook',
      registryDependencies: undefined,
      files: ['registry/components/ui/toast/hooks/use-toast.ts'],
      component: React.lazy(() => import('@/registry/components/ui/toast/hooks/use-toast.ts')),
      source: '',
      category: 'undefined',
      subcategory: 'undefined',
      chunks: []
    }
  }
};
