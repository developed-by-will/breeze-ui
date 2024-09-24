export const styles = [
  {
    name: 'components',
    label: 'Components'
  }
] as const;

export type Style = (typeof styles)[number];
