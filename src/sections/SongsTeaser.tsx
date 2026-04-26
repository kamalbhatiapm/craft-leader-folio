import { Link } from "react-router-dom";
import { Music, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { songs } from "@/content/songs";

export const SongsTeaser = () => {
  const count = songs.length;

  return (
    <section
      id="songs"
      aria-labelledby="songs-heading"
      className="scroll-mt-20 outline-none"
    >
      <div className="container py-16 sm:py-24">
        <SectionHeader
          eyebrow="Hype Songs"
          title="Soundtracks to shipping."
          description="Songs that get me into deep work, ship mode, or pre-demo nerves."
        />

        <h2 id="songs-heading" className="sr-only">Hype Songs</h2>

        <Link
          to="/songs"
          className="group relative block overflow-hidden rounded-2xl border border-border bg-gradient-card p-8 sm:p-12 shadow-soft transition-shadow hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Music className="h-7 w-7" aria-hidden />
              </span>
              <div>
                <p className="font-serif text-xl text-foreground sm:text-2xl">
                  Listen to the playlist
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {count} tracks — for deep work, ship mode, and pre-demo nerves.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors group-hover:bg-secondary">
              Open playlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};
