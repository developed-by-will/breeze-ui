/* For the preview */
import codeSource from '!!raw-loader!./index.tsx';
import { componentsMetadata, ComponentType } from '@/registry/components/ui/metadata';
import Breadcrumbs, { BreadcrumbType } from '.';

export const codeSnippet = codeSource;

/* For the example */
const breadcrumbs: BreadcrumbType[] = [
  { text: 'Admin Dashboard', url: '/' },
  { text: 'Resources' },
  { text: `Create Resource` }
];

const example = <Breadcrumbs breadcrumbs={breadcrumbs} position="justify-center" />;

const exampleAsString = `const breadcrumbs: BreadcrumbType[] = [
    { text: "Admin Dashboard", url: "/" },
    { text: "Resources" },
    { text: "Create Resource" },
];
    
{breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} position="justify-center" />}
`;

export const config: ComponentType = {
  type: 'component',
  slug: componentsMetadata.breadcrumbs.slug,
  name: componentsMetadata.breadcrumbs.name,
  title: componentsMetadata.breadcrumbs.title,
  description: componentsMetadata.breadcrumbs.description,
  codeSnippet,
  example,
  implementation_1: exampleAsString,
  addCommand: `npx shadcn add https://breeze-ui.wilsongomes.me/public/registry/components/${componentsMetadata.breadcrumbs.name}.json`
};
