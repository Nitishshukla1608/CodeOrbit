import {
  FolderGit2,
  LayoutGrid,
  Settings,
  House,
} from "lucide-react";

export const dashboardNavGroups = [
  {
    label: "Workspace",
    items: [
      {
        title: "Home",
        href: "/",
        icon: House,
        exact: true,
      },
      {
        title: "Overview",
        href: "/overview",
        icon: LayoutGrid,
      },
      {
        title: "Repositories",
        href: "/dashboard",
        icon: FolderGit2,
        exact: true,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

/**
 * Check whether a navigation item is active.
 */
export function isDashboardNavActive(
  pathname,
  href,
  exact = false
) {
  // Home should only be active on "/".
  if (href === "/") {
    return pathname === "/";
  }

  // Exact matching for selected routes.
  if (exact) {
    return pathname === href;
  }

  // Match the route and its nested routes.
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}