import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "shared/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const container = document.getElementById("app");
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
  <HashRouter>
    <MaterialUIControllerProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </MaterialUIControllerProvider>
  </HashRouter>
);
