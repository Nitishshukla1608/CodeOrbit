export const queryKeys = {
  auth: {
    all: ["auth"],
    me: () => ["auth", "me"],
  },

  repos: {
    all: ["repos"],
    list: () => ["repos", "list"],
    detail: (id) => ["repos", "detail", id],
    status: (id) => ["repos", "status", id],
  },

  chat: {
    all: ["chat"],
    sessions: (repositoryId) => [
      "chat",
      "sessions",
      repositoryId,
    ],
    messages: (sessionId) => [
      "chat",
      "messages",
      sessionId,
    ],
  },
};