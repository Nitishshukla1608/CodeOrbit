# CodeOrbit

> **AI-powered codebase assistant for understanding, indexing, and
> chatting with GitHub repositories.**

CodeOrbit connects to GitHub, indexes repository source code, and lets
developers ask natural-language questions about their codebase. It is
designed around retrieval-augmented generation (RAG), vector search, and
source-grounded answers.

------------------------------------------------------------------------

## ✨ Features

-   🔐 **GitHub OAuth authentication**
    -   Sign in with GitHub using Spring Security OAuth2.
    -   Supports access to public and private repositories according to
        the granted GitHub scope.
    -   Session-based authentication between the React client and Spring
        Boot backend.
-   📦 **Repository discovery**
    -   Connect a GitHub account.
    -   Fetch repositories accessible to the authenticated user.
    -   Prepare repositories for indexing and codebase analysis.
-   🧠 **RAG-powered codebase understanding**
    -   Split repository source code into searchable chunks.
    -   Generate embeddings for code/content.
    -   Store vectors in PostgreSQL with `pgvector`.
    -   Retrieve relevant source context for user questions.
-   💬 **AI codebase chat**
    -   Ask questions about a repository in natural language.
    -   Generate answers grounded in retrieved repository context.
    -   Designed to support source citations for traceability.
-   🖥️ **Modern React UI**
    -   React + Vite frontend.
    -   React Router for client-side routing.
    -   TanStack Query for server-state management.
    -   Tailwind CSS and shadcn-style UI components.
    -   Light/dark theme support.

------------------------------------------------------------------------

## 🏗️ Architecture

``` text
                         ┌─────────────────────┐
                         │       GitHub        │
                         │  OAuth + Repos API  │
                         └──────────┬──────────┘
                                    │
                                    │ OAuth / API
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│                        React Client                         │
│                                                             │
│  React + Vite                                               │
│  React Router                                               │
│  TanStack Query                                             │
│  Tailwind / UI Components                                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP + Session Cookie
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Spring Boot Backend                     │
│                                                             │
│  Spring Security OAuth2                                     │
│  REST APIs                                                  │
│  GitHub integration                                         │
│  Repository indexing                                        │
│  Embedding / RAG pipeline                                   │
│  AI chat orchestration                                      │
└───────────────┬───────────────────────────────┬─────────────┘
                │                               │
                ▼                               ▼
      ┌──────────────────┐            ┌──────────────────────┐
      │   PostgreSQL     │            │    AI / Embeddings   │
      │                  │            │                      │
      │  Application DB  │            │  LLM + embeddings    │
      │  pgvector        │            │                      │
      └──────────────────┘            └──────────────────────┘
```

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

  Technology                Purpose
  ------------------------- -----------------------------
  React                     UI
  Vite                      Development/build tooling
  React Router              Client-side routing
  TanStack Query            API/server-state management
  Tailwind CSS              Styling
  shadcn-style components   Reusable UI
  Lucide React              Icons
  React Icons               Brand icons such as GitHub

### Backend

  Technology                    Purpose
  ----------------------------- ------------------------------------
  Java                          Backend language
  Spring Boot                   REST API and application framework
  Spring Security               Authentication and authorization
  Spring OAuth2 Client          GitHub OAuth
  Spring Data JPA / Hibernate   Persistence
  PostgreSQL                    Relational database
  pgvector                      Vector similarity search
  Flyway                        Database migrations
  Spring AI                     AI/LLM integration

### Infrastructure

-   Docker
-   Docker Compose
-   PostgreSQL 16 with pgvector

------------------------------------------------------------------------

## 📁 Project Structure

A typical CodeOrbit layout:

``` text
CodeOrbit/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── providers/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── server/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── CodeOrbit/
│           │       └── backend/
│           └── resources/
│               ├── application.properties
│               └── db/
│
├── docker-compose.yml
└── README.md
```

> The exact backend directory name can differ depending on how the
> project is organized locally.

------------------------------------------------------------------------

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

-   Java 25+
-   Node.js 20+
-   npm
-   Docker Desktop
-   Git
-   PostgreSQL tooling (optional if PostgreSQL is run through Docker)

Verify:

``` bash
java -version
node -v
npm -v
docker --version
git --version
```

------------------------------------------------------------------------

# 1. Clone the repository

``` bash
git clone <YOUR_REPOSITORY_URL>
cd CodeOrbit
```

------------------------------------------------------------------------

# 2. Start PostgreSQL

CodeOrbit uses PostgreSQL with `pgvector`.

If your Docker Compose configuration maps PostgreSQL to port `5433`,
start the database with:

``` bash
docker compose up -d
```

Check running containers:

``` bash
docker ps
```

The expected database setup is approximately:

``` text
Host:     localhost
Port:     5433
Database: codeorbit
User:     postgres
```

If you use a different port or credentials, update the backend
configuration accordingly.

------------------------------------------------------------------------

# 3. Configure the backend

