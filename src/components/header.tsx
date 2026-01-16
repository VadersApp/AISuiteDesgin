'use client';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-[#1E293B]/90 backdrop-blur-xl sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50 md:hidden" />
                <div className="hidden lg:flex items-center bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-1.5 gap-2 w-72 focus-within:border-blue-500/50 focus-within:bg-slate-900 transition-all">
                    <Search className="w-3.5 h-3.5 text-slate-500" />
                    <input type="text" placeholder="Durchsuche QORE..." className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder-slate-500" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#1E293B] shadow-[0_0_8px_rgba(244,63,94,0.4)]"></span>
                </button>
                <div className="h-6 w-[1px] bg-slate-700/50 mx-2"></div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connected</span>
                </div>
            </div>
        </header>
    );
}
