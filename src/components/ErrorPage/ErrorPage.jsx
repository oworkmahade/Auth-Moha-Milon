import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl text-gray-700">Oops! Page not found.</p>
      <p className="mt-2 text-gray-500">
        The page you are looking for doesn't exist.
      </p>

      <a
        href="/"
        className="px-6 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
