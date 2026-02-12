import { useEffect, useRef, useState } from "react";

const COMMAND_MASK = 0xf0;
const NOTE_ON = 0x90;
const NOTE_OFF = 0x80;

export type MidiStatus =
  | "Checking MIDI support…"
  | "MIDI: connected"
  | "MIDI: no device found"
  | "MIDI: not supported in this browser"
  | "MIDI: permission denied";

export interface MidiCallbacks {
  selectedDeviceId?: string;
  onNoteOn?: (note: number, velocity: number) => void;
  onNoteOff?: (note: number) => void;
  onAllNotesOff?: () => void;
}

export default function useMidiInput(callbacks: MidiCallbacks): MidiStatus {
  const { selectedDeviceId, onNoteOn, onNoteOff, onAllNotesOff } = callbacks;
  const [status, setStatus] = useState<MidiStatus>("Checking MIDI support…");
  const heldNotes = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!navigator.requestMIDIAccess) {
      setStatus("MIDI: not supported in this browser");
      return;
    }

    let accessRef: MIDIAccess | null = null;
    let boundInputs: MIDIInput[] = [];
    let cancelled = false;

    const releaseHeldNotes = () => {
      if (heldNotes.current.size === 0) {
        return;
      }

      heldNotes.current.clear();
      onAllNotesOff?.();
    };

    const unbindInputs = () => {
      for (const input of boundInputs) {
        input.onmidimessage = null;
      }
      boundInputs = [];
      releaseHeldNotes();
    };

    const handleMessage = (event: MIDIMessageEvent) => {
      if (!event.data || event.data.length < 3) {
        return;
      }

      const [statusByte, note, velocity] = event.data;
      const command = statusByte & COMMAND_MASK;

      if (command === NOTE_OFF || (command === NOTE_ON && velocity === 0)) {
        heldNotes.current.delete(note);
        onNoteOff?.(note);
        if (heldNotes.current.size === 0) {
          onAllNotesOff?.();
        }
        return;
      }

      if (command === NOTE_ON && !heldNotes.current.has(note)) {
        heldNotes.current.add(note);
        onNoteOn?.(note, velocity);
      }
    };

    const bindInputs = (access: MIDIAccess) => {
      const allInputs = Array.from(access.inputs.values());
      const nextInputs = selectedDeviceId
        ? allInputs.filter((input) => input.id === selectedDeviceId)
        : allInputs;

      unbindInputs();
      boundInputs = nextInputs;

      for (const input of boundInputs) {
        input.onmidimessage = handleMessage;
      }

      setStatus(boundInputs.length > 0 ? "MIDI: connected" : "MIDI: no device found");
    };

    void navigator.requestMIDIAccess().then(
      (access) => {
        if (cancelled) {
          return;
        }

        accessRef = access;
        bindInputs(access);

        access.onstatechange = () => {
          if (cancelled) {
            return;
          }
          bindInputs(access);
        };
      },
      () => {
        if (cancelled) {
          return;
        }
        setStatus("MIDI: permission denied");
      },
    );

    return () => {
      cancelled = true;
      if (accessRef) {
        accessRef.onstatechange = null;
      }
      unbindInputs();
    };
  }, [selectedDeviceId, onNoteOn, onNoteOff, onAllNotesOff]);

  return status;
}
