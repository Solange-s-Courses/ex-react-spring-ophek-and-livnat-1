import React from "react";

/**
 * The NotFound component displayed when a user navigates to an undefined route.
 *
 * @component
 * @returns {JSX.Element} The rendered 404 page.
 * @constructor
 */
export default function NotFound() {
    return (
        <div className="container my-5">
            <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                    <h1 className="card-title display-4 text-danger mb-3">404</h1>
                    <h2 className="mb-4">Page Not Found</h2>
                    <p className="lead mb-4">
                        Sorry, the page you're looking for doesn't exist or has been moved.
                    </p>
                    <p className="text-muted mb-0">
                        Please check the URL or use the navigation bar above to find your way.
                    </p>
                </div>
            </div>
        </div>
    );
}