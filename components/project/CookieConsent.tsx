'use client';

import { ToastAction } from '@/components/breeze-ui/toast/toast';
import { useToast } from '@/hooks/use-toast';
import { GoogleAnalytics } from '@next/third-parties/google';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID as string;

export default function CookieConsent() {
  const { toast } = useToast();

  const state = Cookies.get('cookie-consent-state');

  const handleConsent = (state: string) => {
    Cookies.set('cookie-consent-state', state);
  };

  useEffect(() => {
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
              className="w-full "
              onClick={() => handleConsent('accepted')}
              variant="info"
            >
              Accept
            </ToastAction>
            <ToastAction
              altText="Try again"
              className="w-full"
              onClick={() => handleConsent('rejected')}
              variant="info"
            >
              Reject
            </ToastAction>
          </div>
        )
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === 'accepted') {
    return <GoogleAnalytics gaId={GA_ID} />;
  }
}
