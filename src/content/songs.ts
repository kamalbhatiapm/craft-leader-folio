export type Song = {
  id: string;
  title: string;
  artist: string;
  why: string;
  cover?: string;
  youtubeId?: string;
  links: { youtube?: string };
};

export const songs: Song[] = [
  {
    id: "s1",
    title: "I Believe That We Will Win (World Anthem)",
    artist: "Pitbull",
    why: "[TODO: one-line why this song]",
    youtubeId: "mNEUkkoUoIA",
    links: { youtube: "https://youtu.be/mNEUkkoUoIA?si=slycm7MERSX6BVzN" },
  },
  {
    id: "s2",
    title: "A Sky Full Of Stars",
    artist: "Coldplay",
    why: "[TODO: one-line why this song]",
    youtubeId: "VPRjCeoBqrI",
    links: { youtube: "https://youtu.be/VPRjCeoBqrI?si=y9Rqk_bMXL1X1rUS" },
  },
  {
    id: "s3",
    title: "Empire State Of Mind",
    artist: "JAY-Z ft. Alicia Keys",
    why: "[TODO: one-line why this song]",
    youtubeId: "vk6014HuxcE",
    links: { youtube: "https://youtu.be/vk6014HuxcE?si=AW4DTS6I7x0Ui-Om" },
  },
];
