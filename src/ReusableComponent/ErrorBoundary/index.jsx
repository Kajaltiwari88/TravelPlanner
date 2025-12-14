import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg) px-4">
      <div className="w-full max-w-md rounded-2xl bg-(--card) p-6 text-center shadow-md">
        <h2 className="text-xl font-semibold text-(--text-primary)">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-(--text-secondary)">
          {error?.message || "Unexpected error occurred."}
        </p>

        <button
          onClick={resetErrorBoundary}
          className="
            mt-6 rounded-xl px-4 py-2 text-sm
            bg-(--primary)
            text-(--btn-primary-text)
            hover:bg-(--primary-hover)
            transition
          "
        >
          Try again
        </button>
      </div>
    </div>
  );
};

const AppErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default AppErrorBoundary;
