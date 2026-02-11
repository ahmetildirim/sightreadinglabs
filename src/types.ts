export type CursorFeedback = "idle" | "correct" | "wrong";
export type AppPage = "setup" | "practice" | "settings" | "results" | "about";
export type ReturnPage = Exclude<AppPage, "settings" | "about">;
export type ThemeMode = "light" | "dark" | "system";
export type MidiInputOption = { id: string; name: string };
