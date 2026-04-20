import { useState } from "react";
import { Camera } from "lucide-react";
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
  const [activeShot, setActiveShot] = useState<LensShot | null>(null);

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
                onClick={() => shot.src && setActiveShot(shot)}
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

      <Dialog open={!!activeShot} onOpenChange={(open) => !open && setActiveShot(null)}>
        <DialogContent className="max-w-5xl border-border bg-background/95 p-0 backdrop-blur">
          <VisuallyHidden>
            <DialogTitle>{activeShot?.caption ?? "Photo"}</DialogTitle>
            <DialogDescription>
              {activeShot?.location ?? "Photo from the Through My Lens collection"}
            </DialogDescription>
          </VisuallyHidden>
          {activeShot?.src && (
            <div className="flex flex-col">
              <div className="flex items-center justify-center bg-muted/30">
                <img
                  src={activeShot.src}
                  alt={activeShot.alt ?? activeShot.caption}
                  className="max-h-[80vh] w-auto object-contain"
                />
              </div>
              <div className="border-t border-border p-5">
                <p className="text-base font-medium leading-snug text-foreground">
                  {activeShot.caption}
                </p>
                {activeShot.location && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activeShot.location}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
