"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to the console for debugging purposes
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-red-600">
          Something went wrong!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          We encountered an unexpected error. Please try again later.
        </p>
        <button
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => reset()} // Tries to reset the error boundary
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
