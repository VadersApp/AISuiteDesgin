'use client';
import { MainNav } from '@/components/main-nav';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { type PropsWithChildren } from 'react';
import { Header } from '@/components/header';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar flex flex-col transition-all duration-300 z-50 flex-shrink-0">
        <MainNav />
      </Sidebar>
      <SidebarInset className="relative bg-background flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-y-auto py-16 px-4 custom-scrollbar">
            <div className="max-w-7xl mx-auto pb-20">
                {children}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
