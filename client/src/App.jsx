import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import LoginPage from "@/components/pages/login";
import Dashboard from "@/components/dashboard/page.jsx";
import Home from "@/components/pages/Home";
import AuthCallbackPage from "@/components/auth/callback";
import { SettingsDashboard } from "@/components/dashboard/settings-dashboard.jsx";
import Dashboar_Overview from "@/components/dashboard/overview-dashboard.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/PublicOnlyRoute.jsx";
import { ChatViewWrapper } from "./components/chat/chat-view-wrapper.jsx"
import { SidebarProvider } from "@/components/ui/sidebar";

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
            OAUTH CALLBACK
        ========================== */}
        <Route
          path="/auth/callback"
          element={<AuthCallbackPage />}
        />

        {/* =========================
            PROTECTED ROUTES
        ========================== */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <SidebarProvider>
                <Dashboard />
              </SidebarProvider>
            }
          />


          <Route
            path="/dashboard/overview"
            element={
              <SidebarProvider>
                <Dashboar_Overview />
              </SidebarProvider>
            }
          />


          <Route
            path="/chat/:repoId"
            element={<ChatViewWrapper />}
          />


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