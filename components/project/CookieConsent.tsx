'use client';

import { useToast } from '@/registry/components/hooks/use-toast';
import { ToastAction } from '@/registry/components/ui/toast';
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
            <ToastAction altText="accept" onClick={() => handleConsent('accepted')}>
              Accept
            </ToastAction>
            <ToastAction altText="reject" onClick={() => handleConsent('rejected')}>
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
