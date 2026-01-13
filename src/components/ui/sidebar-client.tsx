
'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from "lucide-react";

const Sidebar = dynamic(() => import('./sidebar').then(mod => mod.Sidebar), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-transparent text-foreground">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  ),
});

export default function SidebarClient(props: any) {
  return <Sidebar {...props} />;
}
