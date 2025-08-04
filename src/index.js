import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "shared/context/AuthContext";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <HashRouter>
    <MaterialUIControllerProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MaterialUIControllerProvider>
  </HashRouter>
);
