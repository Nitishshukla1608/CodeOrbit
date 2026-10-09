import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Code2,
  ExternalLink,
  FileCode2,
  FolderGit2,
  GitBranch,
  KeyRound,
  Loader2,
  LockKeyhole,
  MessageSquareCode,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
  ChevronRight,
} from "lucide-react";

import { FaGithub } from "react-icons/fa6";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

const steps = [
  {
    number: "01",
    title: "Connect GitHub",
    description: "Authorize access to the repositories you want to analyze.",
  },
  {
    number: "02",
    title: "Choose a repository",
    description: "Select a repository or paste its GitHub URL.",
  },
  {
    number: "03",
    title: "Index your code",
    description: "Prepare your source code for semantic search.",
  },
  {
    number: "04",
    title: "Start chatting",
    description: "Ask questions and explore your codebase.",
  },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {steps.map((step, index) => {
        const completed = index + 1 < currentStep;
        const active = index + 1 === currentStep;

        return (
          <div key={step.number} className="min-w-0">
            <div
              className={`mb-3 h-1 rounded-full transition-colors ${
                completed || active
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />

            <p
              className={`text-xs font-semibold ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.number}
            </p>

            <p
              className={`mt-1 hidden text-xs sm:block ${
                active ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50">
        <Icon className="size-5 text-foreground" />
      </div>

      <div>
        <h2 className="text-base font-semibold">{title}</h2>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function StatusMessage({ type, children }) {
  const styles = {
    success:
      "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400",
    error:
      "border-destructive/20 bg-destructive/5 text-destructive",
    info:
      "border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-400",
  };

  const Icon =
    type === "success"
      ? CheckCircle2
      : type === "error"
        ? XCircle
        : CircleHelp;

  return (
    <div
      className={`flex items-start gap-2 rounded-xl border p-3 text-sm leading-6 ${styles[type]}`}
      role={type === "error" ? "alert" : "status"}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export default function ConnectGitHubPage() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);
  const [githubUser, setGithubUser] = useState(null);

  const [repoUrl, setRepoUrl] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [indexing, setIndexing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [currentStep, setCurrentStep] = useState(1);

  function validateGitHubUrl(value) {
    try {
      const url = new URL(value.trim());

      if (url.hostname !== "github.com") {
        return false;
      }

      const parts = url.pathname
        .split("/")
        .filter(Boolean);

      return (
        parts.length >= 2 &&
        !["settings", "login", "signup", "features"].includes(
          parts[0].toLowerCase()
        )
      );
    } catch {
      return false;
    }
  }

  function parseGitHubUrl(value) {
    const url = new URL(value.trim());

    const parts = url.pathname
      .split("/")
      .filter(Boolean);

    return {
      owner: parts[0],
      name: parts[1].replace(/\.git$/, ""),
      fullName: `${parts[0]}/${parts[1].replace(/\.git$/, "")}`,
      url: `https://github.com/${parts[0]}/${parts[1].replace(/\.git$/, "")}`,
    };
  }

  function connectGitHub() {
    setError("");

    /*
      Replace this with your existing GitHub OAuth helper.
      For CodeOrbit, you can reuse getGithubLoginUrl().
    */

    const loginUrl =
      `${API_URL}/oauth2/authorization/github`;

    window.location.assign(loginUrl);
  }

  function handleRepositorySubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSelectedRepo(null);

    if (!repoUrl.trim()) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    if (!validateGitHubUrl(repoUrl)) {
      setError(
        "Enter a valid GitHub repository URL, such as https://github.com/owner/repository."
      );
      return;
    }

    const repository = parseGitHubUrl(repoUrl);

    setSelectedRepo(repository);
    setCurrentStep(3);

    setSuccess(
      "Repository URL validated. You can now start indexing if the backend supports this repository."
    );
  }

  async function indexRepository() {
    if (!selectedRepo) {
      setError("Please select a repository first.");
      return;
    }

    setLoading(true);
    setIndexing(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/api/repositories/analyze`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: selectedRepo.url,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to index the repository."
        );
      }

      /*
        Adjust this mapping to match your actual backend response.
        Support common repository ID property names.
      */
      const repositoryId =
        data.repositoryId ??
        data.repoId ??
        data.id ??
        data.repository?.id;

      if (repositoryId == null) {
        throw new Error(
          "Indexing response did not contain a repository ID. Update the frontend to match your backend response."
        );
      }

      setCurrentStep(4);

      /*
        Update this route if your existing chat page uses a different path.
      */
      navigate(`/chat/${repositoryId}`);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while indexing the repository."
      );
    } finally {
      setLoading(false);
      setIndexing(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute right-0 top-1/2 size-80 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            Secure repository access
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-3xl pb-10 pt-14 text-center sm:pt-20">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
            <FaGithub className="size-8" />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Your codebase, understood
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Connect your GitHub
            <span className="mt-2 block bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
              and start exploring.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Connect the repository you want to understand. CodeOrbit
            indexes the code and helps you ask questions, trace logic,
            and explore the implementation using AI.
          </p>
        </section>

        {/* Main content */}
        <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[1fr_320px]">
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Progress */}
            <div className="border-b border-border p-5 sm:p-7">
              <StepIndicator currentStep={currentStep} />
            </div>

            <div className="space-y-8 p-5 sm:p-7">
              {/* Step 1: GitHub */}
              <section>
                <SectionHeading
                  icon={FaGithub}
                  title="Connect your GitHub account"
                  description="Authorize CodeOrbit to access the repositories you want to analyze."
                />

                <div className="mt-5 rounded-2xl border border-border bg-muted/20 p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-card">
                        <FaGithub className="size-6" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          GitHub account
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {connected
                            ? githubUser?.login
                              ? `Connected as @${githubUser.login}`
                              : "GitHub connected"
                            : "Not connected yet"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={connectGitHub}
                      disabled={connected}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {connected ? (
                        <>
                          <Check className="size-4" />
                          Connected
                        </>
                      ) : (
                        <>
                          <FaGithub className="size-4" />
                          Connect GitHub
                          <ArrowRight className="size-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 flex items-start gap-2 border-t border-border pt-4">
                    <LockKeyhole className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <p className="text-xs leading-6 text-muted-foreground">
                      GitHub OAuth permissions determine which repositories
                      CodeOrbit can access. Private repository access requires
                      explicit authorization. Never paste your GitHub access
                      token into this page.
                    </p>
                  </div>
                </div>
              </section>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Step 2: Repository URL */}
              <section>
                <SectionHeading
                  icon={FolderGit2}
                  title="Choose the repository"
                  description="Paste the URL of the exact repository you want to chat with."
                />

                <form
                  onSubmit={handleRepositorySubmit}
                  className="mt-5 space-y-4"
                >
                  <label
                    htmlFor="repository-url"
                    className="text-sm font-medium"
                  >
                    GitHub repository URL
                  </label>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                      <FaGithub className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id="repository-url"
                        type="url"
                        value={repoUrl}
                        onChange={(event) => {
                          setRepoUrl(event.target.value);
                          setError("");
                          setSuccess("");
                          setSelectedRepo(null);
                        }}
                        placeholder="https://github.com/owner/repository"
                        autoComplete="url"
                        className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <Search className="size-4" />
                      Validate URL
                    </button>
                  </div>

                  <p className="text-xs leading-5 text-muted-foreground">
                    Example: github.com/spring-projects/spring-boot
                  </p>

                  {error && (
                    <StatusMessage type="error">
                      {error}
                    </StatusMessage>
                  )}

                  {success && (
                    <StatusMessage type="success">
                      {success}
                    </StatusMessage>
                  )}
                </form>

                {/* Selected repository */}
                {selectedRepo && (
                  <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-background">
                        <FolderGit2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="break-all text-sm font-semibold">
                            {selectedRepo.fullName}
                          </h3>

                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="size-3" />
                            URL validated
                          </span>
                        </div>

                        <a
                          href={selectedRepo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1 break-all text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {selectedRepo.url}
                          <ExternalLink className="size-3 shrink-0" />
                        </a>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-border bg-background p-3">
                        <div className="flex items-center gap-2">
                          <Code2 className="size-4 text-primary" />
                          <span className="text-xs font-medium">
                            Source code
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                          Files will be prepared for indexing.
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-background p-3">
                        <div className="flex items-center gap-2">
                          <MessageSquareCode className="size-4 text-primary" />
                          <span className="text-xs font-medium">
                            AI chat
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                          Ask questions after indexing succeeds.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={indexRepository}
                      disabled={loading || indexing}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading || indexing ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Indexing repository...
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4" />
                          Index repository & start chatting
                          <ArrowRight className="size-4" />
                        </>
                      )}
                    </button>

                    <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                      Chat becomes available when the backend confirms
                      successful indexing.
                    </p>
                  </div>
                )}
              </section>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />

                <h2 className="text-sm font-semibold">
                  What happens next?
                </h2>
              </div>

              <div className="mt-5 space-y-5">
                {[
                  {
                    icon: GitBranch,
                    title: "Fetch repository",
                    description: "Read the source files you have permission to access.",
                  },
                  {
                    icon: FileCode2,
                    title: "Index the code",
                    description: "Chunk files and generate embeddings for retrieval.",
                  },
                  {
                    icon: MessageSquareCode,
                    title: "Start a conversation",
                    description: "Ask questions about classes, functions, and architecture.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-4 text-primary" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-500" />

                <h2 className="text-sm font-semibold">
                  Privacy & permissions
                </h2>
              </div>

              <ul className="mt-4 space-y-3">
                {[
                  "Only access repositories permitted by your authorization.",
                  "Private repositories need appropriate GitHub permissions.",
                  "Never expose OAuth tokens in frontend code.",
                  "Restrict retrieval to the selected repository.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <div className="flex items-center gap-2">
                <KeyRound className="size-4 text-muted-foreground" />

                <h2 className="text-sm font-semibold">
                  Public or private?
                </h2>
              </div>

              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Public repositories may be readable without account
                authorization, depending on the backend implementation.
                Private repositories require valid credentials and
                repository permissions.
              </p>

              <a
                href="https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-foreground hover:text-primary"
              >
                Learn about GitHub OAuth
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mx-auto mt-12 flex max-w-5xl flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>CodeOrbit · Understand code, not just files.</p>

          <Link
            to="/see-how-it-works"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            How CodeOrbit works
            <ChevronRight className="size-3.5" />
          </Link>
        </footer>
      </div>
    </main>
  );
}