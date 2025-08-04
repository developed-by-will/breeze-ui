'use client';

import { useToast } from '@/components/breeze-ui/toast/hooks/use-toast';
import { Form } from '@/components/ui/form';

import { POST } from '@/lib/requestHandler';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import LoginPage01 from './components/form';
import { formValidationRules, LoginPayloadType, LoginResponseType } from './formValidations';

export default function Login() {
  const { toast } = useToast(); // From breeze-ui toast

  const form = useForm<z.infer<typeof formValidationRules>>({
    resolver: zodResolver(formValidationRules),
    mode: 'onChange'
  });

  const query = useMutation({
    mutationFn: async (formData: LoginPayloadType) => {
      return await POST<LoginPayloadType, LoginResponseType>('api/users/authenticate-by-name', {
        Username: formData.Username,
        Pw: formData.Pw
      });
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong',
        description: 'Please try again.',
        variant: 'destructive'
      });

      console.log('Error:', error);
    },
    onSuccess: (data: LoginResponseType) => {
      toast({
        title: 'Login Successful',
        description: 'You have been logged in successfully!',
        variant: 'success'
      });

      console.log('AccessToken:', data.AccessToken);
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => query.mutate(data))}
        className="flex flex-col flex-auto bg-info rounded-2xl gap-4 max-w-xl mx-auto justify-center min-h-screen"
      >
        <LoginPage01
          backgroundImage={'../assets/pexels-nietjuh-1906440.jpg'}
          companyLogo={'../assets/generic-company-logo.png'}
          companyLogoAlternative={'../assets/generic-company-logo-white.png'}
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
}
