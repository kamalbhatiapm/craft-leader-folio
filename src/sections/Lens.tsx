import { useState, useEffect, useCallback } from "react";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { lens, type LensShot } from "@/content/lens";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const aspectClass: Record<NonNullable<LensShot["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

export const Lens = () => {
  const viewableShots = lens.filter((s) => !!s.src);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeShot = activeIndex !== null ? viewableShots[activeIndex] : null;

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i - 1 + viewableShots.length) % viewableShots.length));
  }, [viewableShots.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % viewableShots.length));
  }, [viewableShots.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, showPrev, showNext]);

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
          description="Moments beyond work that keep me grounded and sharpen how I notice the world."
        />

        <h2 id="lens-heading" className="sr-only">Through My Lens</h2>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {lens.map((shot) => (
            <li key={shot.id}>
              <button
                type="button"
                onClick={() => {
                  if (!shot.src) return;
                  const idx = viewableShots.findIndex((s) => s.id === shot.id);
                  if (idx >= 0) setActiveIndex(idx);
                }}
                disabled={!shot.src}
                aria-label={shot.alt ?? shot.caption}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-shadow",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  shot.src ? "cursor-zoom-in hover:shadow-elegant" : "cursor-default",
                  aspectClass[shot.aspect ?? "square"],
                )}
              >
                {shot.src ? (
                  <img
                    src={shot.src}
                    alt={shot.alt ?? shot.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="flex h-full w-full items-center justify-center bg-gradient-card"
                  >
                    <Camera className="h-8 w-8 text-primary/60" />
                  </div>
                )}

                {/* Caption overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-background/95 via-background/70 to-transparent p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-medium leading-snug text-foreground">
                    {shot.caption}
                  </p>
                  {shot.location && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {shot.location}
                    </p>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-w-5xl border-border bg-background/95 p-0 backdrop-blur">
          <VisuallyHidden>
            <DialogTitle>{activeShot?.caption ?? "Photo"}</DialogTitle>
            <DialogDescription>
              {activeShot?.location ?? "Photo from the Through My Lens collection"}
            </DialogDescription>
          </VisuallyHidden>
          {activeShot?.src && (
            <div className="relative flex flex-col">
              <div className="relative flex items-center justify-center bg-muted/30">
                <img
                  src={activeShot.src}
                  alt={activeShot.alt ?? activeShot.caption}
                  className="max-h-[80vh] w-auto object-contain"
                />

                {viewableShots.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 text-foreground shadow-soft backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 text-foreground shadow-soft backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-end justify-between gap-4 border-t border-border p-5">
                <div>
                  <p className="text-base font-medium leading-snug text-foreground">
                    {activeShot.caption}
                  </p>
                  {activeShot.location && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {activeShot.location}
                    </p>
                  )}
                </div>
                {viewableShots.length > 1 && activeIndex !== null && (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {activeIndex + 1} / {viewableShots.length}
                  </span>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
