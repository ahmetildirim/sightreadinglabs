# Sight Reading Labs - App Summary

## What It Is

Sight Reading Labs is a focused, beginner-friendly piano sight-reading practice app built with React and TypeScript. It generates customizable practice sessions, accepts live MIDI keyboard input, tracks performance, and stores settings/session history locally in the browser.

## Who It's For

Primary user/persona: beginner piano students who want a simple, offline-capable tool for daily sight-reading practice with customizable note ranges and MIDI feedback.

## What It Does

- Guides users through setup for note range and session length, with preset trainings for treble, bass, and grand staff practice.
- Generates MusicXML practice scores from natural notes in the selected range.
- Renders the generated staff notation in-browser with OpenSheetMusicDisplay.
- Listens to Web MIDI note-on/note-off events and checks each played note against the expected sequence.
- Shows live practice stats: elapsed time, completed notes, accuracy, errors, current streak, progress, and missed-note feedback.
- Produces a session report with accuracy, speed in notes per minute, total time, errors, longest streak, and focus notes.
- Persists settings, custom trainings, seeded trainings, and session runs locally with IndexedDB; the app also registers a PWA service worker.

## How It Works

Architecture overview based on repo evidence:

- `src/app/main.tsx` initializes React, global error handlers, the PWA service worker, and the app providers.
- `src/app/providers/AppProviders.tsx` wraps the app in `BrowserRouter`; `src/app/App.tsx` owns routing, shared state, MIDI/session wiring, persistence hydration, settings saves, and session result creation.
- Routes are defined in `src/app/routes/index.ts`: setup (`/`), practice (`/practice`), results (`/results`), settings (`/settings`), and about (`/about`).
- Setup UI (`src/features/setup`) configures min note, max note, total notes, saved trainings, and previous session loading.
- Score generation (`src/entities/score/generateScore.ts`) turns the selected range/count/seed into MusicXML plus the expected MIDI note sequence.
- Practice UI (`src/features/practice`) renders MusicXML through OpenSheetMusicDisplay, advances the cursor, and displays live stats.
- MIDI hooks (`src/features/midi`) enumerate devices, bind selected inputs, normalize note-on/note-off messages, and expose connection status.
- Session logic (`src/features/session`) compares incoming MIDI notes to the expected note sequence and advances only when the correct note is released.
- Storage (`src/shared/storage/indexedDb.ts`) uses IndexedDB stores for `app_settings`, `session_runs`, and `custom_trainings`.

Data flow:

`Setup settings -> generateScore() -> Practice Staff render + expected notes -> Web MIDI input -> session comparator -> live stats/cursor -> finishSession() -> Results view + IndexedDB session run`

## How To Run

Minimal getting started steps from the repo:

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite, usually `http://localhost:5173`.

Requirements and notes:

- Node.js 20+ is recommended.
- npm is used for install/run scripts.
- MIDI features require a browser with Web MIDI API support.
- If MIDI is unavailable or permission is denied, the app continues with non-MIDI flows.
- Browser data is stored locally via IndexedDB.

## Repo Evidence Used

- `README.md`
- `package.json`
- `vite.config.js`
- `src/app/main.tsx`
- `src/app/App.tsx`
- `src/app/routes/index.ts`
- `src/entities/score/generateScore.ts`
- `src/features/setup/config/trainings.ts`
- `src/features/practice/components/PracticePlayerPage.tsx`
- `src/features/practice/components/Staff.tsx`
- `src/features/midi/hooks/useMidiDevices.ts`
- `src/features/midi/hooks/useMidiInput.ts`
- `src/features/session/hooks/useSightReadingSession.ts`
- `src/features/results/components/SessionResultPage.tsx`
- `src/shared/storage/indexedDb.ts`
