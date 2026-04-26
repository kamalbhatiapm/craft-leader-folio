import { Link } from "react-router-dom";
import { Camera, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import heronThumb from "@/assets/lens-heron.jpeg";

// Static count of viewable photos in the gallery.
// Kept in sync manually so the homepage doesn't import the full lens module
// (which would pull in references to all 12 gallery images).
const GALLERY_COUNT = 12;

export const LensTeaser = () => {
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
          className="group relative block overflow-hidden rounded-2xl border border-border/60 shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {/* Background image fills the entire card */}
          <img
            src={heronThumb}
            alt="A great blue heron walking across a grassy riverbank"
            loading="lazy"
            decoding="async"
            width="1600"
            height="900"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle tint to ensure glass legibility on either light/dark imagery */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/30 via-background/10 to-transparent" />

          <div className="relative grid min-h-[260px] gap-0 sm:min-h-[320px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            {/* Spacer column — lets the image breathe on desktop */}
            <div aria-hidden className="hidden sm:block" />

            {/* Glass panel */}
            <div className="m-3 flex flex-col items-start gap-6 rounded-xl border border-white/15 bg-background/40 p-6 shadow-[0_8px_32px_-12px_hsl(0_0%_0%/0.35)] backdrop-blur-xl backdrop-saturate-150 sm:m-5 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-white/10 dark:bg-background/30">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-primary/15 text-primary backdrop-blur-md">
                  <Camera className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <p className="font-serif text-xl text-foreground sm:text-2xl">
                    View the full gallery
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {GALLERY_COUNT} photographs, all shot by me — landscapes, light, and quiet moments.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-background/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-md transition-colors group-hover:bg-background/80 dark:border-white/10 dark:bg-background/40">
                Open gallery
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
