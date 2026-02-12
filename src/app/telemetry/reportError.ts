export interface ErrorReport {
  message: string;
  stack?: string;
  source: "error-boundary" | "window-error" | "unhandled-rejection";
  metadata?: Record<string, unknown>;
}

export function reportError(report: ErrorReport): void {
  // Replace this with your provider SDK (e.g. Sentry.captureException).
  console.error("[telemetry]", report);
}
