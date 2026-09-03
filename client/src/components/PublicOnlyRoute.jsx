import { Navigate, Outlet } from "react-router-dom";

const AUTH_COOKIE = "codeorbit_auth";

function isAuthenticated() {
  if (typeof document === "undefined") return false;

  return document.cookie
    .split("; ")
    .some((cookie) => cookie === `${AUTH_COOKIE}=1`);
}

export default function PublicOnlyRoute() {
  const isAuthed = isAuthenticated();

  if (isAuthed) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}