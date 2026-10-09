import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowRight,
    CheckCircle2,
    FileCode2,
    Loader2,
    Sparkles,
  } from "lucide-react";
  
import { FaGithub } from "react-icons/fa6";;

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RepositoryPage() {
  const navigate = useNavigate();

  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleAnalyze = async (event) => {
    event.preventDefault();

    setError("");

    if (!repoUrl.trim()) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    if (!repoUrl.includes("github.com/")) {
      setError("Please enter a valid GitHub repository URL.");
      return;
    }

    try {
      setStatus("indexing");
      setProgress(10);

      // -----------------------------------------
      // Call your Spring Boot backend
      // -----------------------------------------

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/repositories/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            url: repoUrl.trim(),
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.message || "Failed to analyze repository."
        );
      }

      const data = await response.json();

      setProgress(100);
      setStatus("completed");

      // -----------------------------------------
      // Redirect to chat
      // -----------------------------------------

      setTimeout(() => {
        navigate(`/repositories/${data.repositoryId}/chat`);
      }, 700);
    } catch (err) {
      setStatus("error");
      setError(
        err.message || "Something went wrong while indexing."
      );
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Background */}

      <div className="pointer-events-none fixed inset-0 opacity-[0.18]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                hsl(var(--border)) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                hsl(var(--border)) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
      </div>

      {/* Content */}

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6">
        {/* Header */}

        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2.5">
          <FaGithub className="h-5 w-5" />

            <span className="font-semibold tracking-tight">
              CodeOrbit
            </span>
          </div>

          <span className="text-sm text-muted-foreground">
            Repository Analyzer
          </span>
        </header>

        {/* Main */}

        <section className="flex flex-1 items-center justify-center pb-20">
          <div className="w-full max-w-2xl">
            {/* =================================================
                IDLE STATE
            ================================================= */}

            {status === "idle" && (
              <div className="text-center">
                {/* Icon */}

                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/40">
                  <Sparkles className="h-7 w-7 text-emerald-500" />
                </div>

                {/* Heading */}

                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Analyze a repository
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                  Paste a GitHub repository and CodeOrbit will index
                  the code so you can ask questions about it using AI.
                </p>

                {/* Form */}

                <form
                  onSubmit={handleAnalyze}
                  className="mt-9"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {/* URL input */}

                    <div className="relative flex-1">
                    <FaGithub className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                      <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/user/repository"
                        className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    {/* Button */}

                    <button
                      type="submit"
                      className={cn(
                        buttonVariants({
                          size: "lg",
                        }),
                        "h-12 rounded-xl px-6"
                      )}
                    >
                      Analyze

                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>

                  {/* Error */}

                  {error && (
                    <p className="mt-3 text-left text-sm text-red-500">
                      {error}
                    </p>
                  )}
                </form>

                {/* Info */}

                <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span>✓ GitHub repository</span>
                  <span>✓ RAG indexing</span>
                  <span>✓ AI-powered chat</span>
                </div>
              </div>
            )}

            {/* =================================================
                INDEXING STATE
            ================================================= */}

            {status === "indexing" && (
              <div className="text-center">
                {/* Loading icon */}

                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <Loader2 className="h-7 w-7 animate-spin text-emerald-500" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight">
                  Understanding your repository...
                </h1>

                <p className="mt-3 text-sm text-muted-foreground">
                  CodeOrbit is preparing your code for AI-powered
                  questions.
                </p>

                {/* Progress */}

                <div className="mx-auto mt-9 max-w-md">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      Indexing repository
                    </span>

                    <span className="font-medium">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Steps */}

                <div className="mx-auto mt-9 max-w-md space-y-3 text-left">
                  <IndexStep
                    done={progress >= 30}
                    active={progress < 30}
                    icon={Github}
                    text="Reading repository"
                  />

                  <IndexStep
                    done={progress >= 60}
                    active={progress >= 30 && progress < 60}
                    icon={FileCode2}
                    text="Processing code files"
                  />

                  <IndexStep
                    done={progress >= 90}
                    active={progress >= 60 && progress < 90}
                    icon={Sparkles}
                    text="Creating AI knowledge"
                  />
                </div>
              </div>
            )}

            {/* =================================================
                COMPLETED STATE
            ================================================= */}

            {status === "completed" && (
              <div className="text-center">
                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>

                <h1 className="text-3xl font-semibold">
                  Repository is ready
                </h1>

                <p className="mt-3 text-sm text-muted-foreground">
                  Redirecting you to your AI coding assistant...
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/*
 * Small indexing step component
 */

function IndexStep({
  done,
  active,
  icon: Icon,
  text,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg",
          done
            ? "bg-emerald-500/10 text-emerald-500"
            : active
              ? "bg-muted text-foreground"
              : "bg-muted/50 text-muted-foreground"
        )}
      >
        {done ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>

      <span
        className={cn(
          "text-sm",
          done || active
            ? "text-foreground"
            : "text-muted-foreground"
        )}
      >
        {text}
      </span>

      {active && (
        <Loader2 className="ml-auto h-4 w-4 animate-spin text-emerald-500" />
      )}
    </div>
  );
}