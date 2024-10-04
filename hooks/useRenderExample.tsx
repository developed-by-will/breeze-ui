import { isValidElement } from 'react';

export default function useRenderExample(example: React.ReactNode | object) {
  if (isValidElement(example)) {
    return example;
  }
}
