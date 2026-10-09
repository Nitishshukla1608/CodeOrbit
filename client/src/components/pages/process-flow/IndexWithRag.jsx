import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  Filter,
  LockKeyhole,
  GitBranch,
  FileCode2,
  Sparkles,
  Database,
  MessageSquareCode,
  CheckCircle2,
  CircleHelp,
  Layers3,
  Zap,
  Code2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";



const steps = [
  {
    number: "01",
    title: "Connect your GitHub account",
    description:
      "Log in to CodeOrbit and authorize GitHub access. This allows CodeOrbit to discover the repositories your account can access.",
    icon: FaGithub,
    color: "text-blue-400",
    background: "bg-blue-500/10",
  },
  {
    number: "02",
    title: "Find and index your repository",
    description:
      "Browse your repositories, use search and filters to find the right project, and click Index. CodeOrbit processes your code for semantic search.",
    icon: Layers3,
    color: "text-amber-400",
    background: "bg-amber-500/10",
  },
  {
    number: "03",
    title: "Ask questions about your code",
    description:
      "Once indexing is complete, open the repository chat. Ask questions about functions, files, architecture, bugs, or how different parts of your project work.",
    icon: MessageSquareCode,
    color: "text-violet-400",
    background: "bg-violet-500/10",
  },
];

const benefits = [
  {
    icon: Search,
    title: "Search by meaning",
    description:
      "Find relevant code using natural-language questions instead of searching only for exact keywords.",
  },
  {
    icon: FileCode2,
    title: "Understand your codebase",
    description:
      "Explore functions, classes, files, and the relationships between different parts of your project.",
  },
  {
    icon: Database,
    title: "Context-aware answers",
    description:
      "Indexed code helps retrieve relevant context for your questions. Answers can include source references when supported.",
  },
];

function RepositoryPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-[3rem] bg-amber-500/10 blur-3xl" />
      <div className="absolute -inset-3 rounded-[2rem] bg-violet-500/5 blur-2xl" />

      {/* Repository card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/20">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border/70 p-5 sm:p-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-300 text-sm font-black text-black">
              JS
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm text-muted-foreground">
                Nitishshukla1608
              </p>
              <h3 className="truncate text-lg font-semibold tracking-tight">
                Pixio
              </h3>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            Not indexed
          </span>
        </div>

        {/* Description */}
        <div className="border-b border-border/70 p-5 sm:p-6">
          <p className="text-sm text-muted-foreground">
            No description provided.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
              <LockKeyhole size={13} />
              Private
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
              <GitBranch size={13} />
              master
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-300 text-[10px] font-black text-black">
                JS
              </span>
              JavaScript
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-5 sm:p-6">
          <div className="inline-flex items-center gap-2 text-sm font-semibold">
            <FaGithub size={18} />
            GitHub
            <ArrowUpRight
              size={13}
              className="text-muted-foreground"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-amber-500"
          >
            <Sparkles size={15} />
            Index
          </button>
        </div>
      </div>

      {/* Bottom information */}
      <div className="relative mx-auto mt-5 flex max-w-md items-center justify-center gap-3 text-xs text-muted-foreground sm:gap-5">
        <span className="flex items-center gap-1.5">
          <Code2 size={15} />
          Code chunks
        </span>

        <ArrowRight size={15} className="text-amber-500" />

        <span className="flex items-center gap-1.5">
          <Layers3 size={15} />
          Embeddings
        </span>

        <ArrowRight size={15} className="text-amber-500" />

        <span className="flex items-center gap-1.5">
          <Database size={15} />
          Vector store
        </span>
      </div>
    </div>
  );
}

