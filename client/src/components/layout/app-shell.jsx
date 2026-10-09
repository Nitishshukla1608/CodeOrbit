import React from "react";

import { Link, NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  FolderGit2,
  Settings,
  MessageSquareCode,
  ChevronRight,
} from "lucide-react";

import { CodeOrbitIcon } from "@/components/icons/codeorbit-icon";
import { ModeToggle } from "@/components/ui/mode-toggle";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// Sidebar navigation items
const navigationItems = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Repositories",
    url: "/dashboard",
    icon: FolderGit2,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

/**
 * BrandMark
 *
 * Reusable CodeOrbit brand component.
 * Used by the login page.
 */
export function BrandMark() {
  return (
    <div className="flex items-center gap-2">
      <CodeOrbitIcon className="size-9 shrink-0" />

      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight">
          CodeOrbit
        </span>

        <span className="text-xs text-muted-foreground">
          Chat with your code
        </span>
      </div>
    </div>
  );
}

/**
 * Sidebar brand
 *
 * Expanded:
 * Logo + CodeOrbit + Chat with your code
 *
 * Collapsed:
 * Logo only
 */
function SidebarBrand() {
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader className="p-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            render={<Link to="/dashboard" />}
            size="lg"
            tooltip="CodeOrbit"
            className="h-12 gap-3"
          >
            {/* Logo remains visible in both states */}
            <div className="flex size-9 shrink-0 items-center justify-center">
              <CodeOrbitIcon className="size-8 rounded-[10px]" />
            </div>

            {/* Hide brand text when collapsed */}
            {!isCollapsed && (
              <div className="grid min-w-0 flex-1 text-left leading-tight">
                <span className="truncate text-sm font-semibold tracking-tight">
                  CodeOrbit
                </span>

                <span className="truncate text-xs text-muted-foreground">
                  Chat with your code
                </span>
              </div>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

/**
 * Sidebar navigation
 */
function SidebarNavigation() {
  const location = useLocation();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.url === "/dashboard"
                  ? location.pathname === "/dashboard"
                  : location.pathname === item.url ||
                    location.pathname.startsWith(`${item.url}/`);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<NavLink to={item.url} />}
                    isActive={isActive}
                    tooltip={item.title}
                  >
                    <Icon />

                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

/**
 * Sidebar footer
 *
 * Ask anything + appearance settings
 */
function SidebarBottom() {
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <SidebarFooter className="p-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            render={<Link to="/ask-anything" />}
            tooltip="Ask anything"
          >
            <MessageSquareCode />

            <span>Ask anything</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <div className="border-t border-sidebar-border pt-3">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } gap-2`}
        >
          {!isCollapsed && (
            <span className="text-xs text-muted-foreground">
              Appearance
            </span>
          )}

          <ModeToggle />
        </div>
      </div>
    </SidebarFooter>
  );
}

/**
 * Main application shell
 */
export default function AppShell({ children }) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarBrand />

        <SidebarNavigation />

        <SidebarBottom />
      </Sidebar>

      <SidebarInset className="min-w-0">
        {/* Application header */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-xl">
          <SidebarTrigger className="-ml-1" />

          <div className="h-5 w-px bg-border" />

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate text-sm font-medium">
              CodeOrbit
            </span>

            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />

            <span className="truncate text-sm text-muted-foreground">
              Workspace
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="min-w-0 flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}