Create/configure your Spring Boot environment.

Example:

``` properties
spring.datasource.url=jdbc:postgresql://localhost:5433/codeorbit
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_PASSWORD

spring.jpa.hibernate.ddl-auto=update

server.port=8080

server.servlet.session.cookie.name=CODEORBIT_SESSION
```

## GitHub OAuth

Create a GitHub OAuth App and configure the callback URL used by your
Spring Security application.

Example local callback:

``` text
http://localhost:8080/login/oauth2/code/github
```

Configure:

``` properties
spring.security.oauth2.client.registration.github.client-id=YOUR_GITHUB_CLIENT_ID
spring.security.oauth2.client.registration.github.client-secret=YOUR_GITHUB_CLIENT_SECRET
spring.security.oauth2.client.registration.github.scope=read:user,repo
```

### Important

Never commit OAuth client secrets or API keys to Git.

Use environment variables or an ignored local configuration file.

For example:

``` properties
spring.security.oauth2.client.registration.github.client-id=${GITHUB_CLIENT_ID}
spring.security.oauth2.client.registration.github.client-secret=${GITHUB_CLIENT_SECRET}
```

------------------------------------------------------------------------

# 4. Configure AI services

CodeOrbit uses an AI/embedding pipeline for RAG.

Configure the provider/API key required by your Spring AI setup.

Example pattern:

``` properties
spring.ai.openai.api-key=${OPENAI_API_KEY}
```

Keep API keys outside source control.

------------------------------------------------------------------------

# 5. Start the backend

From the backend directory:

### Maven

``` bash
./mvnw spring-boot:run
```

On Windows:

``` powershell
.\mvnw.cmd spring-boot:run
```

The backend should be available at:

``` text
http://localhost:8080
```

------------------------------------------------------------------------

# 6. Install frontend dependencies

From `client/`:

``` bash
npm install
```

------------------------------------------------------------------------

# 7. Configure the frontend

The frontend communicates with the Spring Boot API.

Example environment file:

``` env
VITE_API_BASE_URL=http://localhost:8080
```

If the project uses another environment variable name, keep it
consistent with the API configuration in `src/lib/api.js`.

------------------------------------------------------------------------

# 8. Start the frontend

``` bash
npm run dev
```

Vite will normally start the application at:

``` text
http://localhost:5173
```

Open that address in your browser.

------------------------------------------------------------------------

# 🔐 Authentication Flow

CodeOrbit uses GitHub OAuth with a Spring Boot backend.

The high-level flow is:

``` text
User
 │
 │ Click "Continue with GitHub"
 ▼
React Client
 │
 │ Redirect
 ▼
Spring Security
 │
 │ GitHub OAuth
 ▼
GitHub
 │
 │ Authorization code
 ▼
Spring Security
 │
 │ Exchanges code for token
 ▼
GitHub API
 │
 │ User/repository information
 ▼
Spring Boot
 │
 │ Creates authenticated session
 ▼
CODEORBIT_SESSION cookie
 │
 ▼
React Client
```

The browser sends the session cookie with API requests.

The React client does not need to store the GitHub access token in
`localStorage`.

------------------------------------------------------------------------

# 🔄 Frontend Authentication State

The frontend uses TanStack Query to retrieve the current authenticated
user.

Conceptually:

``` text
useCurrentUser()
      │
      ▼
GET /api/auth/me
      │
      ├── Success → authenticated
      │
      └── Error   → unauthenticated
```

The application also maintains a lightweight client-side auth
cookie/state marker for route/UI behavior.

The backend session remains the source of authentication.

------------------------------------------------------------------------

# 🧭 Application Routes

The React application currently follows this general route structure:

  Route              Purpose
  ------------------ -------------------------
  `/`                Landing page
  `/login`           Login page
  `/auth/callback`   OAuth callback handling
  `/dashboard`       Authenticated dashboard

Protected routes are wrapped with an authentication guard such as:

``` jsx
<RequireAuth>
  <AppShell>
    <Dashboard />
  </AppShell>
</RequireAuth>
```

------------------------------------------------------------------------

# 🧠 RAG Pipeline

The core CodeOrbit workflow is designed around Retrieval-Augmented
Generation.

``` text
GitHub Repository
       │
       ▼
Repository Indexer
       │
       ▼
Read source files
       │
       ▼
Split into chunks
       │
       ▼
Generate embeddings
       │
       ▼
PostgreSQL + pgvector
       │
       ▼
User asks a question
       │
       ▼
Generate query embedding
       │
       ▼
Vector similarity search
       │
       ▼
Retrieve relevant code
       │
       ▼
LLM receives question + context
       │
       ▼
Grounded answer + source citations
```

This allows CodeOrbit to answer questions using the actual repository
contents instead of relying only on the model's general programming
knowledge.

------------------------------------------------------------------------

# 🗄️ Database

PostgreSQL is used for persistent application data.

