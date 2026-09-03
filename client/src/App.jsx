import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import LoginPage from "@/components/pages/login";
import Dashboard from "@/components/dashboard/overview-dashboard";
import Home from "@/components/pages/Home";
import AuthCallbackPage from "@/components/auth/callback";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/PublicOnlyRoute.jsx";

import { SidebarProvider } from "@/components/ui/sidebar";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        richColors
      />

      {/* Sidebar context provider */}
      <SidebarProvider>

        <Routes>

          {/* =========================
              PUBLIC HOME
          ========================== */}
          <Route
            path="/"
            element={<Home />}
          />


          {/* =========================
              LOGIN
              Only accessible when
              user is NOT authenticated
          ========================== */}
          <Route element={<PublicOnlyRoute />}>
            <Route
              path="/login"
              element={<LoginPage />}
            />
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
              element={<Dashboard />}
            />
          </Route>

        </Routes>

      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;