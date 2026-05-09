import { useEffect, useRef, useState } from "react";
import {
  Music,
  Pause,
  Play,
  PlayCircle,
  Rewind,
  FastForward,
  Repeat,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { songs } from "@/content/songs";

export const Songs = () => {
  const [playAll, setPlayAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loop, setLoop] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const playableSongs = songs.filter((s): s is typeof s & { youtubeId: string } =>
    Boolean(s.youtubeId),
  );
  const playlistIds = playableSongs.map((s) => s.youtubeId);
  const hasPlaylist = playlistIds.length > 0;
  const [firstId] = playlistIds;
  // enablejsapi=1 enables postMessage commands. Include ALL ids (including firstId)
  // in the `playlist` param so the first song plays first and the set loops correctly.
  const embedSrc = hasPlaylist
    ? `https://www.youtube-nocookie.com/embed/${firstId}?rel=0&modestbranding=1&autoplay=1&enablejsapi=1&loop=1&playlist=${playlistIds.join(",")}`
    : "";

  const sendCommand = (
    func:
      | "nextVideo"
      | "previousVideo"
      | "playVideo"
      | "pauseVideo"
      | "seekTo"
      | "getPlaylistIndex"
      | "getVideoUrl",
    args: (number | boolean)[] = [],
  ) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  };

  const sendListening = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening" }),
      "*",
    );
  };

  // Track playback time so we can seek relative to current position
  const currentTimeRef = useRef(0);

  useEffect(() => {
    if (!playAll) return;

    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      try {
        const data = JSON.parse(e.data);
        const info = data?.info;
        if (!info) return;
        if (typeof info.currentTime === "number") {
          currentTimeRef.current = info.currentTime;
        }
        // Sync currentIndex when YouTube auto-advances. The player reports
        // playlistIndex on track changes; videoData.video_id is the source of truth.
        const videoId: string | undefined = info.videoData?.video_id;
        if (videoId) {
          const idx = playlistIds.indexOf(videoId);
          if (idx >= 0) {
            setCurrentIndex((prev) => {
              // If loop is off and we wrapped back to an earlier index, pause.
              if (!loop && idx < prev) {
                sendCommand("pauseVideo");
                setIsPlaying(false);
              }
              return idx;
            });
          }
        } else if (typeof info.playlistIndex === "number" && info.playlistIndex >= 0) {
          const idx = info.playlistIndex % playlistIds.length;
          setCurrentIndex(idx);
        }
      } catch {
        // ignore non-JSON messages
      }
    };

    window.addEventListener("message", onMessage);
    // Tell the player we want event updates
    const t = setTimeout(sendListening, 500);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(t);
    };
  }, [playAll, playlistIds, loop]);

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

  const seekRelative = (delta: number) => {
    const target = Math.max(0, currentTimeRef.current + delta);
    sendCommand("seekTo", [target, true]);
    currentTimeRef.current = target;
  };

  const currentSong = playableSongs[currentIndex];

  return (
    <section
      id="songs"
      aria-labelledby="songs-heading"
      className="scroll-mt-20 outline-none"
    >
      <div className="container py-16 sm:py-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Hype Songs"
            title="Soundtracks to shipping."
            description="Songs that get me into deep work, ship mode, or pre-demo nerves."
          />
          {hasPlaylist && !playAll && (
            <Button
              size="lg"
              className="gap-2 self-start sm:self-auto"
              onClick={() => {
                setCurrentIndex(0);
                setIsPlaying(true);
                setPlayAll(true);
              }}
            >
              <PlayCircle className="h-5 w-5" aria-hidden />
              Play all
            </Button>
          )}
        </div>
        <h2 id="songs-heading" className="sr-only">Hype Songs</h2>

        {hasPlaylist && playAll && (
          <div className="mb-8 flex flex-col items-center gap-4">
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
                      onClick={() => seekRelative(-10)}
                      aria-label="Rewind 10 seconds"
                    >
                      <Rewind className="h-4 w-4" aria-hidden />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" aria-hidden />
                      ) : (
                        <Play className="h-4 w-4" aria-hidden />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => seekRelative(10)}
                      aria-label="Fast-forward 10 seconds"
                    >
                      <FastForward className="h-4 w-4" aria-hidden />
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
                      size="icon"
                      onClick={() => setLoop((l) => !l)}
                      aria-label={loop ? "Disable loop" : "Enable loop"}
                      aria-pressed={loop}
                      className={loop ? "text-primary" : ""}
                    >
                      <Repeat className="h-4 w-4" aria-hidden />
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
          </div>
        )}

      </div>
    </section>
  );
};
