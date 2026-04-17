import { Music } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { songs } from "@/content/songs";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export const Songs = () => (
  <section
    id="songs"
    aria-labelledby="songs-heading"
    className="scroll-mt-20 outline-none"
  >
    <div className="container py-16 sm:py-24">
      <SectionHeader
        eyebrow="Hype Songs"
        title="The soundtrack to shipping."
        description="Songs that get me into deep work, ship mode, or pre-demo nerves."
      />
      <h2 id="songs-heading" className="sr-only">Hype Songs</h2>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {songs.map((s) => (
          <li key={s.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-0.5">
              <div className="aspect-square bg-gradient-card flex items-center justify-center">
                {s.cover ? (
                  <img src={s.cover} alt="" loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <Music className="h-10 w-10 text-primary/70" aria-hidden />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-xl tracking-tight">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.artist}</p>
                <p className="mt-3 text-sm italic text-foreground/80">"{s.why}"</p>

                <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-border">
                  {s.links.youtube && (
                    <a
                      href={s.links.youtube}
                      {...ext}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
