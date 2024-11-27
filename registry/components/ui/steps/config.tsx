/* For the preview */
import codeSource from '!!raw-loader!./index.tsx';
import {
  componentsMetadata,
  ComponentType,
  REGISTRY_BASE_URL
} from '@/registry/components/metadata';
import Steps from '.';

export const component = codeSource;

/* For the example */
const stepsArray = [
  {
    title: 'Step one',
    content: 'This can be either a string or a JSX element!'
  },
  {
    title: '2nd title',
    content: 'Content must be provided'
  }
];

const example = (
  <div className="ps-10 pt-10">
    <Steps steps={stepsArray} />
  </div>
);
const implementation_1 = `const stepsArray = [
  {
    title: 'Step one',
    content: 'This can be either a string or a JSX element!'
  },
  {
    title: '2nd title',
    content: 'Content must be provided'
  }
];

return (
    <Steps steps={stepsArray} />
)
`;

export const config: ComponentType = {
  type: 'component',
  slug: componentsMetadata.steps.slug,
  name: componentsMetadata.steps.name,
  title: componentsMetadata.steps.title,
  description: componentsMetadata.steps.description,
  codeSnippet: component,
  example,
  implementation_1,
  addCommand: `npx shadcn add ${REGISTRY_BASE_URL}/${componentsMetadata.steps.name}.json`
};
