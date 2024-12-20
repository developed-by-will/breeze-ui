/* For the preview */
import codeSource from '!!raw-loader!./index.tsx';
import {
  componentsMetadata,
  ComponentType,
  REGISTRY_BASE_URL
} from '@/registry/components/metadata';
import Code from '.';

export const component = codeSource;

/* For the example */
const example = (
  <p className="font-medium pb-2">
    This an example on how to <Code>highlight some text</Code> and has you can see it's really easy!
  </p>
);
const implementation_1 = `<p className="font-medium pb-2">
    This an example on how to <Code>highlight some text</Code> and has you can see it's really easy!
</p>
`;

export const config: ComponentType = {
  type: 'component',
  slug: componentsMetadata.code.slug,
  name: componentsMetadata.code.name,
  title: componentsMetadata.code.title,
  description: componentsMetadata.code.description,
  codeSnippet: component,
  example,
  implementation_1,
  addCommand: `npx shadcn add ${REGISTRY_BASE_URL}/${componentsMetadata.code.name}.json`
};
