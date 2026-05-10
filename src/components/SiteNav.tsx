import { Moon, Sun } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/useTheme";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string; route?: string };

const SECTIONS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "AI Projects" },
  { id: "articles", label: "Articles" },
  { id: "awards", label: "Awards & Certifications" },
  { id: "quotes", label: "Quotes" },
  { id: "lens", label: "Through My Lens", route: "/lens" },
];

export const SiteNav = () => {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const active = useActiveSection(isHome ? SECTIONS.filter((s) => !s.route).map((s) => s.id) : []);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.route) return; // let Link handle routing
    e.preventDefault();
    if (!isHome) {
      navigate(`/#${item.id}`);
      return;
    }
    const el = document.getElementById(item.id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${item.id}`);
    el.setAttribute("tabindex", "-1");
    (el as HTMLElement).focus({ preventScroll: true });
  };

  const renderLink = (s: NavItem, isActive: boolean, mobile = false) => {
    const className = cn(
      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
      mobile
        ? "text-muted-foreground hover:text-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
      isActive && "text-foreground bg-secondary",
    );

    if (s.route) {
      return (
        <Link
          to={s.route}
          aria-current={isActive ? "page" : undefined}
          className={className}
        >
          {s.label}
        </Link>
      );
    }

    return (
      <a
        href={`/#${s.id}`}
        onClick={(e) => handleSectionClick(e, s)}
        aria-current={isActive ? "true" : undefined}
        className={className}
      >
        {s.label}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight"
          aria-label="Back to top"
        >
          <span className="font-serif text-base">◐</span>
          <span className="ml-2">Portfolio</span>
        </Link>

        <nav aria-label="Section navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {SECTIONS.map((s) => {
              const isActive = s.route
                ? location.pathname === s.route
                : isHome && active === s.id;
              return <li key={s.id}>{renderLink(s, isActive)}</li>;
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
            const isActive = s.route
              ? location.pathname === s.route
              : isHome && active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                {renderLink(s, isActive, true)}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
