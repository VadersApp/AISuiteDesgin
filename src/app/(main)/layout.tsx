'use client';
import { MainNav } from '@/components/main-nav';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { type PropsWithChildren } from 'react';
import { Header } from '@/components/header';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar className="w-72 border-r-0 bg-[#0F1C2F] [background:linear-gradient(to_bottom,_#0B1626,_#12233A,_#080E1A)] flex flex-col transition-all duration-300 z-50 flex-shrink-0">
        <MainNav />
      </Sidebar>
      <SidebarInset className="relative bg-slate-50 dark:bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] dark:from-slate-900 dark:via-slate-950 dark:to-background flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-y-auto py-16 pl-20 pr-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto pb-20">
                {children}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
