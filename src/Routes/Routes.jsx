import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import AuthPage from "../pages/Auth";
import AppLayout from "../layout/AppLayout";
import Explore from "../pages/Explore";
import PrivateRoutes from "./PrivateRoutes";
import AIPlanner from "../pages/AI_Planner";
import Trips from "../pages/Trips/AllTrips";
import TripDetail from "./../pages/Trips/TripIternary";
import NotesPage from "../pages/NotePad";
import SavedNotes from "../pages/NotePad/SavedNotes";

export const RouteError = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "Unexpected error occurred.";

  if (isRouteErrorResponse(error) && error.status === 404) {
    title = "404";
    message = "Page not found";
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
        element: <PrivateRoutes />,
        children: [
          {
            path: "/explore",
            element: <Explore />,
          },
        ],
      },
      {
        path: "/ai-assistant",
        element: <AIPlanner />,
      },
      {
        path: "/trips",
        element: <Trips />,
      },
      {
        path: "/trips/:id",
        element: <TripDetail />,
      },
      {
        path: "/notes",
        element: <NotesPage />,
      },
      {
        path: "/notes/saved",
        element: <SavedNotes />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);
