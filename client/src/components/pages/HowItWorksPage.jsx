import React from "react";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Code2,
  Database,
  FileCode2,
  Files,
  GitBranch,
  Layers3,
  MessageSquare,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

import { Link } from "react-router-dom";

const pipeline = [
  {
    number: "01",
    title: "Connect a repository",
    description:
      "Start by providing a GitHub repository URL. CodeOrbit identifies the repository and prepares its source files for analysis.",
    icon: GitBranch,
    color: "blue",
    example: "https://github.com/owner/repository",
    details: [
      "Validate the repository URL",
      "Access permitted repository contents",
      "Identify supported source files",
    ],
  },
  {
    number: "02",
    title: "Ingest the source code",
    description:
      "The backend fetches relevant files while excluding dependencies, build artifacts, and unnecessary binary files.",
    icon: Files,
    color: "violet",
    example: "Repository → Source files",
    details: [
      "Read Java, JavaScript, Python, and other supported files",
      "Filter node_modules, build, and .git directories",
      "Preserve file paths and source information",
    ],
  },
  {
    number: "03",
    title: "Split code into chunks",
    description:
      "Large files are divided into smaller, manageable pieces. Chunking allows retrieval to focus on the relevant functions, classes, and code sections.",
    icon: ScissorsIcon,
    color: "amber",
    example: "UserService.java → Multiple chunks",
    details: [
      "Split source files into manageable sections",
      "Preserve useful code boundaries where possible",
      "Attach file paths and line numbers to chunks",
    ],
  },
  {
    number: "04",
    title: "Generate embeddings",
    description:
      "An embedding model converts each text or code chunk into a high-dimensional numerical vector that captures aspects of its semantic meaning.",
    icon: BrainCircuit,
    color: "emerald",
    example: "[0.021, -0.184, 0.739, ...]",
    details: [
      "Send chunks to the embedding model",
      "Receive numerical vector representations",
      "Associate every vector with its original chunk",
    ],
  },
  {
    number: "05",
    title: "Store vectors in PostgreSQL",
    description:
      "CodeOrbit stores embeddings alongside the original chunk content and metadata. The pgvector extension enables similarity searches directly in PostgreSQL.",
    icon: Database,
    color: "blue",
    example: "vector database",
    details: [
      "Store embeddings and code content",
      "Keep repository IDs, file paths, and line numbers",
      "Use vector indexes when appropriate for faster retrieval",
    ],
  },
];

const queryPipeline = [
  {
    number: "06",
    title: "Understand the user's question",
    description:
      "When a user asks a question, CodeOrbit converts the question into an embedding using the compatible embedding model.",
    icon: MessageSquare,
    color: "violet",
    example: '"Where is user authentication handled?"',
  },
  {
    number: "07",
    title: "Retrieve relevant code",
    description:
      "The question vector is compared with stored repository vectors. CodeOrbit retrieves the most relevant chunks, subject to repository and access constraints.",
    icon: Search,
    color: "amber",
    example: "Question vector → Relevant code chunks",
  },
  {
    number: "08",
    title: "Build the context",
    description:
      "The retrieved code, file paths, and useful metadata are assembled into a context that helps the language model answer the question.",
    icon: Layers3,
    color: "emerald",
    example: "Question + Retrieved code + Instructions",
  },
  {
    number: "09",
    title: "Generate the answer",
    description:
      "The LLM uses the question and retrieved code context to explain the implementation, trace logic, or help the user understand the repository.",
    icon: Sparkles,
    color: "blue",
    example: "Context → LLM → Answer",
  },
  {
    number: "10",
    title: "Show citations",
    description:
      "CodeOrbit can attach source references to the answer, allowing users to navigate to relevant files and line ranges instead of relying only on a general explanation.",
    icon: FileCode2,
    color: "violet",
    example: "src/auth/AuthService.java · Lines 24–48",
  },
];

// Small custom scissors icon so the page doesn't depend on an extra package.
function ScissorsIcon(props) {
  return <Workflow {...props} />;
}

const colors = {
  blue: {
    icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    number: "text-blue-600 dark:text-blue-400",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    border: "border-violet-500/20",
    number: "text-violet-600 dark:text-violet-400",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20",
    number: "text-amber-600 dark:text-amber-400",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
    number: "text-emerald-600 dark:text-emerald-400",
  },
};

