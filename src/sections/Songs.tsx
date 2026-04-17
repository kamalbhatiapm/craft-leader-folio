import { useRef, useState } from "react";
import { Music, Pause, Play, PlayCircle, SkipBack, SkipForward, X } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { songs } from "@/content/songs";

export const Songs = () => {
  const [playAll, setPlayAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const playableSongs = songs.filter((s): s is typeof s & { youtubeId: string } =>
    Boolean(s.youtubeId),
  );
  const playlistIds = playableSongs.map((s) => s.youtubeId);
  const hasPlaylist = playlistIds.length > 0;
  const [firstId, ...restIds] = playlistIds;
  // enablejsapi=1 is required for postMessage commands
  const embedSrc = hasPlaylist
    ? `https://www.youtube-nocookie.com/embed/${firstId}?rel=0&modestbranding=1&autoplay=1&enablejsapi=1&playlist=${restIds.join(",")}`
    : "";

  const sendCommand = (func: "nextVideo" | "previousVideo" | "playVideo" | "pauseVideo") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
  };

  const togglePlay = () => {
    if (isPlaying) {
      sendCommand("pauseVideo");
      setIsPlaying(false);
    } else {
      sendCommand("playVideo");
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!hasPlaylist) return;
    sendCommand("nextVideo");
    setCurrentIndex((i) => (i + 1) % playlistIds.length);
  };

  const handlePrev = () => {
    if (!hasPlaylist) return;
    sendCommand("previousVideo");
    setCurrentIndex((i) => (i - 1 + playlistIds.length) % playlistIds.length);
  };

  const currentSong = playableSongs[currentIndex];

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
              <Button
                size="lg"
                className="gap-2"
                onClick={() => {
                  setCurrentIndex(0);
                  setIsPlaying(true);
                  setPlayAll(true);
                }}
              >
                <PlayCircle className="h-5 w-5" aria-hidden />
                Play all
              </Button>
            ) : (
              <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-2 text-sm">
                    <Music className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <div className="min-w-0">
                      <div className="truncate font-medium">{currentSong?.title}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {currentSong?.artist}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrev}
                      aria-label="Previous track"
                    >
                      <SkipBack className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNext}
                      aria-label="Next track"
                    >
                      <SkipForward className="h-4 w-4" aria-hidden />
                    </Button>
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
                </div>
                {/* Audio-only: video frame is hidden off-screen, audio still plays */}
                <div aria-hidden className="h-0 w-0 overflow-hidden">
                  <iframe
                    ref={iframeRef}
                    src={embedSrc}
                    title="Hype songs playlist"
                    allow="autoplay; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="h-[1px] w-[1px] border-0"
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
