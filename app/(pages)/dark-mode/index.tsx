'use client';
import Breadcrumbs, { BreadcrumbType } from '@/components/breeze-ui/breadcrumbs';

import Steps from '@/registry/components/ui/steps';
import { darkModeSteps } from './steps';

export default function DarkMode() {
  const breadcrumbs: BreadcrumbType[] = [{ text: 'Docs' }, { text: 'Next.js Dark Mode' }];

  return (
    <>
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} position="justify-start" />}

      <Steps steps={darkModeSteps} />
    </>
  );
}
