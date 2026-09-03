import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isFetched,
  } = useCurrentUser();

  useEffect(() => {
    if (!isFetched || isLoading) return;

    // User is already logged in
    if (user) {
      navigate("/dashboard", { replace: true });
      return;
    }

    // No user/session → login page
    const timer = setTimeout(() => {
      navigate("/login?error=session", { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, isLoading, isFetched, navigate]);

  // Only shown while waiting for the redirect
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3">
      <Spinner className="size-6" />

      <p className="text-sm text-muted-foreground">
        Finishing GitHub sign-in…
      </p>
    </div>
  );
}