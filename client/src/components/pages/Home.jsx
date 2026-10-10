import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  FolderGit2,
  MessageSquareCode,
  Sparkles,
  X,
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
    link:"/connect-github"
  },
  {
    title: "Index with RAG",
    body: "Turn your codebase into searchable knowledge using embeddings and pgvector.",
    icon: Sparkles,
    link:"/index-with-rag"
  },
  {
    title: "Ask anything",
    body: "Ask questions about your code and get grounded answers with source citations.",
    icon: MessageSquareCode,
    link:"/ask-anything"
  },
];

export default function HomePage() {
  // ============================================================
  // ONBOARDING STATE
  // ============================================================

  const [showOnboarding, setShowOnboarding] = useState(false);

  // 1 = Welcome
  // 2 = GitHub CTA
  // 3 = Sign in
  // 4 = MessageSquareCode
  const [step, setStep] = useState(1);

  // ============================================================
  // TARGET REFERENCES
  // ============================================================

  const githubCtaRef = useRef(null);
  const signInRef = useRef(null);
  const messageIconRef = useRef(null);

  const [targetRect, setTargetRect] = useState(null);

  // ============================================================
  // SHOW ONBOARDING
  // ============================================================

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(
      "codeorbit_onboarding_seen"
    );

    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  // ============================================================
  // GET CURRENT TARGET ELEMENT
  // ============================================================

  const getCurrentTarget = () => {
    if (step === 2) {
      return githubCtaRef.current;
    }

    if (step === 3) {
      return signInRef.current;
    }

    if (step === 4) {
      return messageIconRef.current;
    }

    return null;
  };

  // ============================================================
  // CALCULATE SPOTLIGHT POSITION
  // ============================================================

  useEffect(() => {
    if (!showOnboarding || step === 1) {
      setTargetRect(null);
      return;
    }

    const updateTargetPosition = () => {
      const element = getCurrentTarget();

      if (!element) return;

      const rect = element.getBoundingClientRect();

      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    // Initial calculation
    updateTargetPosition();

    // Update when browser changes
    window.addEventListener("resize", updateTargetPosition);
    window.addEventListener("scroll", updateTargetPosition);

    return () => {
      window.removeEventListener("resize", updateTargetPosition);
      window.removeEventListener("scroll", updateTargetPosition);
    };
  }, [showOnboarding, step]);

  // ============================================================
  // STEP HANDLERS
  // ============================================================

  const handleNext = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const handleBack = () => {
    setStep((currentStep) => currentStep - 1);
  };

  const handleFinish = () => {
    localStorage.setItem("codeorbit_onboarding_seen", "true");
    setShowOnboarding(false);
  };

  const handleSkip = () => {
    localStorage.setItem("codeorbit_onboarding_seen", "true");
    setShowOnboarding(false);
  };

  // ============================================================
  // STEP CONTENT
  // ============================================================

  const stepData = {
    2: {
      label: "Step 2",
      title: "Connect your GitHub",
      description:
        "Start by connecting GitHub. CodeOrbit will use your repositories as the knowledge source for your AI coding assistant.",
    },

    3: {
      label: "Step 3",
      title: "Sign in to CodeOrbit",
      description:
        "Use the sign in option anytime to access your CodeOrbit workspace and continue working with your repositories.",
    },

    4: {
      label: "Step 4",
      title: "Your AI coding assistant",
      description:
        "Use this assistant to interact with your codebase, ask questions, and understand your project faster.",
    },
  };

  // ============================================================
  // TOOLTIP POSITION
  // ============================================================

  const getTooltipStyle = () => {
    if (!targetRect) {
      return {};
    }

    const tooltipWidth = 380;
    const tooltipHeight = 300;
    const gap = 28;

    // ----------------------------------------------------------
    // Horizontal position
    // ----------------------------------------------------------

    let left =
      targetRect.left + targetRect.width / 2 - tooltipWidth / 2;

    left = Math.max(
      20,
      Math.min(
        left,
        window.innerWidth - tooltipWidth - 20
      )
    );

    // ----------------------------------------------------------
    // Vertical position
    // ----------------------------------------------------------

    const spaceBelow =
      window.innerHeight - targetRect.top - targetRect.height;

    const spaceAbove = targetRect.top;

    // If enough space below
    if (spaceBelow >= tooltipHeight + gap) {
      return {
        left,
        top: targetRect.top + targetRect.height + gap,
      };
    }

    // Otherwise show above
    if (spaceAbove >= tooltipHeight + gap) {
      return {
        left,
        top: targetRect.top - gap,
        transform: "translateY(-100%)",
      };
    }

    // Fallback: center vertically
    return {
      left,
      top: Math.max(
        20,
        window.innerHeight / 2 - tooltipHeight / 2
      ),
    };
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* ========================================================
          BACKGROUND GRID
      ========================================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
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
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      {/* Top glow */}

      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* ========================================================
          HEADER
      ========================================================= */}

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2.5"
        >
          <BrandMark />

        
        </Link>

        {/* Header right */}

        <div className="flex items-center gap-3">
          {/* ==================================================
              MESSAGE SQUARE CODE
              STEP 4 TARGET
          =================================================== */}

          <div
            ref={messageIconRef}
            className="hidden rounded-lg p-2 sm:block mr-4"
          >
           <Link to="/direct-scrapper"> <MessageSquareCode className="h-5 w-5 text-amber-600 font-bold" /></Link>
          </div>

          <ModeToggle className="mr-4"/>

          {/* ==================================================
              SIGN IN
              STEP 3 TARGET
          =================================================== */}

          <Link
            ref={signInRef}
            to="/login"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
              }),
              "ml-5"
            )}
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* ========================================================
          HERO
      ========================================================= */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col items-center justify-center px-6 pb-20 pt-16 text-center">
        {/* Badge */}

        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-xs font-medium text-emerald-500">
          <Sparkles className="h-3.5 w-3.5" />

          <span>AI-powered codebase assistant</span>
        </div>

        {/* Heading */}

        <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
          Understand your codebase
          <br />

          <span className="text-muted-foreground">
            like never before.
          </span>
        </h1>

        {/* Description */}

        <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Connect your GitHub repositories, index your code with
          RAG, and ask questions in natural language. Get grounded
          answers with precise source citations.
        </p>

        {/* =====================================================
            MAIN CTA
        ====================================================== */}

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          {/* ==================================================
              CONTINUE WITH GITHUB
              STEP 2 TARGET
          =================================================== */}

          <a
            ref={githubCtaRef}
            href={getGithubLoginUrl()}
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "group min-w-[220px] gap-2 rounded-xl px-6 shadow-lg shadow-emerald-500/10"
            )}
          >
            <FaGithub className="h-5 w-5" />

            <span>Continue with GitHub</span>

            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          {/* See how it works */}

          <Link
            to="/see-how-it-works"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "rounded-xl px-6"
            )}
          >
            See how it works
          </Link>
        </div>

        {/* Trust text */}

        <p className="mt-5 text-xs text-muted-foreground">
          Secure OAuth · Private repositories supported · Built for developers
        </p>

        {/* =====================================================
            FEATURES
        ====================================================== */}

        <div
          id="how-it-works"
          className="mt-24 grid w-full max-w-5xl gap-4 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
              to={feature.link}
                key={feature.title}
                className="group rounded-2xl border border-border/60 bg-background/60 p-6 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-background/80"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/40">
                  <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>

                <h3 className="font-semibold tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.body}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          ONBOARDING
      ========================================================= */}

      {showOnboarding && (
        <div className="fixed inset-0 z-[100]">
          {/* ====================================================
              STEP 1 — WELCOME
          ===================================================== */}

          {step === 1 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/75 px-5 backdrop-blur-md">
              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 text-center shadow-2xl">
                {/* Close */}

                <button
                  onClick={handleSkip}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition hover:bg-white/5 hover:text-white"
                  aria-label="Close onboarding"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Mascot */}

                <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/5 shadow-[0_0_60px_rgba(16,185,129,0.12)]">
                  <div className="relative">
                    <Cloud className="h-14 w-14 fill-emerald-400/10 text-emerald-400" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <MessageSquareCode className="h-5 w-5 text-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* Label */}

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  Welcome to CodeOrbit
                </p>

                {/* Title */}

                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Your codebase has a story.
                </h2>

                {/* Description */}

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-400">
                  Let&apos;s explore it together. Connect a GitHub
                  repository, understand your code, and ask questions
                  in natural language.
                </p>

                {/* Next */}

                <button
                  onClick={handleNext}
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-600"
                >
                  Let&apos;s explore

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Skip */}

                <button
                  onClick={handleSkip}
                  className="mt-4 text-xs text-zinc-500 transition hover:text-zinc-300"
                >
                  Skip introduction
                </button>
              </div>
            </div>
          )}

          {/* ====================================================
              STEPS 2, 3, 4
          ===================================================== */}

          {step >= 2 && targetRect && (
            <div className="pointer-events-none absolute inset-0">
              {/* =================================================
                  SPOTLIGHT
              ================================================== */}

              <div
                className="absolute rounded-xl border-2 border-emerald-400/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.78)] transition-all duration-500 ease-out"
                style={{
                  top: targetRect.top - 8,
                  left: targetRect.left - 8,
                  width: targetRect.width + 16,
                  height: targetRect.height + 16,
                }}
              />

              {/* =================================================
                  TOOLTIP
              ================================================== */}

              <div
                className="pointer-events-auto absolute w-[380px] max-w-[calc(100vw-40px)] rounded-2xl border border-white/10 bg-zinc-950/95 p-6 text-center shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out"
                style={getTooltipStyle()}
              >
                {/* Icon */}

                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black">
                  {step === 2 && (
                    <FaGithub className="h-5 w-5 text-white" />
                  )}

                  {step === 3 && (
                    <ArrowRight className="h-5 w-5 text-emerald-400" />
                  )}

                  {step === 4 && (
                    <MessageSquareCode className="h-5 w-5 text-emerald-400" />
                  )}
                </div>

                {/* Step label */}

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  {stepData[step].label}
                </p>

                {/* Heading */}

                <h2 className="text-xl font-semibold text-white">
                  {stepData[step].title}
                </h2>

                {/* Description */}

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {stepData[step].description}
                </p>

                {/* =================================================
                    BUTTONS
                ================================================== */}

                <div className="mt-6 flex gap-2">
                  {/* Back */}

                  <button
                    onClick={handleBack}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    <ArrowLeft className="h-4 w-4" />

                    Back
                  </button>

                  {/* Next / Get Started */}

                  {step < 4 ? (
                    <button
                      onClick={handleNext}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
                    >
                      Next

                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400"
                    >
                      Get started

                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Skip */}

                <button
                  onClick={handleSkip}
                  className="mt-3 text-xs text-zinc-500 transition hover:text-zinc-300"
                >
                  Skip
                </button>

                {/* Progress */}

                <div className="mt-5 flex justify-center gap-1.5">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        item === step
                          ? "w-6 bg-emerald-400"
                          : "w-1.5 bg-zinc-700"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}