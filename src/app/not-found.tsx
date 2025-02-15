import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-center">
      <div className="max-w-md w-full bg-background p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-white">404</h1>
        <p className="mt-4 text-lg text-white">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <p className="mt-2 text-sm text-white">
          It might have been moved, or the URL might be incorrect.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