function SectionLabel({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
      <Sparkles className="size-3.5" />
      {children}
    </div>
  );
}

function PipelineCard({ step, index, total }) {
  const Icon = step.icon;
  const theme = colors[step.color];

  return (
    <article className="relative">
      <div
        className={`rounded-2xl border ${theme.border} bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
          >
            <Icon className="size-6" />
          </div>

          <span
            className={`font-mono text-sm font-semibold ${theme.number}`}
          >
            {step.number}
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {step.description}
        </p>

        <div className="mt-5 rounded-xl border border-border bg-muted/50 p-3">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Example
          </p>

          <p className="break-words font-mono text-xs leading-6 text-foreground">
            {step.example}
          </p>
        </div>

        {step.details && (
          <ul className="mt-5 space-y-2.5">
            {step.details.map((detail) => (
              <li
                key={detail}
                className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
              >
                <CheckCircle2
                  className={`mt-0.5 size-3.5 shrink-0 ${theme.number}`}
                />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {index < total - 1 && (
        <div className="my-3 flex items-center justify-center lg:hidden">
          <ArrowDown className="size-5 text-muted-foreground/60" />
        </div>
      )}
    </article>
  );
}

function FlowConnector() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <ArrowRight className="size-5 text-muted-foreground/50" />
    </div>
  );
}

function VectorIllustration() {
  const vector = [
    "0.021",
    "-0.184",
    "0.739",
    "0.402",
    "-0.091",
    "0.628",
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium">Embedding visualization</span>
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          Illustrative
        </span>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Original code chunk
          </p>

          <pre className="mt-2 overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs leading-6 text-foreground">
{`public User findUser(Long id) {
    return userRepository.findById(id)
        .orElseThrow();
}`}
          </pre>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="size-5 text-muted-foreground" />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Numerical embedding
            </p>

            <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              Vector
            </span>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex flex-wrap gap-2">
              {vector.map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  className="rounded-lg border border-emerald-500/20 bg-card px-3 py-2 font-mono text-xs text-foreground"
                >
                  {value}
                </div>
              ))}

              <div className="flex items-center px-2 font-mono text-sm text-muted-foreground">
                ...
              </div>
            </div>

            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Real embeddings can contain hundreds or thousands of dimensions.
              These numbers are illustrative, not actual model output.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimilarityIllustration() {
  const matches = [
    {
      score: "High",
      width: "92%",
      file: "AuthService.java",
      line: "Lines 24–48",
      color: "bg-emerald-500",
    },
    {
      score: "Medium",
      width: "67%",
      file: "SecurityConfig.java",
      line: "Lines 12–31",
      color: "bg-blue-500",
    },
    {
      score: "Lower",
      width: "31%",
      file: "UserController.java",
      line: "Lines 40–57",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <Network className="size-5" />
        </div>

        <div>
          <h3 className="font-semibold">Similarity search</h3>
          <p className="text-xs text-muted-foreground">
            Illustrative retrieval results
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-muted/60 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          User question
        </p>

        <p className="mt-2 text-sm font-medium">
          Where is authentication handled?
        </p>
      </div>

      <div className="my-4 flex justify-center">
        <ArrowDown className="size-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.file} className="rounded-xl border border-border p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-sm font-medium">{match.file}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {match.score}
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${match.color}`}
                style={{ width: match.width }}
              />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">{match.line}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-6 text-muted-foreground">
        The bars illustrate relative relevance only. They are not actual
        similarity scores from your backend.
      </p>
    </div>
  );
}

