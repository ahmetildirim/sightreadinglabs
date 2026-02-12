import { reportError } from "./reportError";

export function initGlobalErrorHandlers(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.addEventListener("error", (event) => {
    reportError({
      source: "window-error",
      message: event.message,
      stack: event.error instanceof Error ? event.error.stack : undefined,
      metadata: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    reportError({
      source: "unhandled-rejection",
      message: reason instanceof Error ? reason.message : String(reason),
      stack: reason instanceof Error ? reason.stack : undefined,
    });
  });
}
