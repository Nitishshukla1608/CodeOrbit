import RequireAuth from "@/components/providers/require-auth";
import AppShell from "@/components/layout/app-shell";
import RepoDashboard from "../dashboard/repo-dashboard";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <AppShell hideHeader>
        <RepoDashboard />
      </AppShell>
    </RequireAuth>
  );
}