function FAQItem({ question, children }) {
  return (
    <details className="group rounded-xl border border-border bg-card p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground">
        <span>{question}</span>

        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
      </summary>

      <div className="mt-4 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)]" />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <SectionLabel>Inside CodeOrbit</SectionLabel>

          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                From GitHub repository to{" "}
                <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                  intelligent answers.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Discover how CodeOrbit combines code chunking, vector
                embeddings, semantic search, and large language models to help
                you understand any repository you have permission to access.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Explore CodeOrbit
                  <ArrowUpRight className="size-4" />
                </Link>

                <a
                  href="#pipeline"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Explore the pipeline
                  <ArrowDown className="size-4" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  Retrieval-augmented generation
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  Semantic code search
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  Source references
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/80 p-5 shadow-xl backdrop-blur sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Workflow className="size-5" />
                </div>

                <div>
                  <p className="font-semibold">The complete workflow</p>
                  <p className="text-xs text-muted-foreground">
                    Repository → Retrieval → Answer
                  </p>
                </div>
              </div>

              {[
                {
                  icon: GitBranch,
                  title: "GitHub repository",
                  subtitle: "Source code and documentation",
                },
                {
                  icon: BrainCircuit,
                  title: "Embedding model",
                  subtitle: "Code and questions become vectors",
                },
                {
                  icon: Database,
                  title: "vector database",
                  subtitle: "Store and search vector representations",
                },
                {
                  icon: Sparkles,
                  title: "LLM + citations",
                  subtitle: "Generate a grounded response",
                },
              ].map((item, index, array) => {
                const Icon = item.icon;

                return (
                  <React.Fragment key={item.title}>
                    <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-5 text-primary" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {index < array.length - 1 && (
                      <div className="flex h-8 items-center pl-7">
                        <ArrowDown className="size-4 text-muted-foreground/60" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main pipeline */}
      <section id="pipeline" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <SectionLabel>Phase 01 · Indexing</SectionLabel>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              First, CodeOrbit learns the repository
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Before you ask questions, the repository needs to be processed.
              Relevant code is divided into chunks, converted into vectors,
              and indexed for retrieval.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((step, index) => (
              <PipelineCard
                key={step.number}
                step={step}
                index={index}
                total={pipeline.length}
              />
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Database className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  What is actually stored in the vector database?
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  A vector is only a numerical representation. To retrieve
                  usable code, the system also needs the original chunk content
                  and metadata such as repository ID, file path, and line
                  numbers. Your database schema may store these in the same
                  table or in related tables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embeddings */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <SectionLabel>Deep dive · Embeddings</SectionLabel>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How does code become a vector?
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              An embedding model maps text or code to a point in a
              high-dimensional numerical space. Texts with related meanings
              often have vectors that are close under an appropriate
              similarity measure.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  title: "Input",
                  text: "A code chunk, such as a method that looks up a user by ID.",
                },
                {
                  title: "Embedding model",
                  text: "The model converts that chunk into a fixed-length vector.",
                },
                {
                  title: "Vector representation",
                  text: "The vector can be compared with the vector of a user's question.",
                },
                {
                  title: "Semantic retrieval",
                  text: "Relevant code can be retrieved even when the question uses different wording.",
                },
              ].map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs font-semibold">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex gap-3">
                <CircleHelp className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />

                <p className="text-sm leading-6 text-muted-foreground">
                  <strong className="text-foreground">
                    Important distinction:
                  </strong>{" "}
                  embeddings do not guarantee that two code snippets with
                  similar vectors are logically equivalent. Retrieval finds
                  relevant candidates; the LLM still needs to interpret the
                  actual code.
                </p>
              </div>
            </div>
          </div>

          <VectorIllustration />
        </div>
      </section>

      {/* Query and RAG */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <SectionLabel>Phase 02 · Question answering</SectionLabel>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Then, your question becomes an answer
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              This is the retrieval-augmented generation (RAG) process.
              Instead of asking an LLM to answer using only its general
              knowledge, CodeOrbit supplies relevant code from the selected
              repository.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {queryPipeline.map((step, index) => (
              <PipelineCard
                key={step.number}
                step={step}
                index={index}
                total={queryPipeline.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Similarity search */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-24">
          <SimilarityIllustration />

          <div>
            <SectionLabel>Deep dive · Vector search</SectionLabel>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How does CodeOrbit find the right code?
            </h2>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              The question is embedded into the same compatible vector space
              as the indexed chunks. The vector database searches for nearby
              vectors and returns candidate chunks for the language model.
            </p>

            <div className="mt-7 space-y-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Search className="size-5 text-blue-500" />
                  <h3 className="text-sm font-semibold">
                    Similarity or distance
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Depending on the database query, retrieval may use cosine
                  distance, Euclidean distance, or an inner-product-based
                  measure.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Layers3 className="size-5 text-violet-500" />
                  <h3 className="text-sm font-semibold">
                    Top-K retrieval
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The backend selects a limited number of relevant chunks,
                  often called K. The value of K should be tuned to answer
                  quality and the model's context limits.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-emerald-500" />
                  <h3 className="text-sm font-semibold">
                    Repository-aware filtering
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Retrieval should be restricted to the selected repository
                  and authorized content. Similarity alone is not an
                  authorization mechanism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical flow */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Under the hood</SectionLabel>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The complete RAG data flow
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Here is how the indexing and question-answering paths work
              together.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Indexing flow */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <GitBranch className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Indexing pipeline</h3>
                  <p className="text-xs text-muted-foreground">
                    Run when a repository is indexed or re-indexed
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {[
                  "GitHub repository",
                  "Fetch and filter source files",
                  "Split files into code chunks",
                  "Generate chunk embeddings",
                  "Store vectors + content + metadata",
                ].map((step, index, array) => (
                  <React.Fragment key={step}>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3.5">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background text-xs font-semibold">
                        {index + 1}
                      </span>

                      <span className="text-sm font-medium">{step}</span>
                    </div>

                    {index < array.length - 1 && (
                      <div className="flex justify-center">
                        <ArrowDown className="size-4 text-muted-foreground/60" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Query flow */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <MessageSquare className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">Question-answering pipeline</h3>
                  <p className="text-xs text-muted-foreground">
                    Run for each user question
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {[
                  "User asks a question",
                  "Generate question embedding",
                  "Search relevant vectors in pgvector",
                  "Build context from retrieved code",
                  "LLM generates an answer with references",
                ].map((step, index, array) => (
                  <React.Fragment key={step}>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3.5">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background text-xs font-semibold">
                        {index + 1}
                      </span>

                      <span className="text-sm font-medium">{step}</span>
                    </div>

                    {index < array.length - 1 && (
                      <div className="flex justify-center">
                        <ArrowDown className="size-4 text-muted-foreground/60" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Zap className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Why not send the entire repository to the LLM?
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Large repositories may exceed context limits and introduce
                  unnecessary information. RAG retrieves a smaller set of
                  relevant code chunks, reducing irrelevant context and
                  helping the model focus on the user's question. It does not,
                  however, guarantee a correct answer if relevant code is
                  missed during retrieval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="mb-10 text-center">
            <SectionLabel>Frequently asked questions</SectionLabel>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Understand the technology
            </h2>
          </div>

          <div className="space-y-3">
            <FAQItem question="What exactly is an embedding?">
              An embedding is a numerical vector generated by a machine
              learning model. It represents aspects of the meaning of the
              input text or code. For example, a code chunk that handles
              authentication and a question about authentication may have
              vectors that are close under the model's similarity measure.
            </FAQItem>

            <FAQItem question="Why do we need a vector database?">
              A vector database stores embeddings and enables efficient
              similarity searches. CodeOrbit uses PostgreSQL with pgvector
              to support vector retrieval alongside ordinary relational
              data. A separate vector database is not necessarily required.
            </FAQItem>

            <FAQItem question="What is the difference between an embedding model and an LLM?">
              An embedding model converts input into a numerical vector for
              comparison and retrieval. An LLM generates text, explanations,
              summaries, and other responses. They serve different purposes,
              even though both are machine learning models.
            </FAQItem>

            <FAQItem question="Do we generate embeddings every time a user asks a question?">
              Usually, the repository's code embeddings are generated during
              indexing and reused for later queries. A new question is
              generally embedded for retrieval. If repository content changes,
              affected chunks need to be re-indexed. Caching and incremental
              indexing can reduce unnecessary work.
            </FAQItem>

            <FAQItem question="What is RAG?">
              RAG stands for Retrieval-Augmented Generation. It combines
              retrieval of relevant external information with text generation.
              In CodeOrbit, retrieved repository code provides evidence and
              context for the LLM's response.
            </FAQItem>

            <FAQItem question="Does RAG guarantee that every answer is correct?">
              No. Retrieval can miss relevant files, code may be ambiguous,
              and language models can make mistakes. Good chunking,
              repository-aware filtering, source citations, and appropriate
              retrieval settings improve reliability but cannot guarantee
              correctness.
            </FAQItem>

            <FAQItem question="Why do citations matter?">
              Citations connect an answer to the source files and line ranges
              used to construct its context. They help developers verify
              explanations against the actual implementation instead of
              relying entirely on generated text.
            </FAQItem>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative max-w-2xl">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Code2 className="size-6" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to explore a codebase?
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Connect a repository, let CodeOrbit index its code, and start
                asking questions about how it works.
              </p>

              <Link
                to="/dashboard"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get started
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}