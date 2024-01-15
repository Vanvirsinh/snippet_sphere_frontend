import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-lg mb-8">
            The page you're looking for doesn't exist.
          </p>
          <Link to="/">
            <button className="bg-light-purple text-white py-2 px-4 rounded transition duration-300 hover:bg-light-purple/[0.8]">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
