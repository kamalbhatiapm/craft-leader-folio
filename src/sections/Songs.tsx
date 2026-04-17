import { Music } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { songs } from "@/content/songs";

const ext = { target: "_blank", rel: "noopener noreferrer external" } as const;

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
        {songs.map((s) => {
          const href = s.links.youtube && s.links.youtube !== "#"
            ? s.links.youtube
            : s.youtubeId
              ? `https://www.youtube.com/watch?v=${s.youtubeId}`
              : undefined;
          const thumb = s.cover ?? (s.youtubeId ? `https://i.ytimg.com/vi/${s.youtubeId}/hqdefault.jpg` : undefined);

          return (
            <li key={s.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-0.5">
                {href ? (
                  <a
                    href={href}
                    {...ext}
                    aria-label={`Watch ${s.title} by ${s.artist} on YouTube`}
                    className="relative block aspect-video overflow-hidden bg-black"
                  >
                    {thumb ? (
                      <img
                        src={thumb}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-card">
                        <Music className="h-10 w-10 text-primary/70" aria-hidden />
                      </div>
                    )}
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 shadow-soft">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-0.5 fill-foreground" aria-hidden>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </a>
                ) : (
                  <div className="aspect-video bg-gradient-card flex items-center justify-center">
                    <Music className="h-10 w-10 text-primary/70" aria-hidden />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl tracking-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.artist}</p>
                  

                  {href && (
                    <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-border">
                      <a
                        href={href}
                        {...ext}
                        className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        YouTube
                      </a>
                    </div>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
