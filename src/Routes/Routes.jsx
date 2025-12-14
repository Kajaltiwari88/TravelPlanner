import { createBrowserRouter, Link } from "react-router";
import AuthPage from "../pages/Auth";
import Home from "../pages/Home";
import AppLayout from "../layout/AppLayout";
import Explore from "../pages/Explore";
import AIAssistant from "../components/AIAssistant";

import { useRouteError, isRouteErrorResponse } from "react-router";

export const RouteError = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "Unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    if (error?.status === 404) {
      title = "404";
      message = "Page not found";
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg)">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-(--text-primary)">
          {title}
        </h1>
        <p className="mt-2 text-(--text-secondary)">{message}</p>

        <Link
          to="/"
          className="
            mt-6 inline-block rounded-xl px-4 py-2
            bg-(--primary)
            text-(--btn-primary-text)
            hover:bg-(--primary-hover)
            transition
          "
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default RouteError;

export const Routes = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/ai-assistant",
        element: <AIAssistant />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);
