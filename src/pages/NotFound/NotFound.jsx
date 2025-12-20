import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-gray-600 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-gray-600 hover:bg-gray-900 text-white px-6 py-2 rounded-lg transition"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
