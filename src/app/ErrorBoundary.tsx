import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportError } from "./telemetry/reportError";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    reportError({
      source: "error-boundary",
      message: error.message,
      stack: error.stack,
      metadata: {
        componentStack: info.componentStack,
      },
    });
  }

  public render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="app-page">
        <main className="setup-main" style={{ padding: "2rem" }}>
          <h1>Something went wrong</h1>
          <p>The error has been reported. Refresh to continue.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </main>
      </div>
    );
  }
}
