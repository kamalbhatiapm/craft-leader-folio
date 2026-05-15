import { useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Articles } from "@/sections/Articles";
import { Awards } from "@/sections/Awards";
import { Songs } from "@/sections/Songs";
import { Quotes } from "@/sections/Quotes";
import { MoodCheck } from "@/sections/MoodCheck";
import { LensTeaser } from "@/sections/LensTeaser";
import { getInitialTheme } from "@/lib/useTheme";

const Index = () => {
  // Apply persisted theme on mount (no flash; runs synchronously on first render)
  useEffect(() => {
    const t = getInitialTheme();
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.style.colorScheme = t;
    document.title = "Portfolio — Product Leader";

    // Scroll to hash target if arriving with one (e.g. /#about from another page)
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <About />
        <Projects />
        <Articles />
        <Awards />
        {/* <Songs /> hidden for later */}
        <Quotes />
        <LensTeaser />
      </main>
      <SiteFooter />
    </>
  );
};

export default Index;
