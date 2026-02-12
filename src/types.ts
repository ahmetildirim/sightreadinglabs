import type { NoteName } from "./generator";

export type CursorFeedback = "idle" | "correct" | "wrong";
export type AppPage = "setup" | "practice" | "settings" | "results" | "about";
export type ReturnPage = Exclude<AppPage, "settings" | "about">;
export type ThemeMode = "light" | "dark" | "system";
export type MidiInputOption = { id: string; name: string };

export type PreviousSessionItem = {
  id: string;
  createdAtLabel: string;
  durationLabel: string;
  accuracy: number;
  config: {
    minNote: NoteName;
    maxNote: NoteName;
    totalNotes: number;
  };
};
