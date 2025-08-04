/* For the preview */
import codeSource from '!!raw-loader!./form.tsx';
import {
  componentsMetadata,
  ComponentType,
  REGISTRY_BASE_URL
} from '@/registry/components/metadata';
import LoginPage01 from './form';

export const codeSnippet = codeSource;

/* For the example */
import { useToast } from '@/components/breeze-ui/toast/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import logoAlternative from '../assets/generic-company-logo-white.png';
import logo from '../assets/generic-company-logo.png';
import cover from '../assets/pexels-nietjuh-1906440.jpg';
import { formValidationRules } from '../formValidations';

async function mockLogin(data: { Username: string; Pw: string }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, token: 'someRubishInHere' });
    }, 1000);
  });
}

const ExampleComponent = () => {
  const { toast, dismiss } = useToast();
  const toastIdRef = useRef<string | undefined>(undefined);

  const form = useForm<z.infer<typeof formValidationRules>>({
    resolver: zodResolver(formValidationRules),
    mode: 'onChange'
  });

  const query = useMutation({
    mutationFn: mockLogin,
    onSuccess: () => {
      dismiss(toastIdRef.current);
      toastIdRef.current = undefined;
      toast({
        title: 'Login Successful',
        description: 'You have been logged in successfully!',
        variant: 'success'
      });
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => query.mutate(data))}
        className="flex flex-col flex-auto bg-info rounded-2xl gap-4 max-w-xl mx-auto"
      >
        <LoginPage01
          backgroundImage={cover}
          companyLogo={logo}
          companyLogoAlternative={logoAlternative}
          companyLogoAlt="Company logo"
          formWidth={300}
          providers={['google', 'facebook']}
          title="Login into my awesome app"
          loading={query.isPending}
          control={form.control}
        />
      </form>
    </Form>
  );
};

const example = <ExampleComponent />;

const hydrateComponent = `'use client';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StrictMode, useEffect, useState } from 'react';

export default function Hydrate({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [localStorageInit, setLocalStorageInit] = useState<Storage>();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  useEffect(() => {
    setIsHydrated(true);
    setLocalStorageInit(window.localStorage);
  }, []);

  return (
    <StrictMode>
      {isHydrated && (
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister: createAsyncStoragePersister({
              storage: localStorageInit
            })
          }}
        >
          {children}
        </PersistQueryClientProvider>
      )}
    </StrictMode>
  );
}`;

const rootLayout = `import './globals.css';
import Hydrate from './Hydrate';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [localStorageInit, setLocalStorageInit] = useState<Storage>();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  useEffect(() => {
    setIsHydrated(true);
    setLocalStorageInit(window.localStorage);
  }, []);
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Hydrate>{children}</Hydrate>
      </body>
    </html>
  );
}`;

const PersistQueryClientProviderExample = `'use client';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StrictMode, useEffect, useState } from 'react';

export default function Hydrate({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [localStorageInit, setLocalStorageInit] = useState<Storage>();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  useEffect(() => {
    setIsHydrated(true);
    setLocalStorageInit(window.localStorage);
  }, []);

  return (
    <StrictMode>
      {isHydrated && (
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister: createAsyncStoragePersister({
              storage: localStorageInit
            })
          }}
        >
          {children}
        </PersistQueryClientProvider>
      )}
    </StrictMode>
  );
}
`;

export const config: ComponentType = {
  type: 'block',
  slug: componentsMetadata.login01.slug,
  name: componentsMetadata.login01.name,
  title: componentsMetadata.login01.title,
  description: componentsMetadata.login01.description,
  codeSnippet,
  example,
  implementation_1: hydrateComponent,
  implementation_1_title: '1 - Create an Hydrate.tsx component at the APP.',
  implementation_2: rootLayout,
  implementation_2_title: '2 - Wrap the APP with the Hydrate component.',
  implementation_3: PersistQueryClientProviderExample,
  implementation_3_title: `3 - Wrap the APP with PersistQueryClientProvider component.`,
  addCommand: `npx shadcn add ${REGISTRY_BASE_URL}/${componentsMetadata.login01.name}.json`
};
