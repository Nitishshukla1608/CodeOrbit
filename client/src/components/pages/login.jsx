import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import { GitHubIcon } from "@/components/icons/github-icon";
import { BrandMark } from "@/components/layout/app-shell";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/lib/utils";
import { getGithubLoginUrl } from "@/lib/api";
import { useCurrentUser } from "@/hooks/use-auth";


function LoginLoading() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}


function LoginContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const error = searchParams.get("error");
  const next = searchParams.get("next") || "/dashboard";

  const {
    data: user,
    isLoading,
  } = useCurrentUser();


  useEffect(() => {
    if (!isLoading && user) {
      const destination = next.startsWith("/")
        ? next
        : "/dashboard";

      navigate(destination, {
        replace: true,
      });
    }
  }, [user, isLoading, next, navigate]);


  if (isLoading) {
    return <LoginLoading />;
  }


  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-background">

      {/* Background effect */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_top,oklch(from_var(--primary)_l_c_h/0.1),transparent_55%)]
        "
      />

      {/* Header */}
      <header className="relative z-10 flex h-14 items-center justify-between px-4">

        <Link to="/">
          <BrandMark />
        </Link>

        <ModeToggle />

      </header>


      {/* Main */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">

        <Card
          className="
            w-full
            max-w-sm
            border-border/70
            bg-card/90
            shadow-lg
            shadow-foreground/5
            backdrop-blur-xl
          "
        >

          {/* Card Header */}
          <CardHeader className="space-y-4 text-center">

            <div
              className="
                mx-auto
                flex
                size-12
                items-center
                justify-center
                rounded-2xl
                bg-foreground
                text-background
              "
            >
              <GitHubIcon className="size-6" />
            </div>


            <div className="space-y-1">

              <CardTitle className="text-xl">
                Sign in
              </CardTitle>

              <CardDescription>
                Connect GitHub to chat with your repositories.
              </CardDescription>

            </div>

          </CardHeader>


          {/* Card Content */}
          <CardContent className="space-y-4">

            {/* Error */}
            {error && (
              <Alert variant="destructive">

                <AlertCircle />

                <AlertTitle>
                  Sign-in failed
                </AlertTitle>

                <AlertDescription>
                  Please try again.
                </AlertDescription>

              </Alert>
            )}


            {/* GitHub Login */}
            <a
              href={getGithubLoginUrl()}
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                `
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  bg-foreground
                  text-background
                  hover:bg-foreground/90
                `
              )}
            >

              <GitHubIcon className="size-5" />

              Continue with GitHub

            </a>

          </CardContent>

        </Card>

      </main>

    </div>
  );
}


export default function Login() {
  return <LoginContent />;
}