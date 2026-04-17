import { Music } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { songs } from "@/content/songs";

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
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft">
              {s.youtubeId ? (
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${s.youtubeId}?rel=0&modestbranding=1`}
                    title={`${s.title} — ${s.artist}`}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gradient-card">
                  {s.cover ? (
                    <img src={s.cover} alt="" loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <Music className="h-10 w-10 text-primary/70" aria-hidden />
                  )}
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-xl tracking-tight">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.artist}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
