import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AppProviders from "./providers/AppProviders";
import "../styles.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
