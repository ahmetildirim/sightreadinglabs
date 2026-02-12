import type { AppPage } from "./types";

export const APP_ROUTES = {
  about: "about",
  practice: "practice",
  results: "results",
  settings: "settings",
  setup: "setup",
} as const satisfies Record<AppPage, AppPage>;
