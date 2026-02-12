import type { NoteName } from "../../entities/score";

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
