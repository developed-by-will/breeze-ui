export const componentsMetadata = {
  breadcrumbs: {
    slug: 'breadcrumbs',
    name: 'breadcrumbs',
    title: 'Breadcrumbs',
    description: 'Displays the path to the current resource using a hierarchy of links.'
  },
  codeSnippet: {
    slug: 'code-snippet',
    name: 'codeSnippet',
    title: 'Code Highlighter',
    description:
      'Provides syntax highlighting and copy to keyboard functionality with code wrapping for long lines.'
  },
  login01: {
    slug: 'login-01',
    name: 'login-01',
    title: 'Login 01',
    description: 'A login page with multiple authentication providers.'
  }
} as const;

// Dynamically create union types based on the properties of the componentsMetadata object
export type ComponentSlug = (typeof componentsMetadata)[keyof typeof componentsMetadata]['slug'];
export type ComponentName = (typeof componentsMetadata)[keyof typeof componentsMetadata]['name'];
export type ComponentTitle = (typeof componentsMetadata)[keyof typeof componentsMetadata]['title'];
export type ComponentDescription =
  (typeof componentsMetadata)[keyof typeof componentsMetadata]['description'];

export type ComponentType = {
  slug: ComponentSlug;
  name: ComponentName;
  title: ComponentTitle;
  description: ComponentDescription;
  codeSnippet: string;
  example: React.ReactNode;
  implementation_1: string;
  implementation_2?: string;
  implementation_3?: string;
  implementation_4?: string;
  addCommand: string;
  type: 'component' | 'block';
};
