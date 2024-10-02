type StepsType = {
  title: string;
  content: string | JSX.Element;
};

type PropsType = {
  steps: StepsType[];
};

export default function Steps(props: Readonly<PropsType>) {
  const { steps } = props;

  return (
    <ol className="relative border-l border-gray-200">
      {steps.map((step, index) => (
        <li key={index} className="mb-10 ml-6">
          <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white bg-primary">
            <span className="text-white">{index + 1}</span>
          </span>
          <h3 className="font-medium leading-tight mb-4">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.content}</p>
        </li>
      ))}
    </ol>
  );
}
