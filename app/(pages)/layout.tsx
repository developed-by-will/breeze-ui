'use client';

import Sidebar from '@/components/project/Sidebar';

type PropsType = {
  children: React.ReactNode;
};

export default function Layout(props: Readonly<PropsType>) {
  const { children } = props;

  return (
    <div className="flex justify-center">
      <div className="flex container">
        <aside className="w-64 border-r p-4 hidden lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1 p-6 container space-y-10">{children}</main>
      </div>
    </div>
  );
}
