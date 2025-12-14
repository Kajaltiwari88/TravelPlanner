import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { RouterProvider } from "react-router";
import { Routes } from "./Routes/Routes.jsx";
import "./index.css";
import "../src/styles/theme.css";
import AppErrorBoundary from "./ReusableComponent/ErrorBoundary/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AppErrorBoundary>
        <RouterProvider router={Routes}></RouterProvider>
      </AppErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
