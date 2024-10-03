/* For the preview */
import codeSource from '!!raw-loader!./index.tsx';
import { componentsMetadata, ComponentType } from '@/registry/components/metadata';
import { ToastAction } from '.';

export const component = codeSource;

/* For the example */
const example = {
  title: 'Permanent toast example',
  description: 'This toast will stay here until user interacts with it.',
  variant: 'default',
  duration: Infinity,
  action: (
    <div className="flex flex-col gap-2">
      <ToastAction altText="Try again" className="w-full">
        Be gone!
      </ToastAction>
    </div>
  )
};

const example_2 = {
  title: 'Toast example',
  description: 'Description goes in here just keep in mind it only accepts strings.',
  variant: 'destructive',
  duration: Infinity,
  action: (
    <div className="flex flex-col gap-2">
      <ToastAction altText="Try again" className="w-full">
        Close
      </ToastAction>
    </div>
  )
};

const implementation_1 = `useEffect(() => {
    if (state === 'not-answered' || !state) {
      toast({
        title: 'We use cookies 🍪!',
        description: 'These improve your experience, do you accept?',
        variant: 'info',
        duration: Infinity,
        action: (
          <div className="flex flex-col gap-2">
            <ToastAction
              altText="Try again"
              className="w-full"
              onClick={() => handleConsent('accepted')}
            >
              Accept
            </ToastAction>
            <ToastAction
              altText="Try again"
              className="w-full"
              onClick={() => handleConsent('rejected')}
            >
              Reject
            </ToastAction>
          </div>
        )
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
`;

const implementation_2 = `<Button
  variant="outline"
  onClick={() => {
    toast({
      description: toastExample_2.description
    });
  }}
>
  Show Toast
</Button>
`;

export const config: ComponentType = {
  type: 'component',
  slug: componentsMetadata.toast.slug,
  name: componentsMetadata.toast.name,
  title: componentsMetadata.toast.title,
  description: componentsMetadata.toast.description,
  codeSnippet: component,
  example,
  example_2,
  implementation_1,
  implementation_1_title: 'Show permanent toast on page load',
  implementation_2,
  implementation_2_title: 'Show toast on button click',
  addCommand: `npx shadcn add https://breeze-ui.wilsongomes.me/public/registry/components/${componentsMetadata.toast.name}.json https://breeze-ui.wilsongomes.me/public/registry/components/${componentsMetadata['use-toast'].name}.json`
};
