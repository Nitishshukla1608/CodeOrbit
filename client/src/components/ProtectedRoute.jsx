import { Navigate, Outlet, useLocation } from "react-router-dom";

const AUTH_COOKIE = "codeorbit_auth";

function isAuthenticated() {
  if (typeof document === "undefined") return false;

  return document.cookie
    .split("; ")
    .some((cookie) => cookie === `${AUTH_COOKIE}=1`);
}

export default function ProtectedRoute() {
  const location = useLocation();
  const isAuthed = isAuthenticated();

  if (!isAuthed) {
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname)}`}  // taaki login ke baad phir se jaha pr jayega uska path bhejega
        replace
      />
    );
  }

  return <Outlet />;
}