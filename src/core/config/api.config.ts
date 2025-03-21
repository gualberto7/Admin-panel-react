export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  MEMBERS: {
    BASE: "/members",
    DETAIL: (id: string) => `/members/${id}`,
  },
  CLASSES: {
    BASE: "/classes",
    DETAIL: (id: string) => `/classes/${id}`,
    SCHEDULE: "/classes/schedule",
  },
  TRAINERS: {
    BASE: "/trainers",
    DETAIL: (id: string) => `/trainers/${id}`,
  },
  SUBSCRIPTIONS: {
    BASE: "/subscriptions",
    DETAIL: (id: string) => `/subscriptions/${id}`,
  },
} as const;
