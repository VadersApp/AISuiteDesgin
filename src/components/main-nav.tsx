"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  CheckSquare,
  FlaskConical,
  Book,
  Users,
  BarChart,
  Bot,
  Settings,
  LogOut,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/chat", icon: MessageSquare, label: "AI Chat" },
  { href: "/tasks", icon: CheckSquare, label: "Tasks" },
  { href: "/tools", icon: FlaskConical, label: "AI Tools" },
  { href: "/knowledge-base", icon: Book, label: "Knowledge Base" },
  { href: "/departments", icon: Users, label: "Departments" },
  { href: "/reporting", icon: BarChart, label: "Reporting" },
];

export function MainNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary flex-shrink-0" />
          <h1
            className={cn(
              "text-xl font-bold whitespace-nowrap",
              state === "collapsed" && "hidden"
            )}
          >
            AISuite
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: "right" }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent">
              <Avatar className="h-9 w-9">
                <AvatarImage data-ai-hint="person portrait" src="https://picsum.photos/seed/user-avatar/100/100" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "flex flex-col overflow-hidden",
                  state === "collapsed" && "hidden"
                )}
              >
                <span className="text-sm font-semibold truncate">Admin User</span>
                <span className="text-xs text-muted-foreground truncate">
                  admin@aisuite.com
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
}
