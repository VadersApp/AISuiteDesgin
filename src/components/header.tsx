'use client';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Sun, Moon, Clock, TrendingUp } from "lucide-react";
import { useState, useEffect } from 'react';
import { dashboardStats } from '@/lib/data';

export function Header() {
    const [theme, setTheme] = useState('dark');
    const [savedHours, setSavedHours] = useState(0);
    const [roi, setRoi] = useState('');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(storedTheme);
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const savingsStat = dashboardStats.find(s => s.title === 'Ersparnis');
        const targetHours = savingsStat ? parseInt(savingsStat.value.replace('h', ''), 10) : 0;
        
        const roiStat = dashboardStats.find(s => s.title === 'ROI');
        if (roiStat) {
            setRoi(roiStat.value);
        }

        if (targetHours > 0) {
            let currentHours = 0;
            const step = Math.ceil(targetHours / 100); // Animate in 100 steps
            const timer = setInterval(() => {
                currentHours += step;
                if (currentHours >= targetHours) {
                    setSavedHours(targetHours);
                    clearInterval(timer);
                } else {
                    setSavedHours(currentHours);
                }
            }, 20); // 100 * 20ms = 2 seconds
            return () => clearInterval(timer);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <header className="h-16 border-b border-border/50 flex items-center justify-between pl-16 pr-12 bg-background/50 backdrop-blur-lg sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="p-2 text-foreground/70 hover:text-foreground transition-colors rounded-lg hover:bg-accent md:hidden" />
                <div className="hidden lg:flex items-center bg-background/50 border border-border rounded-xl px-4 py-1.5 gap-2 w-72 focus-within:border-primary/50 focus-within:bg-background transition-all">
                    <Search className="w-3.5 h-3.5 text-muted-foreground" />
                    <input type="text" placeholder="Durchsuche QORE..." className="bg-transparent border-none text-xs text-foreground focus:outline-none w-full placeholder:text-muted-foreground" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                 <button onClick={toggleTheme} className="relative flex justify-center items-center p-2 text-foreground/70 hover:text-foreground transition-colors w-9 h-9">
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </button>
                <button className="relative p-2 text-foreground/70 hover:text-foreground transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-background shadow-[0_0_8px_rgba(244,63,94,0.4)]"></span>
                </button>
                <div className="h-6 w-[1px] bg-border/50 mx-2"></div>
                
                <div className="flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg px-3 py-1.5">
                    <Clock className="w-4 h-4" />
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-white">{savedHours}h</span>
                        <span className="text-[10px] font-bold uppercase">Ersparnis</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg px-3 py-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-white">{roi}</span>
                        <span className="text-[10px] font-bold uppercase">ROI</span>
                    </div>
                </div>

                <div className="h-6 w-[1px] bg-border/50 mx-2"></div>

                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Connected</span>
                </div>
            </div>
        </header>
    );
}
