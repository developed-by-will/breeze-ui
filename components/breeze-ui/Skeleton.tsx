type PropsType = {
  classes: string;
  bgColor?: string;
};

export default function Skeleton(props: Readonly<PropsType>) {
  const { bgColor = "bg-primary", classes } = props;

  return <div className={`${bgColor} rounded animate-pulse flex ${classes}`} />;
}

/* For the preview */
import { ComponentType } from "@/types/componentType";
import jsxToString from "react-element-to-jsx-string";

const name = "Skeleton";
const description = "Use to show a placeholder while content is loading.";

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
  name,
  description,
  codeSnippet,
  example,
  implementation_1: exampleAsString,
  dependencies: "npx shadcn@latest add skeleton",
};
