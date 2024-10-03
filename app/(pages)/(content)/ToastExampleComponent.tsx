'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/registry/components/hooks/use-toast';
import { ComponentType } from '@/registry/components/metadata';
import { useEffect } from 'react';

type ToastExampleProps = {
  component: ComponentType;
};

export default function ToastExampleComponent({ component }: ToastExampleProps) {
  const { toast } = useToast();

  const toastExample = component.example as {
    title?: string;
    description: string;
    variant: 'default' | 'destructive' | 'success' | 'warning' | 'info';
    duration: number;
    action: JSX.Element;
  };

  const toastExample_2 = component.example_2 as {
    title: string;
    description: string;
    duration: number;
    action: JSX.Element;
  };

  useEffect(() => {
    if (!component) return;

    toast({
      title: toastExample.title,
      description: toastExample.description,
      variant: toastExample.variant,
      duration: toastExample.duration,
      action: toastExample.action
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="default"
        onClick={() => {
          toast({
            description: toastExample_2.description
          });
        }}
      >
        Simple Toast
      </Button>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: toastExample_2.title,
            description: toastExample_2.description,
            variant: 'destructive',
            duration: toastExample_2.duration,
            action: toastExample_2.action
          });
        }}
      >
        Destructive
      </Button>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: toastExample_2.title,
            description: toastExample_2.description,
            variant: 'success',
            duration: toastExample_2.duration,
            action: toastExample_2.action
          });
        }}
      >
        Success
      </Button>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: toastExample_2.title,
            description: toastExample_2.description,
            variant: 'warning',
            duration: toastExample_2.duration,
            action: toastExample_2.action
          });
        }}
      >
        Warning
      </Button>
      <Button
        variant="default"
        onClick={() => {
          toast({
            title: toastExample_2.title,
            description: toastExample_2.description,
            variant: 'info',
            duration: toastExample_2.duration,
            action: toastExample_2.action
          });
        }}
      >
        Info
      </Button>
    </div>
  );
}
