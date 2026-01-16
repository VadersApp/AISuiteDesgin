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
} from "lucide-react";
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
            { href: "/knowledge-base", icon: Database, label: "Wissensdatenbank", special: true },
            { href: "/meeting", icon: Video, label: "AI Meeting" },
        ]
    },
    {
        title: "Management",
        items: [
            { href: "/agents", icon: Bot, label: "KI-Mitarbeiter" },
            { href: "/departments", icon: Building2, label: "Abteilungen" },
            { href: "/tasks", icon: CheckSquare, label: "Aufgaben" },
        ]
    },
    {
        title: "Tools",
        items: [
            { href: "/qualender", icon: Calendar, label: "Qualender" },
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

  return (
    <>
      <SidebarHeader className="p-4 flex items-center gap-4 overflow-hidden h-[88px]">
        <Link href="/dashboard" className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40 border border-white/10">
              <span className="text-white font-black text-2xl tracking-tighter italic">Q</span>
          </div>
          <div
            className={cn(
              "flex flex-col whitespace-nowrap transition-opacity duration-200",
              state === "collapsed" && "opacity-0 hidden"
            )}
          >
            <span className="font-black text-2xl tracking-tighter text-white uppercase italic leading-none">AISUITE</span>
            <span className="text-[9px] font-bold text-blue-300/80 uppercase tracking-[0.2em] mt-1 ml-0.5">Intelligent Agents</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 px-4 space-y-4 mt-2 overflow-y-auto custom-scrollbar pb-10">
        {navGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
                {group.title && state === 'expanded' && (
                     <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{group.title}</p>
                )}
                <SidebarMenu>
                {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.href)}
                        tooltip={{ children: item.label, side: "right" }}
                        className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-xl transition-all font-bold",
                            pathname.startsWith(item.href) ? "bg-blue-600 text-white shadow-xl" : "text-slate-400 hover:bg-slate-700/50 hover:text-white",
                            item.special && !pathname.startsWith(item.href) && "bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20",
                            item.special && pathname.startsWith(item.href) && "bg-blue-600 text-white"
                        )}
                    >
                        <Link href={item.href}>
                          <item.icon className={cn("w-5 h-5 shrink-0", item.special && "text-purple-400", pathname.startsWith(item.href) && item.special && "text-white")}/>
                          <span className={cn("text-sm whitespace-nowrap", state === 'collapsed' && 'hidden')}>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </div>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-slate-700/50">
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3 overflow-hidden hover:bg-slate-700/50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-600 to-slate-400 flex-shrink-0"></div>
            <div
                className={cn(
                  "overflow-hidden whitespace-nowrap",
                  state === "collapsed" && "hidden"
                )}
              >
                <p className="text-xs font-bold text-white truncate">Dr. Müller</p>
                <p className="text-[10px] text-slate-400 truncate font-bold uppercase tracking-widest">CEO</p>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
