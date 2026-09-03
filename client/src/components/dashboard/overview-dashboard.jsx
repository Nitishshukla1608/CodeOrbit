import { useMemo, useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  FolderGit2,
  LoaderCircle,
  MessageSquareCode,
} from "lucide-react";

import { Link } from "react-router-dom";

import { RepoCard } from "@/components/dashboard/repo-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { useRepos } from "@/hooks/use-repos";


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <Card size="sm">
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-3">

          <div>
            <CardDescription>
              {label}
            </CardDescription>

            <CardTitle className="mt-1 text-2xl font-semibold">
              {value}
            </CardTitle>
          </div>

          <div className="rounded-lg bg-muted p-2 text-muted-foreground">
            <Icon className="size-4" />
          </div>

        </div>
      </CardHeader>

      {hint ? (
        <CardContent className="pt-0 text-xs text-muted-foreground">
          {hint}
        </CardContent>
      ) : null}
    </Card>
  );
}


/* =========================================================
   OVERVIEW DASHBOARD
========================================================= */

export default function OverviewDashboard() {

  /* =======================================================
     STATE
  ======================================================= */

  const [search, setSearch] = useState("");

  const [visibility, setVisibility] = useState("all");

  const [status, setStatus] = useState("ALL");


  /* =======================================================
     REPOSITORIES QUERY
  ======================================================= */

  const reposQuery = useRepos();

  const repos = reposQuery.data ?? [];


  /* =======================================================
     SYNC
  ======================================================= */

  const handleSync = () => {
    /*
      useRepos() ka refetch method call karega.

      Agar tumhare useRepos hook me refetch available hai,
      ye repositories ko dobara fetch karega.
    */

    reposQuery.refetch();
  };


  /* =======================================================
     FILTER REPOSITORIES
  ======================================================= */

  const filteredRepos = useMemo(() => {

    return repos.filter((repo) => {

      /* -----------------------------------------------
         SEARCH
      ------------------------------------------------ */

      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        repo.name?.toLowerCase().includes(searchValue) ||
        repo.fullName?.toLowerCase().includes(searchValue);


      /* -----------------------------------------------
         VISIBILITY
      ------------------------------------------------ */

      const repoVisibility =
        repo.visibility?.toLowerCase();

      const matchesVisibility =
        visibility === "all" ||
        repoVisibility === visibility;


      /* -----------------------------------------------
         STATUS
      ------------------------------------------------ */

      const matchesStatus =
        status === "ALL" ||
        repo.indexStatus === status;


      return (
        matchesSearch &&
        matchesVisibility &&
        matchesStatus
      );

    });

  }, [
    repos,
    search,
    visibility,
    status,
  ]);


  /* =======================================================
     COUNTS
  ======================================================= */

  const readyCount = repos.filter(
    (repo) => repo.indexStatus === "READY"
  ).length;


  const indexingCount = repos.filter(
    (repo) => repo.indexStatus === "INDEXING"
  ).length;


  const failedCount = repos.filter(
    (repo) => repo.indexStatus === "FAILED"
  ).length;


  const pendingCount = repos.filter(
    (repo) => repo.indexStatus === "PENDING"
  ).length;


  const totalChunks = repos.reduce(
    (sum, repo) => sum + (repo.chunkCount ?? 0),
    0
  );


  /* =======================================================
     RECENT REPOSITORIES
  ======================================================= */

  const recentRepos = [...filteredRepos]
    .sort((a, b) => {

      const aTime = a.indexedAt
        ? new Date(a.indexedAt).getTime()
        : 0;

      const bTime = b.indexedAt
        ? new Date(b.indexedAt).getTime()
        : 0;

      return bTime - aTime;

    })
    .slice(0, 3);


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex flex-1 flex-col">

      {/* =================================================
          DASHBOARD HEADER
      ================================================== */}

      <DashboardHeader
        search={search}
        onSearchChange={setSearch}

        visibility={visibility}
        onVisibilityChange={setVisibility}

        status={status}
        onStatusChange={setStatus}

        totalCount={repos.length}
        readyCount={readyCount}

        onSync={handleSync}
        isSyncing={reposQuery.isFetching}
      />


      {/* =================================================
          DASHBOARD CONTENT
      ================================================== */}

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">


        {/* =================================================
            STAT CARDS
        ================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {reposQuery.isLoading ? (

            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-28 rounded-2xl"
              />
            ))

          ) : (

            <>

              <StatCard
                label="Repositories"
                value={repos.length}
                hint="Connected from GitHub"
                icon={FolderGit2}
              />


              <StatCard
                label="Ready to chat"
                value={readyCount}
                hint={`${indexingCount} currently indexing`}
                icon={CheckCircle2}
              />


              <StatCard
                label="Indexed chunks"
                value={totalChunks.toLocaleString()}
                hint="Searchable code segments"
                icon={MessageSquareCode}
              />


              <StatCard
                label="Needs attention"
                value={failedCount}
                hint={
                  failedCount > 0
                    ? "Review failed indexing jobs"
                    : "All repos healthy"
                }
                icon={
                  failedCount > 0
                    ? AlertCircle
                    : LoaderCircle
                }
              />

            </>

          )}

        </div>


        {/* =================================================
            MAIN CONTENT
        ================================================== */}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">


          {/* =================================================
              RECENT REPOSITORIES
          ================================================== */}

          <section className="space-y-4">

            <div className="flex items-center justify-between gap-3">

              <div>

                <h2 className="font-heading text-lg font-semibold">
                  Recent repositories
                </h2>

                <p className="text-sm text-muted-foreground">
                  Jump back into a repo you have indexed recently.
                </p>

              </div>


              <Link
                to="/dashboard"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>

            </div>


            {/* Loading */}

            {reposQuery.isLoading ? (

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">

                {Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-44 rounded-2xl"
                  />
                ))}
              </div>
            ) : recentRepos.length > 0 ? (

              /* Repositories */
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">

                {recentRepos.map((repo) => (
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                  />
                ))}

              </div>

            ) : (

              /* No repositories / no search results */

              <Card>

                <CardHeader>

                  <CardTitle>
                    {repos.length === 0
                      ? "No repositories yet"
                      : "No repositories found"}
                  </CardTitle>

                  <CardDescription>

                    {repos.length === 0
                      ? "Sync your GitHub repositories to start indexing and chatting with your code."
                      : "Try changing your search or filters."}

                  </CardDescription>

                </CardHeader>


                {repos.length === 0 && (
                  <CardContent>

                    <button
                      type="button"
                      onClick={handleSync}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Sync repositories
                    </button>

                  </CardContent>
                )}

              </Card>

            )}

          </section>


          {/* =================================================
              WORKSPACE STATUS
          ================================================== */}

          <section className="space-y-4">

            <div>

              <h2 className="font-heading text-lg font-semibold">
                Workspace status
              </h2>

              <p className="text-sm text-muted-foreground">
                A quick snapshot of indexing across your connected repos.
              </p>

            </div>


            <Card>

              <CardContent className="space-y-3 pt-6">

                {reposQuery.isLoading ? (

                  Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-8 rounded-lg"
                    />
                  ))

                ) : (

                  <>

                    {/* Ready */}

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-sm text-muted-foreground">
                        Ready
                      </span>

                      <Badge variant="secondary">
                        {readyCount}
                      </Badge>

                    </div>


                    {/* Indexing */}

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-sm text-muted-foreground">
                        Indexing
                      </span>

                      <Badge variant="secondary">
                        {indexingCount}
                      </Badge>

                    </div>


                    {/* Pending */}

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-sm text-muted-foreground">
                        Pending
                      </span>

                      <Badge variant="secondary">
                        {pendingCount}
                      </Badge>

                    </div>


                    {/* Failed */}

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-sm text-muted-foreground">
                        Failed
                      </span>

                      <Badge
                        variant={
                          failedCount > 0
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {failedCount}
                      </Badge>

                    </div>

                  </>

                )}

              </CardContent>

            </Card>

          </section>

        </div>

      </div>

    </div>
  );
}