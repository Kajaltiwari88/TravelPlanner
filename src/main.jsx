import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./Routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppErrorBoundary from "./ReusableComponent/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./styles/theme.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <AppErrorBoundary>
          <AuthProvider>
            <RouterProvider router={Routes} />
          </AuthProvider>
        </AppErrorBoundary>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
