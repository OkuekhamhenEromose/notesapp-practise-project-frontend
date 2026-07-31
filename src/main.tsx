// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider";
import { App } from "./App";
import "./index.css";

// createRoot: React 18's new rendering API. The ! tells TypeScript that document.getElementById("root") is not null.
ReactDOM.createRoot(document.getElementById("root")!).render( 
  <React.StrictMode> // React.StrictMode: Development-only checks for common mistakes deprecated APIs, side effects, etc. Renders components twice to detect impure renders.
    <AuthProvider> // AuthProvider: Wraps the entire app so any component can access auth state.
      <App />
    </AuthProvider>
  </React.StrictMode>
);