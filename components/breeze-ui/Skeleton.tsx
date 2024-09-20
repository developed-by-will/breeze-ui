type PropsType = {
  classes: string;
  bgColor?: string;
};

export default function Skeleton(props: Readonly<PropsType>) {
  const { bgColor = 'bg-primary', classes } = props;

  return <div className={`${bgColor} rounded animate-pulse flex ${classes}`} />;
}

/* For the preview */
import jsxToString from 'react-element-to-jsx-string';
import { componentsMetadata, ComponentType } from './config';

const codeSnippet = `type PropsType = {
      classes: string;
      bgColor?: string;
    };
    
    export default function Skeleton(props: Readonly<PropsType>) {
      const { bgColor = "bg-primary", classes } = props;
    
      return <div className=\`\${bgColor} rounded animate-pulse flex \${classes}\` />;
    }`;

/* For the example */
const example = (
  <div className="flex items-center space-x-4">
    <Skeleton classes="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton classes="h-4 w-[250px]" />
      <Skeleton classes="h-4 w-[200px]" />
    </div>
  </div>
);

const exampleAsString = `const isFetching = true;
    
{isFetching && ${jsxToString(example)}}`;

export const config: ComponentType = {
  slug: componentsMetadata.skeleton.slug,
  name: componentsMetadata.skeleton.name,
  title: componentsMetadata.skeleton.title,
  description: componentsMetadata.skeleton.description,
  codeSnippet,
  example,
  implementation_1: exampleAsString,
  dependencies: 'npx shadcn@latest add skeleton'
};
