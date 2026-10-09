import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  MessageSquare,
  MessageSquareCode,
  Search,
  FileCode2,
  History,
  Clock3,
  BookmarkCheck,
  CheckCircle2,
  Sparkles,
  Database,
  Send,
  Code2,
  ExternalLink,
  MousePointer2,
  FolderOpen,
  ShieldCheck,
  PanelLeft,
} from "lucide-react";
import { FaPython } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

const exampleQuestions = [
  "Where is authentication implemented?",
  "Explain how the API requests are handled.",
  "Which files are responsible for database operations?",
  "How does the frontend communicate with the backend?",
];

const capabilities = [
  {
    icon: MessageSquareCode,
    title: "Ask questions naturally",
    description:
      "Ask questions in plain English about functions, classes, APIs, database logic, and the overall project architecture.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: FileCode2,
    title: "Get answers with citations",
    description:
      "Explore the source files and code references used to support an answer, when those references are available.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: History,
    title: "Continue previous chats",
    description:
      "Use saved chat sessions to return to earlier discussions without having to start from scratch.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const workflow = [
  {
    number: "01",
    title: "Open your indexed repository",
    description:
      "Log in to CodeOrbit, open your repositories, and select a repository whose indexing has completed.",
    icon: FolderOpen,
  },
  {
    number: "02",
    title: "Click Chat and ask a question",
    description:
      "Open the repository chat and type a question about your code. Be specific about the feature, function, or behavior you want to understand.",
    icon: MessageSquare,
  },
  {
    number: "03",
    title: "Explore the answer and citations",
    description:
      "Read the explanation, open the referenced source files, and ask follow-up questions to understand the implementation.",
    icon: Search,
  },
  {
    number: "04",
    title: "Return to your chat history",
    description:
      "Use the chat history available in your application to revisit earlier discussions and continue where you left off.",
    icon: History,
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-500 sm:text-sm">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

/*
  Repository preview:
  Put your supplied screenshot at:
  public/images/repository-ready-card.png

  The overlay is illustrative. The real Chat button is in your screenshot.
*/
function RepositoryChatPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-8 rounded-[3rem] bg-violet-500/[0.08] blur-3xl" />
      <div className="absolute -inset-3 rounded-[2rem] bg-amber-500/[0.06] blur-2xl" />

      <div className="relative rounded-2xl border border-border/70 bg-card p-3 shadow-2xl sm:p-4">
        {/* Browser-style header */}
        <div className="flex items-center justify-between px-2 pb-4 pt-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>

          <span className="text-xs text-muted-foreground">
            CodeOrbit · Repositories
          </span>

          <Code2 size={15} className="text-muted-foreground" />
        </div>

        {/* Your actual uploaded repository screenshot */}
        <div className="relative">
  <img
    src="/images/repository-ready-card.png"
    alt="CodeOrbit repository card showing the ARGUSCORE.AI repository, Ready status, Python language, and Chat button"
    className="block w-full rounded-xl border border-border/70"
  />

  {/* Chat button pointer */}
  <div className="absolute bottom-[12%] right-[16%] flex items-center gap-1 sm:bottom-[12%] sm:right-[17%]">

  </div>
</div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 size={15} className="text-emerald-500" />
            Repository indexed
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs">
            <MessageSquare size={13} className="text-amber-500" />
            Open repository chat
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-5 flex max-w-sm items-center justify-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Database size={14} />
          Repository context
        </span>

        <ArrowRight size={14} className="text-amber-500" />

        <span className="flex items-center gap-1.5">
          <Bot size={14} />
          AI answers
        </span>
      </div>
    </div>
  );
}

function QuestionCard({ question, index }) {
  return (
    <div className="group flex items-start gap-3 rounded-xl border border-border/70 bg-background/60 p-4 transition hover:border-amber-500/30 hover:bg-card">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
        <MessageSquare size={15} />
      </div>

      <p className="flex-1 pt-1 text-sm leading-6">{question}</p>

      <ArrowUpRight
        size={16}
        className="mt-1 shrink-0 text-muted-foreground transition group-hover:text-amber-500"
      />
    </div>
  );
}

function AnswerPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/10">
      {/* Chat header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Bot size={21} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">
              Repository Assistant
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              ARGUSCORE.AI
            </p>
          </div>
        </div>

        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-1 text-xs text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Ready
        </span>
      </div>

      {/* Chat messages */}
      <div className="space-y-6 p-5 sm:p-6">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[90%] rounded-2xl rounded-br-sm bg-amber-500/10 px-4 py-3 text-sm leading-6">
            Where is the authentication logic implemented?
          </div>
        </div>

        {/* AI response */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-amber-500">
            <Sparkles size={17} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-semibold">CodeOrbit AI</span>

              <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                Example answer
              </span>
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              Authentication logic may be implemented in the service or
              controller layers, depending on your project architecture.
              Start by examining the classes responsible for login, token
              validation, and user authentication.
            </p>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The following source references illustrate how CodeOrbit can
              present files relevant to an answer. The actual files and line
              numbers depend on your repository and retrieved code.
            </p>

            {/* Citations */}
            <div className="mt-5 rounded-xl border border-border/70 bg-background/70 p-4">
              <div className="mb-3 flex items-center gap-2">
                <FileCode2 size={16} className="text-amber-500" />

                <h4 className="text-xs font-semibold">
                  Referenced source files
                </h4>
              </div>

              <div className="space-y-2">
                <a
                  href="#citation-example-auth-service"
                  onClick={(event) => event.preventDefault()}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 p-3 transition hover:border-amber-500/30"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Code2 size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">
                      AuthService.java
                    </p>

                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Example source reference · Lines 24–48
                    </p>
                  </div>

                  <ExternalLink
                    size={14}
                    className="shrink-0 text-muted-foreground"
                  />
                </a>

                <a
                  href="#citation-example-auth-controller"
                  onClick={(event) => event.preventDefault()}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 p-3 transition hover:border-amber-500/30"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <FileCode2 size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">
                      AuthController.java
                    </p>

                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Example source reference · Lines 12–30
                    </p>
                  </div>

                  <ExternalLink
                    size={14}
                    className="shrink-0 text-muted-foreground"
                  />
                </a>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
                These are illustrative examples, not verified files from
                ARGUSCORE.AI.
              </p>
            </div>

            {/* Follow-up prompt */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/70 bg-background/50 px-3 py-3">
              <Sparkles
                size={15}
                className="shrink-0 text-amber-500"
              />

              <p className="flex-1 text-xs text-muted-foreground">
                Ask a follow-up about the authentication flow...
              </p>

              <Send size={15} className="shrink-0 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryPreview() {
  const sessions = [
    {
      title: "Understanding authentication",
      time: "Today",
      active: true,
    },
    {
      title: "Explain the API architecture",
      time: "Yesterday",
      active: false,
    },
    {
      title: "Find database operations",
      time: "Earlier",
      active: false,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl">
      <div className="flex items-center gap-3 border-b border-border/70 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <History size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold">Chat history</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Previous repository conversations
          </p>
        </div>
      </div>

      <div className="p-3">
        {sessions.map((session) => (
          <div
            key={session.title}
            className={`flex items-start gap-3 rounded-xl p-3 ${
              session.active
                ? "border border-amber-500/20 bg-amber-500/[0.06]"
                : "border border-transparent hover:bg-muted/50"
            }`}
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground">
              <MessageSquare size={15} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {session.title}
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock3 size={12} />
                {session.time}
              </p>
            </div>

            {session.active && (
              <span className="mt-1 shrink-0 rounded-full bg-amber-500/10 px-2 py-1 text-[10px] text-amber-500">
                Current
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-border/70 p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BookmarkCheck size={15} className="text-emerald-500" />
          Return to previous conversations
        </div>
      </div>
    </div>
  );
}

export default function AskAnything() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/[0.06] blur-[120px]" />

        <div className="absolute right-0 top-[35%] h-80 w-80 rounded-full bg-violet-500/[0.06] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        {/* Navbar */}
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

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Code2 size={20} />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Code<span className="text-amber-500">Orbit</span>
            </span>
          </Link>
        </header>

        {/* Hero */}
        <section className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-3 py-1.5 text-xs font-medium text-violet-400">
              <Sparkles size={14} />
              YOUR AI CODING ASSISTANT
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Don't search every file.
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-violet-500 bg-clip-text text-transparent">
                Just ask your code.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Your repository holds the answers. Ask CodeOrbit AI how your
              project works, discover relevant source files, explore
              explanations with citations, and return to previous
              conversations through chat history.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5 hover:bg-amber-500"
              >
                Explore repositories
                <ArrowRight size={16} />
              </Link>

              <a
                href="#how-to-ask"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-5 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Learn how it works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Repository-aware questions
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Source references
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Chat history
              </span>
            </div>
          </div>

          <RepositoryChatPreview />
        </section>

        {/* Capabilities */}
        <section className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Meet your coding assistant"
            title="More than a simple chatbot"
            description="Explore your codebase through natural-language questions and use relevant source references to understand how your project works."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-border/70 bg-card/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-card sm:p-7"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* How to ask */}
        <section
          id="how-to-ask"
          className="scroll-mt-10 border-y border-border/60 py-16 sm:py-20"
        >
          <SectionHeading
            eyebrow="Your workflow"
            title="From repository to conversation"
            description="Follow these four steps to get useful answers about your indexed repository."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {workflow.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="group rounded-2xl border border-border/70 bg-card/50 p-6 transition hover:border-amber-500/30 hover:bg-card sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                      STEP {step.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition group-hover:scale-105">
                      <Icon size={21} />
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Example questions */}
        <section className="py-16 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.07] px-3 py-1.5 text-xs text-amber-500">
                <MessageSquareCode size={14} />
                EXAMPLE QUESTIONS
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Not sure what to ask?
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Start with a question about a feature you want to understand.
                You can then ask follow-up questions to explore the code
                further.
              </p>

              <div className="mt-7 flex items-start gap-3 rounded-xl border border-border/70 bg-card/50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  <Sparkles size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Helpful tip</p>

                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    Instead of asking "Explain everything", ask about a
                    particular function, file, feature, or execution flow.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {exampleQuestions.map((question, index) => (
                <QuestionCard
                  key={question}
                  question={question}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Citations demo */}
        <section className="border-t border-border/60 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Understand the answer"
            title="Answers with source citations"
            description="See how an AI response can present its explanation alongside the files relevant to your question."
          />

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <AnswerPreview />

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <FileCode2 size={23} />
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                Don't just read an answer. Explore its sources.
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                When CodeOrbit retrieves relevant code, its answer can include
                source references such as file paths and line numbers. These
                help you inspect the implementation behind the explanation.
              </p>

              <div className="mt-7 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Locate relevant files
                    </p>

                    <p className="mt-1 text-xs leading-6 text-muted-foreground">
                      Identify the source files associated with the answer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Inspect the referenced code
                    </p>

                    <p className="mt-1 text-xs leading-6 text-muted-foreground">
                      Follow file and line references when your chat
                      implementation provides working citation links.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Ask a more specific follow-up
                    </p>

                    <p className="mt-1 text-xs leading-6 text-muted-foreground">
                      Use the retrieved context to guide the next question.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chat history */}
        <section className="border-t border-border/60 py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-3 py-1.5 text-xs text-violet-400">
                <History size={14} />
                YOUR CONVERSATIONS
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Your previous questions, all in one place.
              </h2>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Return to previous repository discussions, revisit answers,
                and continue exploring the same project. If chat history is
                persisted by your CodeOrbit backend, your sessions can remain
                available across visits.
              </p>

              <div className="mt-7 space-y-4">
                <div className="flex items-start gap-3">
                  <Clock3
                    size={18}
                    className="mt-0.5 shrink-0 text-violet-400"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Pick up where you left off
                    </p>

                    <p className="mt-1 text-xs leading-6 text-muted-foreground">
                      Open an earlier conversation instead of repeating
                      the same questions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookmarkCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Keep project discussions organized
                    </p>

                    <p className="mt-1 text-xs leading-6 text-muted-foreground">
                      Use your repository's chat sessions to find previous
                      explanations and related discussions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <HistoryPreview />
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.09] via-card to-violet-500/[0.08] px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-amber-500/[0.08] blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
              <Bot size={28} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Your next answer is one question away.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Open an indexed repository, start a conversation with your AI
              coding assistant, and understand your code one question at a
              time.
            </p>

            <Link
              to="/dashboard"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5 hover:bg-amber-500"
            >
              Go to repositories
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} CodeOrbit. Built for understanding
            code.
          </p>

          <Link to="/" className="transition hover:text-foreground">
            Back to home ↑
          </Link>
        </footer>
      </div>
    </main>
  );
}