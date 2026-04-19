import { Camera } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { lens } from "@/content/lens";
import { cn } from "@/lib/utils";

const aspectClass: Record<NonNullable<typeof lens[number]["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

export const Lens = () => {
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
            <li
              key={shot.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card shadow-soft",
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
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-background/95 via-background/70 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium leading-snug text-foreground">
                  {shot.caption}
                </p>
                {shot.location && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {shot.location}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
