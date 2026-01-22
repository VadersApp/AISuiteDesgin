"use client";

import Link from "next/link";
import Image from "next/image";
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
  BookOpen,
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
            { href: "/reporting", icon: BarChart3, label: "Reporting & ROI" },
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
            { href: "/qalender", icon: Calendar, label: "Qalender" },
            { href: "/q-space", icon: Building2, label: "Q-Space" },
            { href: "/qsales", icon: DollarSign, label: "QSales" },
            { href: "/qmail", icon: Mail, label: "Qmail" },
            { href: "/qcall", icon: Phone, label: "Qcall" },
            { href: "/qhub", icon: Users, label: "QHub" },
            { href: "/q-akademie", icon: BookOpen, label: "Q-Akademie" },
            { href: "/workflow-studio", icon: Workflow, label: "Workflow Studio" },
            { href: "/tools", icon: Zap, label: "AI Tools" },
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
        <Link href="/dashboard" className={cn(
              "flex items-center w-full h-10",
              state === "expanded" ? "justify-start" : "justify-center"
            )}>
            <div className={cn("text-2xl font-bold text-white", state === 'collapsed' ? 'hidden' : 'block')}>QORE</div>
            <div className={cn("text-2xl font-bold text-white", state === 'expanded' ? 'hidden' : 'block')}>Q</div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto custom-scrollbar pb-10">
        <div className="px-2 space-y-4">
            {navGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                    {group.title && state === 'expanded' && (
                        <p className="px-2.5 pb-2 pt-2 text-[10px] font-semibold text-[#8FA3BF]/60 uppercase tracking-[0.18em]">{group.title}</p>
                    )}
                    <div className={cn(
                        "rounded-2xl p-1 transition-colors border border-white/5 bg-white/[.03]"
                    )}>
                        <SidebarMenu className="flex flex-col gap-1">
                        {group.items.map((item) => {
                            const isActive = isClient ? (item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)) : false;
                            return (
                            <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.label, side: "right" }}
                                className={cn(
                                    "w-full flex items-center justify-start gap-3 p-2.5 transition-colors font-medium rounded-[14px]",
                                    isActive
                                        ? "bg-gradient-to-r from-blue-900/50 via-blue-800/40 to-blue-900/50 text-white border border-blue-500/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
                                        : "text-[#9FB1C9] hover:bg-transparent [&_svg]:opacity-75"
                                )}
                            >
                                <Link href={item.href}>
                                <item.icon className="w-4 h-4 shrink-0"/>
                                <span className={cn("text-sm whitespace-nowrap", state === 'collapsed' && 'hidden')}>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        )})}
                        </SidebarMenu>
                    </div>
                </div>
            ))}
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-transparent mt-auto">
        <div className="p-2 rounded-lg flex items-center gap-3 overflow-hidden hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-600 to-slate-400 flex-shrink-0"></div>
            <div
                className={cn(
                  "overflow-hidden whitespace-nowrap",
                  state === "collapsed" && "hidden"
                )}
              >
                <p className="text-sm font-bold text-foreground truncate">Dr. Müller</p>
                <p className="text-xs text-muted-foreground truncate font-medium">CEO</p>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
