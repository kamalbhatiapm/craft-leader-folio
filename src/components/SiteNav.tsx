import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/useTheme";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "AI Projects" },
  { id: "articles", label: "Articles" },
  { id: "awards", label: "Awards & Certifications" },
  { id: "songs", label: "Hype Songs" },
  { id: "quotes", label: "Quotes" },
];

export const SiteNav = () => {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    // Move focus for a11y
    el.setAttribute("tabindex", "-1");
    (el as HTMLElement).focus({ preventScroll: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-4">
        <a
          href="#about"
          onClick={(e) => handleClick(e, "about")}
          className="text-sm font-semibold tracking-tight"
          aria-label="Back to top"
        >
          <span className="font-serif text-base">◐</span>
          <span className="ml-2">Portfolio</span>
        </a>

        <nav aria-label="Section navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => handleClick(e, s.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      "text-muted-foreground hover:text-foreground hover:bg-secondary",
                      isActive && "text-foreground bg-secondary",
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-secondary transition-colors"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
        </button>
      </div>

      {/* Mobile nav row */}
      <nav aria-label="Section navigation (mobile)" className="md:hidden border-t border-border/60">
        <ul className="container flex gap-1 overflow-x-auto py-2">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleClick(e, s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium",
                    "text-muted-foreground hover:text-foreground",
                    isActive && "text-foreground bg-secondary",
                  )}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