`pgvector` provides vector storage and similarity search required by the
RAG pipeline.

Example connection:

``` text
jdbc:postgresql://localhost:5433/codeorbit
```

The actual port depends on your Docker Compose configuration.

------------------------------------------------------------------------

# 🐳 Docker

Start services:

``` bash
docker compose up -d
```

Stop services:

``` bash
docker compose down
```

View logs:

``` bash
docker compose logs -f
```

Check containers:

``` bash
docker ps
```

For the PostgreSQL container, you can connect using:

``` bash
docker exec -it codeorbit-postgres psql -U postgres -d codeorbit
```

------------------------------------------------------------------------

# 🧪 Development

## Frontend

Run the development server:

``` bash
cd client
npm run dev
```

Build:

``` bash
npm run build
```

Preview the production build:

``` bash
npm run preview
```

Lint:

``` bash
npm run lint
```

## Backend

Run:

``` bash
./mvnw spring-boot:run
```

Build:

``` bash
./mvnw clean package
```

Run tests:

``` bash
./mvnw test
```

On Windows:

``` powershell
.\mvnw.cmd test
```

------------------------------------------------------------------------

# 🔒 Security Notes

Do not commit:

``` text
.env
.env.local
application-local.properties
GitHub client secrets
OpenAI/API keys
database passwords
session secrets
```

Recommended approach:

``` text
Environment Variables
        │
        ▼
Spring Boot configuration
        │
        ▼
Application
```

For production:

-   Use HTTPS.
-   Use secure, HTTP-only session cookies.
-   Configure an explicit CORS allowlist.
-   Never expose GitHub access tokens to the browser unnecessarily.
-   Rotate leaked credentials immediately.
-   Store production secrets in a proper secret manager.
-   Restrict OAuth scopes to only what the application requires.

------------------------------------------------------------------------

# 🌐 CORS

During local development, the React client typically runs on:

``` text
http://localhost:5173
```

while the Spring Boot backend runs on:

``` text
http://localhost:8080
```

Because these are different origins, the backend must allow the frontend
origin.

Example:

``` properties
app.cors.allowed-origins=http://localhost:5173
```

Avoid using `*` for authenticated production APIs.

------------------------------------------------------------------------

# 🧩 Troubleshooting

## Backend cannot connect to PostgreSQL

Check:

``` bash
docker ps
```

Then verify:

``` text
Host: localhost
Port: 5433
Database: codeorbit
```

Also check the JDBC URL:

``` properties
spring.datasource.url=jdbc:postgresql://localhost:5433/codeorbit
```

------------------------------------------------------------------------

## `No QueryClient set`

Make sure the React application is wrapped with `QueryClientProvider`.

Example:

``` jsx
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

------------------------------------------------------------------------

## OAuth redirects but authentication is not detected

Check:

1.  GitHub OAuth callback URL.
2.  Backend OAuth configuration.
3.  Session cookie configuration.
4.  Frontend API requests use credentials.
5.  CORS allows credentials.
6.  The `/api/auth/me` endpoint returns the current user.

For fetch requests:

``` js
fetch(url, {
  credentials: "include",
});
```

------------------------------------------------------------------------

## `/auth/callback` shows "No routes matched"

Make sure React Router contains:

``` jsx
<Route
  path="/auth/callback"
  element={<AuthCallbackPage />}
/>
```

------------------------------------------------------------------------

## GitHub login automatically uses the current GitHub account

GitHub may already have an active browser session.

To authenticate with a different GitHub account, sign out of GitHub in
the browser or use a separate browser profile/incognito window.

------------------------------------------------------------------------

# 🗺️ Roadmap

Potential future improvements:

-   [ ] Repository indexing progress UI
-   [ ] Incremental repository indexing
-   [ ] Background indexing jobs
-   [ ] Better code chunking strategies
-   [ ] Multi-repository search
-   [ ] Branch-aware indexing
-   [ ] File and line-level citations
-   [ ] Conversation history
-   [ ] Streaming AI responses
-   [ ] Repository permission management
-   [ ] Improved rate-limit handling
-   [ ] Production deployment
-   [ ] Automated tests for indexing and RAG retrieval
-   [ ] Observability and application metrics

------------------------------------------------------------------------

# 🤝 Contributing

Contributions are welcome.

A typical workflow:

``` bash
git checkout -b feature/your-feature
```

Make your changes, test them, then:

``` bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Open a pull request with:

-   A clear description of the change.
-   Steps to reproduce/test it.
-   Screenshots for UI changes when useful.
-   Any required environment/configuration changes.

------------------------------------------------------------------------

# 📄 License

Add the project's chosen license here.

For example:

``` text
MIT License
```

if the repository is intended to be released under MIT.

------------------------------------------------------------------------

# 👨‍💻 CodeOrbit

**Understand your codebase like never before.**

CodeOrbit brings GitHub repositories, vector search, retrieval-augmented
generation, and AI-powered codebase chat into one developer-focused
workspace.
