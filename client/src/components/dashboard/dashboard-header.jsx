import { RefreshCw, Search } from "lucide-react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";


const visibilityFilters = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "public",
    label: "Public",
  },
  {
    value: "private",
    label: "Private",
  },
];


const statusFilters = [
  {
    value: "ALL",
    label: "All",
  },
  {
    value: "READY",
    label: "Ready",
  },
  {
    value: "INDEXING",
    label: "Indexing",
  },
  {
    value: "PENDING",
    label: "New",
  },
  {
    value: "FAILED",
    label: "Failed",
  },
];


function FilterPill({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-foreground/20 bg-foreground text-background shadow-sm"
          : "border-dashed border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}


export function DashboardHeader({
  search,
  onSearchChange,
  visibility,
  onVisibilityChange,
  status,
  onStatusChange,
  totalCount,
  readyCount,
  onSync,
  isSyncing,
}) {
  return (
    <div className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur-xl">

      <div className="flex flex-col gap-4 px-4 py-4 md:px-6">

        {/* =========================
            HEADER TOP
        ========================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Title */}

          <div className="flex min-w-0 items-start gap-3">

            <SidebarTrigger className="-ml-1 mt-0.5" />

            <div className="min-w-0">

              <h1 className="font-heading text-xl font-semibold tracking-tight">
                Repositories
              </h1>

              <p className="text-sm text-muted-foreground">
                {totalCount != null
                  ? `${totalCount} connected · ${readyCount ?? 0} ready`
                  : "Sync and index a repo to start chatting"}
              </p>

            </div>

          </div>


          {/* Search + Actions */}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

            {/* Search */}

            <div className="relative min-w-[220px] flex-1 sm:min-w-[280px]">

              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                value={search}
                onChange={(e) =>
                  onSearchChange(e.target.value)
                }
                placeholder="Search repositories…"
                className="border-dashed bg-background pl-9 shadow-sm"
              />

            </div>


            {/* Buttons */}

            <div className="flex items-center gap-6">

              <Button
                variant="outline"
                className="border-dashed shadow-sm"
                onClick={onSync}
                disabled={isSyncing}
              >

                <RefreshCw
                  data-icon="inline-start"
                  className={
                    isSyncing
                      ? "animate-spin"
                      : undefined
                  }
                />

                Sync

              </Button>

              <ModeToggle />

            </div>

          </div>

        </div>


        {/* Separator */}

        <Separator className="opacity-60" />


        {/* =========================
            FILTERS
        ========================== */}

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          {/* Visibility */}

          <div className="flex flex-wrap items-center gap-2">

            <span className="mr-1 text-xs font-medium text-muted-foreground">
              Visibility
            </span>

            {visibilityFilters.map((filter) => (
              <FilterPill
                key={filter.value}
                active={visibility === filter.value}
                onClick={() =>
                  onVisibilityChange(filter.value)
                }
              >
                {filter.label}
              </FilterPill>
            ))}

          </div>


          {/* Status */}

          <div className="flex flex-wrap items-center gap-2">

            <span className="mr-1 text-xs font-medium text-muted-foreground">
              Status
            </span>

            {statusFilters.map((filter) => (
              <FilterPill
                key={filter.value}
                active={status === filter.value}
                onClick={() =>
                  onStatusChange(filter.value)
                }
              >
                {filter.label}
              </FilterPill>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}