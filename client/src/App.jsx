import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "sonner";

import LoginPage from "@/components/pages/login";
import Dashboard from "@/components/dashboard/page.jsx";
import Home from "@/components/pages/Home";
import AuthCallbackPage from "@/components/auth/callback";

import { SettingsDashboard } from "@/components/dashboard/settings-dashboard.jsx";
import Dashboar_Overview from "@/components/dashboard/overview-dashboard.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/PublicOnlyRoute.jsx";

import { ChatViewWrapper } from "./components/chat/chat-view-wrapper.jsx";
import { SidebarProvider } from "@/components/ui/sidebar";

import HowItWorks from "./components/pages/HowItWorksPage.jsx";
import IndexWithRag from "./components/pages/process-flow/IndexWithRag.jsx"
import DirectScrapper from "@/components/direct-scrapper-pages/RepositoryPage.jsx";
import ConnectGitHubPage from "./components/pages/process-flow/ConnectGitHubPage.jsx";
import AskAnything from "./components/pages/process-flow/AskAnything.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />

      <Routes>
        {/* =========================
            PUBLIC HOME
        ========================== */}
        <Route path="/" element={<Home />} />

        {/* =========================
            LOGIN
            Only accessible when NOT authenticated
        ========================== */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* =========================
            HOW IT WORKS
        ========================== */}
        <Route
          path="/see-how-it-works"
          element={<HowItWorks />}
        />



        <Route
          path="/index-with-rag"
          element={<IndexWithRag />}
        />

<Route
          path="/ask-anything"
          element={<AskAnything />}
        />

        {/* =========================
            CONNECT GITHUB
        ========================== */}
        <Route
          path="/connect-github"
          element={<ConnectGitHubPage />}
        />

        {/* =========================
            OAUTH CALLBACK
        ========================== */}
        <Route
          path="/auth/callback"
          element={<AuthCallbackPage />}
        />

        {/* =========================
            DIRECT SCRAPPER
        ========================== */}
        <Route
          path="/direct-scrapper"
          element={<DirectScrapper />}
        />

        {/* =========================
            PROTECTED ROUTES
        ========================== */}
        <Route element={<ProtectedRoute />}>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <SidebarProvider>
                <Dashboard />
              </SidebarProvider>
            }
          />

          {/* Dashboard Overview */}
          <Route
  path="/overview"
  element={<Dashboar_Overview />}
/>

          {/* Repository Chat */}
          <Route
            path="/chat/:repoId"
            element={<ChatViewWrapper />}
          />

          {/* Dashboard Settings */}
          <Route
            path="/dashboard/settings"
            element={
              <SidebarProvider>
                <SettingsDashboard />
              </SidebarProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;