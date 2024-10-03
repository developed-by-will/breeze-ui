import { isValidElement } from 'react';

export default function useRenderExample(example: React.ReactNode) {
  if (isValidElement(example)) {
    return example;
  }
}
