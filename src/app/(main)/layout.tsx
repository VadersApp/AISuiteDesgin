'use client';
import { MainNav } from '@/components/main-nav';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { type PropsWithChildren } from 'react';
import { Header } from '@/components/header';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar className="w-72 border-r-0 bg-[#1E293B] [background:linear-gradient(to_bottom,_#1E293B,_#0F172A)] flex flex-col transition-all duration-300 z-50 flex-shrink-0">
        <MainNav />
      </Sidebar>
      <SidebarInset className="relative bg-slate-50 dark:bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] dark:from-[#12233A] dark:to-[#080E1A] flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-y-auto py-16 pl-12 pr-6 custom-scrollbar">
            <div className="max-w-7xl mx-auto pb-20">
                {children}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