export default function IndexWithRag() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-[35%] h-80 w-80 rounded-full bg-violet-500/[0.06] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        {/* Navigation */}
        <header className="flex items-center justify-between border-b border-border/60 py-5">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to home
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
              <Code2 size={18} />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Code<span className="text-amber-500">Orbit</span>
            </span>
          </div>
        </header>

        {/* Hero */}
        <section className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.07] px-3 py-1.5 text-xs font-medium text-amber-500">
              <Sparkles size={14} />
              YOUR GUIDE TO CODEORBIT
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Your codebase.
              <br />
              Your questions.
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                One conversation.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Connect your GitHub account, index a repository, and turn your
              codebase into something you can explore using natural language.
              No need to manually search through hundreds of files.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/connect-github"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5 hover:bg-amber-500"
              >
                Get started
                <ArrowRight size={16} />
              </Link>

              <a
                href="#steps"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-5 py-3 text-sm font-medium transition hover:bg-muted"
              >
                See how it works
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Guided workflow
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Natural-language questions
              </span>
            </div>
          </div>

          <div className="relative">
            <RepositoryPreview />
          </div>
        </section>

        {/* Workflow steps */}
        <section id="steps" className="scroll-mt-10 py-16">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
              Simple workflow
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From GitHub to answers in three steps
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Follow this workflow to start exploring your repository with
              CodeOrbit.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="group relative rounded-2xl border border-border/70 bg-card/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-card sm:p-7"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <span className="text-sm font-semibold tracking-widest text-muted-foreground/60">
                      STEP {step.number}
                    </span>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.background} ${step.color}`}
                    >
                      <Icon size={21} />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>

                  <div className="mt-6 h-px w-full bg-gradient-to-r from-border via-border/50 to-transparent" />

                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition group-hover:text-foreground">
                    {step.number === "01"
                      ? "Authorize access"
                      : step.number === "02"
                        ? "Prepare your code"
                        : "Start exploring"}

                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </article>
              );
            })}
          </div>
        </section>

        {/* Detailed indexing explanation */}
        <section className="grid items-center gap-10 border-y border-border/60 py-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
              <Zap size={14} className="text-amber-500" />
              UNDERSTANDING INDEXING
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              What happens when you click{" "}
              <span className="text-amber-500">Index?</span>
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              CodeOrbit prepares your repository so relevant code can be
              retrieved when you ask a question. Instead of relying only on
              keyword matching, a retrieval-augmented generation (RAG)
              workflow can use the meaning of your question to find useful
              code context.
            </p>

            <div className="mt-7 space-y-5">
              {[
                {
                  title: "1. Repository processing",
                  body: "Your repository files are fetched and prepared for analysis.",
                },
                {
                  title: "2. Code chunking and embeddings",
                  body: "Supported files are divided into smaller chunks and represented as embeddings.",
                },
                {
                  title: "3. Searchable code context",
                  body: "The processed representations help retrieve relevant code when you ask questions.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-1 shrink-0 text-emerald-500"
                  />

                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline visual */}
          <div className="rounded-2xl border border-border/70 bg-card/50 p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Indexing pipeline
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  From files to searchable context
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <Layers3 size={20} />
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: FaGithub,
                  title: "GitHub repository",
                  subtitle: "Your source code and project files",
                  color: "text-foreground",
                  bg: "bg-muted",
                },
                {
                  icon: Code2,
                  title: "Code chunks",
                  subtitle: "Smaller, meaningful sections of code",
                  color: "text-blue-400",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: Layers3,
                  title: "Embeddings",
                  subtitle: "Numerical representations of code",
                  color: "text-amber-400",
                  bg: "bg-amber-500/10",
                },
                {
                  icon: Database,
                  title: "Vector store",
                  subtitle: "Searchable representations for retrieval",
                  color: "text-violet-400",
                  bg: "bg-violet-500/10",
                },
              ].map((item, index, array) => {
                const Icon = item.icon;

                return (
                  <React.Fragment key={item.title}>
                    <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/60 p-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                      >
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {item.subtitle}
                        </p>
                      </div>

                      <CheckCircle2
                        size={17}
                        className="ml-auto shrink-0 text-muted-foreground/60"
                      />
                    </div>

                    {index < array.length - 1 && (
                      <div className="ml-9 h-4 border-l border-dashed border-border" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <p className="mt-5 text-xs leading-5 text-muted-foreground">
              Exact processing steps depend on your CodeOrbit backend
              implementation and the file types it supports.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
              Why index your repository?
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Understand more. Search less.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-border/70 bg-card/50 p-6 transition hover:border-border hover:bg-card"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 font-semibold">{benefit.title}</h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/60 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-9 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-amber-500">
                <CircleHelp size={17} />
                Frequently asked questions
              </div>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                A few things to know
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  question: "Do I need to log in before indexing?",
                  answer:
                    "Yes. Log in to CodeOrbit first, then connect or authorize your GitHub account if prompted. You can then access repositories permitted by your GitHub authorization.",
                },
                {
                  question: "How do I find a particular repository?",
                  answer:
                    "Open the repository listing and use the available search and filter controls, such as repository name, language, visibility, or indexing status, depending on what your dashboard supports.",
                },
                {
                  question: "Can I ask questions immediately after clicking Index?",
                  answer:
                    "Wait until the repository indexing process finishes and its status changes to indicate that it is ready. Then open the repository chat and ask your question.",
                },
                {
                  question: "Can I index a private repository?",
                  answer:
                    "Private repositories may be available if you authorize the required GitHub permissions and your CodeOrbit integration supports access to them.",
                },
                {
                  question: "What kind of questions can I ask?",
                  answer:
                    "For example: Where is authentication implemented? Which function handles API requests? How does this component work? Where is a particular class used?",
                },
              ].map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-border/70 bg-card/40 p-5 open:bg-card/80"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                    {faq.question}

                    <ArrowRight
                      size={16}
                      className="shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                    />
                  </summary>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.09] via-card to-violet-500/[0.07] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-amber-500/[0.08] blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
              <MessageSquareCode size={27} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to talk to your code?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
              Connect your GitHub account, choose a repository, index it, and
              start exploring your project with questions in plain English.
            </p>

            <Link
              to="/connect-github"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5 hover:bg-amber-500"
            >
              Connect GitHub
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} CodeOrbit. Explore your codebase
            smarter.
          </p>

          <Link
            to="/"
            className="transition hover:text-foreground"
          >
            Back to home ↑
          </Link>
        </footer>
      </div>
    </main>
  );
}