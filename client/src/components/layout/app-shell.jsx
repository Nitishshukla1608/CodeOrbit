import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LogOut,
  Settings,
} from "lucide-react";

import {CodeOrbitLogo } from "@/components/icons/codeorbit-icon";
import { ModeToggle } from "@/components/ui/mode-toggle";

import { useCurrentUser, useLogout } from "@/hooks/use-auth";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";

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

import {
  dashboardNavGroups,
  isDashboardNavActive,
} from "@/lib/dashboard-nav";

import { cn } from "@/lib/utils";

/**
 * Reusable sidebar trigger button.
 *
 * Place this component inside SidebarProvider.
 */
export function SidebarTriggerButton({ className, ...props }) {
  const { open } = useSidebar();

  return (
    <SidebarTrigger
      {...props}
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      className={cn(
        "shrink-0",
        "[&_svg]:!h-5 [&_svg]:!w-5",
        className
      )}
    />
  );
}

/**
 * Reusable CodeOrbit brand.
 *
 * Expanded: Logo + CodeOrbit + tagline
 * Collapsed: Logo only
 */
// BrandMark: Login page ya kisi bhi jagah use kar sakte ho
export function BrandMark({ className }) {
  return (
    <div className={cn("flex items-center", className)}>
      <CodeOrbitLogo className="h-10 w-auto max-w-full object-contain" />
    </div>
  );
}

// SidebarBrandMark: Sirf SidebarProvider ke andar use karna hai
function SidebarBrandMark({ className }) {
  const { state } = useSidebar();

  return (
    <div className={cn("flex items-center gap-2", className)}>
    <h1 className="font-bold text-3xl text-orange-500">CodeOrbit</h1>
    </div>
  );
}

/**
 * Sidebar brand section.
 */
function SidebarBrand() {
  return (
    <SidebarHeader className="px-3 py-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            render={<Link to="/dashboard" />}
            size="lg"
            tooltip="CodeOrbit"
            className="h-12 gap-3"
          >
          <SidebarBrandMark />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

/**
 * Sidebar navigation.
 */
function SidebarNavigation() {
  const { pathname } = useLocation();

  return (
    <SidebarContent>
      {dashboardNavGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>
            {group.label}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon;

                const isActive = isDashboardNavActive(
                  pathname,
                  item.href,
                  item.exact
                );

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link to={item.href} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className="h-9"
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
      ))}
    </SidebarContent>
  );
}

/**
 * Sidebar user profile and dropdown.
 */
function SidebarUserMenu() {
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();

  const logout = useLogout();

  const displayName = user?.displayName || "User";

  const githubUsername = user?.githubUsername || "github";

  const avatarFallback = displayName
    .slice(0, 2)
    .toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                tooltip={displayName}
                className="data-[popup-open]:bg-sidebar-accent"
              />
            }
          >
            <Avatar className="size-8 shrink-0 rounded-lg">
              <AvatarImage
                src={user?.avatarUrl || undefined}
                alt={displayName}
              />

              <AvatarFallback className="rounded-lg">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>

            <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {displayName}
              </span>

              <span className="truncate text-xs text-muted-foreground">
                @{githubUsername}
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side="top"
            align="start"
            sideOffset={8}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">
                    {displayName}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    Connected via GitHub
                  </span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/dashboard/settings")}
            >
              <Settings />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
            >
              <LogOut />

              {logout.isPending
                ? "Logging out..."
                : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

/**
 * Sidebar footer.
 */
function SidebarBottom() {
  return (
    <SidebarFooter className="p-2">
      <SidebarUserMenu />
    </SidebarFooter>
  );
}

/**
 * Main application shell.
 */
export default function AppShell({
  children,
  title,
  description,
  actions,
  hideHeader = false,
}) {
  return (
    <SidebarProvider>
      <Sidebar
        variant="inset"
        collapsible="icon"
      >
        <SidebarBrand />

        <SidebarNavigation />

        <SidebarBottom />
      </Sidebar>

      <SidebarInset className="min-h-0 min-w-0 overflow-hidden">
        {!hideHeader && (
          <header
            className="
              sticky top-0 z-20
              flex h-14 shrink-0
              items-center gap-2
              border-b
              bg-background/80
              px-4
              backdrop-blur
            "
          >
            <SidebarTriggerButton />

            <Separator
              orientation="vertical"
              className="mr-2 h-4"
            />

            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <div className="min-w-0">
                {title && (
                  <h1 className="truncate font-heading text-sm font-medium">
                    {title}
                  </h1>
                )}

                {description && (
                  <p className="truncate text-xs text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {actions}

                <ModeToggle />
              </div>
            </div>
          </header>
        )}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

/**
 * Ghost button link.
 */
export function GhostButtonLink({
  href,
  children,
  className,
}) {
  return (
    <Link
      to={href}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium",
        "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </Link>
  );
}