type PropsType = {
  children: string;
};

export default function Code(props: Readonly<PropsType>) {
  const { children } = props;

  return (
    <code className="relative rounded bg-primary/80 text-primary-foreground px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {children}
    </code>
  );
}
