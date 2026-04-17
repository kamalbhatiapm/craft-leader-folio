import { useState } from "react";
import { Music, PlayCircle, X } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { songs } from "@/content/songs";

export const Songs = () => {
  const [playAll, setPlayAll] = useState(false);
  const playlistIds = songs
    .map((s) => s.youtubeId)
    .filter((id): id is string => Boolean(id));
  const hasPlaylist = playlistIds.length > 0;
  const [firstId, ...restIds] = playlistIds;
  const embedSrc = hasPlaylist
    ? `https://www.youtube-nocookie.com/embed/${firstId}?rel=0&modestbranding=1&autoplay=1&playlist=${restIds.join(",")}`
    : "";

  return (
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

        {hasPlaylist && (
          <div className="mb-8 flex flex-col items-center gap-4">
            {!playAll ? (
              <Button size="lg" className="gap-2" onClick={() => setPlayAll(true)}>
                <PlayCircle className="h-5 w-5" aria-hidden />
                Play all
              </Button>
            ) : (
              <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                <div className="flex items-center justify-between border-b border-border px-4 py-2">
                  <span className="text-sm font-medium">Now playing — Hype playlist</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    onClick={() => setPlayAll(false)}
                    aria-label="Stop playlist"
                  >
                    <X className="h-4 w-4" aria-hidden />
                    Stop
                  </Button>
                </div>
                <div className="h-24 bg-black sm:h-28">
                  <iframe
                    src={embedSrc}
                    title="Hype songs playlist"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            )}
          </div>
        )}

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
};
