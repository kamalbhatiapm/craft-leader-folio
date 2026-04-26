import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Songs } from "@/sections/Songs";
import { getInitialTheme } from "@/lib/useTheme";

const SongsPage = () => {
  useEffect(() => {
    const t = getInitialTheme();
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.style.colorScheme = t;
    document.title = "Hype Songs — Portfolio";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="container pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to portfolio
          </Link>
        </div>
        <Songs />
      </main>
      <SiteFooter />
    </>
  );
};

export default SongsPage;
