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
            { href: "/qalender", icon: Calendar, label: "Qualender" },
            { href: "/qsales", icon: DollarSign, label: "Q-Sales" },
            { href: "/qmail", icon: Mail, label: "Q-Mail" },
            { href: "/qcall", icon: Phone, label: "Q-Call" },
            { href: "/qhub", icon: Users, label: "Q-Hub" },
            { href: "/q-space", icon: Building2, label: "Q-Space" },
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

  return (
    <>
      <SidebarHeader className="p-4 flex items-center gap-4 overflow-hidden h-auto">
        <Link href="/dashboard" className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <span className="font-black text-xl">Q</span>
          </div>
          <div
            className={cn(
              "flex flex-col whitespace-nowrap transition-opacity duration-200",
              state === "collapsed" && "opacity-0 hidden"
            )}
          >
            <span className="font-bold text-lg tracking-wider text-white uppercase">AISUITE</span>
            <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest -mt-1">Intelligent Agents</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 mt-4 overflow-y-auto custom-scrollbar pb-10">
        <div className="px-4 space-y-4">
            {navGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-1 border border-sidebar-border/20 rounded-xl p-2">
                    {group.title && state === 'expanded' && (
                        <p className="px-1 pb-2 pt-1 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">{group.title}</p>
                    )}
                    <SidebarMenu className="flex flex-col gap-1">
                    {group.items.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                        <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={{ children: item.label, side: "right" }}
                            className={cn(
                                "w-full flex items-center justify-start gap-3 p-2.5 rounded-lg transition-all font-medium",
                                isActive ? "bg-accent text-accent-foreground" : "text-sidebar-foreground hover:bg-accent/50 hover:text-accent-foreground"
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
            ))}
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/10 mt-auto">
        <div className="p-2 rounded-lg flex items-center gap-3 overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer">
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
