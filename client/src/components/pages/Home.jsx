import { Link } from "react-router-dom";

import {
  ArrowRight,
  FolderGit2,
  MessageSquareCode,
  Sparkles,
} from "lucide-react";

import { FaGithub } from "react-icons/fa6";

import { BrandMark } from "@/components/layout/app-shell";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getGithubLoginUrl } from "@/lib/api";

const features = [
  {
    title: "Connect GitHub",
    body: "Connect your GitHub account and securely access public and private repositories.",
    icon: FolderGit2,
  },
  {
    title: "Index with RAG",
    body: "Turn your codebase into searchable knowledge using embeddings and pgvector.",
    icon: Sparkles,
  },
  {
    title: "Ask anything",
    body: "Ask questions about your code and get grounded answers with source citations.",
    icon: MessageSquareCode,
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-background">
      {/* ================= BACKGROUND GRID ================= */}

      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)]
          bg-[size:48px_48px]
          [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]
        "
      />

      {/* ================= TOP GLOW ================= */}

      <div
        className="
          pointer-events-none absolute left-1/2 top-0
          h-[500px] w-[900px]
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-[120px]
        "
      />

      {/* ================= HEADER ================= */}

      <header
        className="
          relative z-20 mx-auto flex h-16 w-full
          max-w-6xl items-center justify-between px-5
        "
      >
        <BrandMark />

        <div className="flex items-center gap-6">
          <ModeToggle />

          <Link
            to="/login"
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "text-sm font-semibold"
            )}
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}

     {/* ================= MAIN ================= */}
<main className="relative z-10 mx-auto w-full max-w-6xl px-5">

{/* ================= HERO ================= */}
<section
  className="
    flex min-h-[calc(100svh-64px)]
    flex-col items-center justify-center
    text-center
    pb-20
  "
>
  {/* ================= BADGE ================= */}
  <div
    className="
      mb-5 inline-flex items-center gap-2
      rounded-full border
      bg-background/70
      px-3 py-1.5
      text-xs font-medium
      text-muted-foreground
      shadow-sm
      backdrop-blur
    "
  >
    <span className="size-1.5 rounded-full bg-emerald-500" />
    AI-powered codebase assistant
  </div>

  {/* ================= HEADING ================= */}
  <div className="w-full max-w-4xl text-center">
    <h1
      className="
        font-heading
        text-5xl font-semibold
        leading-[1.05]
        tracking-[-0.04em]
        sm:text-6xl
        md:text-7xl
      "
    >
      Understand your codebase
      <span className="block text-muted-foreground">
        like never before.
      </span>
    </h1>

    <p
      className="
        mx-auto mt-6
        max-w-2xl
        text-sm leading-7
        text-muted-foreground
        sm:text-lg
      "
    >
      Connect GitHub, index your repositories, and chat with your
      codebase using retrieval-augmented answers and clickable source
      citations.
    </p>
  </div>

  {/* ================= CTA ================= */}
  <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
    <a
      href={getGithubLoginUrl()}
      className={cn(
        buttonVariants({
          size: "lg",
        }),
        "h-11 gap-2 px-5 shadow-lg"
      )}
    >
      <FaGithub className="size-4" />
      Continue with GitHub
      <ArrowRight className="size-4" />
    </a>

    <Link
      to="/login"
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "lg",
        }),
        "h-11 bg-background/60 px-5 backdrop-blur"
      )}
    >
      See how it works
    </Link>
  </div>

  {/* ================= TRUST TEXT ================= */}
  <p className="mt-4 text-xs text-muted-foreground">
    Secure OAuth · Private repositories supported · Built for developers
  </p>
</section>

{/* ================= FEATURES ================= */}
<section className="grid w-full gap-4 pb-20 md:grid-cols-3">
  {features.map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.title}
        className="
          group relative overflow-hidden
          rounded-2xl border
          bg-card/60
          p-6
          shadow-sm
          backdrop-blur
          transition-all duration-300
          hover:-translate-y-1
          hover:bg-card/80
          hover:shadow-lg
        "
      >
        {/* Card glow */}
        <div
          className="
            pointer-events-none absolute
            -right-10 -top-10
            size-32
            rounded-full
            bg-primary/5
            blur-3xl
            transition-opacity
            group-hover:bg-primary/10
          "
        />

        {/* Icon */}
        <div
          className="
            relative mb-5 flex size-11
            items-center justify-center
            rounded-xl border
            bg-muted/70
          "
        >
          <Icon className="size-5" />
        </div>

        {/* Title */}
        <h2 className="relative font-heading text-base font-semibold">
          {item.title}
        </h2>

        {/* Description */}
        <p
          className="
            relative mt-2
            text-sm leading-6
            text-muted-foreground
          "
        >
          {item.body}
        </p>
      </div>
    );
  })}
</section>

</main>
    </div>
  );
}