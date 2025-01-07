import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-100">
      <div className="max-w-xl w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-4">{error.message || "Something went wrong"}</p>
          <button onClick={() => window.history.back()} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
