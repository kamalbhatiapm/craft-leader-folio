import { useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Articles } from "@/sections/Articles";
import { Awards } from "@/sections/Awards";
import { Songs } from "@/sections/Songs";
import { Quotes } from "@/sections/Quotes";
import { Lens } from "@/sections/Lens";
import { getInitialTheme } from "@/lib/useTheme";

const Index = () => {
  // Apply persisted theme on mount (no flash; runs synchronously on first render)
  useEffect(() => {
    const t = getInitialTheme();
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.style.colorScheme = t;
    document.title = "Portfolio — Product Leader";
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
        <Songs />
        <Quotes />
        <Lens />
      </main>
      <SiteFooter />
    </>
  );
};

export default Index;
