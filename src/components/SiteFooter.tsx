export const SiteFooter = () => {
  const year = new Date().getFullYear();
  const updated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col items-start justify-between gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>© {year} — All rights reserved.</p>
        <p>Last updated {updated}</p>
        <p>
          Built with <span className="text-foreground">React</span>,{" "}
          <span className="text-foreground">Vite</span>,{" "}
          <span className="text-foreground">Tailwind</span> &{" "}
          <span className="text-foreground">shadcn/ui</span>.
        </p>
      </div>
    </footer>
  );
};
