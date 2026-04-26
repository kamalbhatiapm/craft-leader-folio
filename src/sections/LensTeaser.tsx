import { Link } from "react-router-dom";
import { Camera, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { lens } from "@/content/lens";

export const LensTeaser = () => {
  const count = lens.filter((s) => !!s.src).length;

  return (
    <section
      id="lens"
      aria-labelledby="lens-heading"
      className="scroll-mt-20 outline-none"
    >
      <div className="container py-16 sm:py-24">
        <SectionHeader
          eyebrow="Through My Lens"
          title="Glimpses of life beyond the roadmap"
          description="Moments beyond work that keep me grounded and sharpen how I notice the world. Every photo here is captured by me."
        />

        <h2 id="lens-heading" className="sr-only">Through My Lens</h2>

        <Link
          to="/lens"
          className="group relative block overflow-hidden rounded-2xl border border-border bg-gradient-card p-8 sm:p-12 shadow-soft transition-shadow hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Camera className="h-7 w-7" aria-hidden />
              </span>
              <div>
                <p className="font-serif text-xl text-foreground sm:text-2xl">
                  View the full gallery
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {count} photographs, all shot by me — landscapes, light, and quiet moments.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors group-hover:bg-secondary">
              Open gallery
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};
