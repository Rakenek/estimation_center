import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
      <p className="text-white mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
