import { MainNav } from '@/components/main-nav';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { type PropsWithChildren } from 'react';
import { Header } from '@/components/header';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar className="w-72 border-r border-white/10 bg-black/30 backdrop-blur-lg flex flex-col transition-all duration-300 z-50 flex-shrink-0">
        <MainNav />
      </Sidebar>
      <SidebarInset className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-[#020617] relative">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto h-full pb-20">
                {children}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
