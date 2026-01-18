"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  BarChart3,
  MessageSquare,
  Database,
  Video,
  Building2,
  Bot,
  CheckSquare,
  Calendar,
  Workflow,
  Zap,
  ShieldCheck,
  Settings,
  MessageCircle,
  Mail,
  Phone,
  Users,
  DollarSign,
} from "lucide-react";
import * as React from 'react';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navGroups = [
    {
        title: "Übersicht",
        items: [
            { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { href: "/news", icon: Bell, label: "Neuigkeiten" },
            { href: "/reporting", icon: BarChart3, label: "Reporting" },
        ]
    },
    {
        title: "Interaktion",
        items: [
            { href: "/chat", icon: MessageSquare, label: "Chat" },
            { href: "/knowledge-base", icon: Database, label: "Wissensdatenbank" },
            { href: "/meeting", icon: Video, label: "AI Meeting" },
        ]
    },
    {
        title: "Management",
        items: [
            { href: "/departments", icon: Building2, label: "Abteilungen" },
            { href: "/agents", icon: Bot, label: "KI-Mitarbeiter" },
            { href: "/tasks", icon: CheckSquare, label: "Aufgaben" },
        ]
    },
    {
        title: "Tools",
        items: [
            { href: "/qsales", icon: DollarSign, label: "Qsales" },
            { href: "/qmail", icon: Mail, label: "Qmail" },
            { href: "/qcall", icon: Phone, label: "Qcall" },
            { href: "/qhub", icon: Users, label: "Qhub" },
            { href: "/qalender", icon: Calendar, label: "Qalender" },
            { href: "/workflow-studio", icon: Workflow, label: "Workflow Studio" },
            { href: "/tools", icon: Zap, label: "AI / Tools" },
        ]
    },
    {
        title: "Administration",
        items: [
            { href: "/admin", icon: ShieldCheck, label: "System Admin" },
            { href: "/settings", icon: Settings, label: "Einstellungen" },
            { href: "/feedback", icon: MessageCircle, label: "Feedback" },
        ]
    }
]

export function MainNav() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <SidebarHeader className="p-4 flex items-center gap-4 overflow-hidden h-auto">
        <Link href="/dashboard" className="flex items-center gap-3 bg-background/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-3 border border-border dark:border-white/10 w-full">
          <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg">
              <span className="font-black text-xl">Q</span>
          </div>
          <div
            className={cn(
              "flex flex-col whitespace-nowrap transition-opacity duration-200",
              state === "collapsed" && "opacity-0 hidden"
            )}
          >
            <span className="font-black text-2xl tracking-tighter text-foreground uppercase italic leading-none">QORE</span>
            <span className="text-[9px] font-bold text-primary/80 uppercase tracking-[0.2em] mt-1 ml-0.5">Intelligent Agents</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 px-4 space-y-2 mt-0 overflow-y-auto custom-scrollbar pb-10">
        {navGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-background/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-2 border border-border dark:border-white/10">
                {group.title && state === 'expanded' && (
                     <p className="px-2 pb-2 pt-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{group.title}</p>
                )}
                <SidebarMenu className="flex flex-col gap-1">
                {group.items.map((item) => {
                    const isActive = isClient ? pathname.startsWith(item.href) : false;
                    return (
                    <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={{ children: item.label, side: "right" }}
                        className={cn(
                            "w-full flex items-center justify-start gap-3 p-3 rounded-lg transition-all font-semibold",
                            isActive ? "bg-primary text-primary-foreground shadow-md" : "text-secondary-foreground/70 hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <Link href={item.href}>
                          <item.icon className="w-5 h-5 shrink-0"/>
                          <span className={cn("text-sm whitespace-nowrap", state === 'collapsed' && 'hidden')}>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                )})}
                </SidebarMenu>
            </div>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/50 mt-auto">
        <div className="p-3 rounded-2xl bg-background/50 dark:bg-black/20 border border-border dark:border-white/10 backdrop-blur-sm flex items-center gap-3 overflow-hidden hover:bg-accent transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-600 to-slate-400 flex-shrink-0"></div>
            <div
                className={cn(
                  "overflow-hidden whitespace-nowrap",
                  state === "collapsed" && "hidden"
                )}
              >
                <p className="text-xs font-bold text-foreground truncate">Dr. Müller</p>
                <p className="text-[10px] text-muted-foreground truncate font-bold uppercase tracking-widest">CEO</p>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
