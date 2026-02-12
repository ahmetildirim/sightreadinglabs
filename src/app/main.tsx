import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AppProviders from "./providers/AppProviders";
import ErrorBoundary from "./ErrorBoundary";
import { initGlobalErrorHandlers } from "./telemetry/initGlobalErrorHandlers";
import "../styles.css";

initGlobalErrorHandlers();

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <App />
      </AppProviders>
    </ErrorBoundary>
  </React.StrictMode>,
);
