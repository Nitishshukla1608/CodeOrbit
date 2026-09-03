export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export function getApiBaseUrl() {
  return (
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080"
  );
}

export function getGithubLoginUrl() {
  return `${getApiBaseUrl()}/oauth2/authorization/github`;
}

async function parseError(res) {
  try {
    const data = await res.json();

    return data.message ?? data.error ?? res.statusText;
  } catch {
    return res.statusText || "Request failed";
  }
}

export async function apiFetch(path, init = {}) {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,

    // Important for Spring Security session cookie
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new ApiError(
      res.status,
      await parseError(res)
    );
  }

  // No content
  if (res.status === 204) {
    return undefined;
  }

  return res.json();
}

export const api = {
  // -------------------------
  // Authentication
  // -------------------------

  me: () => apiFetch("/api/auth/me"),

  logout: () =>
    apiFetch("/api/auth/logout", {
      method: "POST",
    }),

  // -------------------------
  // Repositories
  // -------------------------

  listRepos: (refresh = true) =>
    apiFetch(`/api/repos?refresh=${refresh}`),

  getRepo: (id) =>
    apiFetch(`/api/repos/${id}`),

  startIndex: (id) =>
    apiFetch(`/api/repos/${id}/index`, {
      method: "POST",
    }),

  indexStatus: (id) =>
    apiFetch(`/api/repos/${id}/status`),

  // -------------------------
  // Chat Sessions
  // -------------------------

  createSession: (repositoryId, title) =>
    apiFetch("/api/chat/sessions", {
      method: "POST",
      body: JSON.stringify({
        repositoryId,
        title,
      }),
    }),

  listSessions: (repositoryId) =>
    apiFetch(
      `/api/chat/sessions?repositoryId=${encodeURIComponent(
        repositoryId
      )}`
    ),

  getMessages: (sessionId) =>
    apiFetch(`/api/chat/sessions/${sessionId}`),
};  