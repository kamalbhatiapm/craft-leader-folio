import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404: route not found:", location.pathname);
    document.title = "404 — Lost in space";
  }, [location.pathname]);

  return (
    <main className="bg-hero min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-serif text-7xl sm:text-8xl text-primary">404</p>
        <h1 className="mt-4 font-serif text-2xl sm:text-3xl">
          This page wandered off the roadmap.
        </h1>
        <p className="mt-3 text-muted-foreground">
          The URL <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">{location.pathname}</code> doesn't exist — or doesn't exist yet.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          ← Back to home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
