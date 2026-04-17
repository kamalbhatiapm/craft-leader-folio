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
    youtubeId: "ZxMaHi91RkE",
    links: { youtube: "https://www.youtube.com/watch?v=ZxMaHi91RkE" },
  },
  {
    id: "s2",
    title: "CAN'T STOP THE FEELING!",
    artist: "Justin Timberlake",
    why: "[TODO: one-line why this song]",
    youtubeId: "ru0K8uYEZWw",
    links: { youtube: "https://www.youtube.com/watch?v=ru0K8uYEZWw" },
  },
  {
    id: "s3",
    title: "[TODO: song 3]",
    artist: "[TODO: artist]",
    why: "[TODO: one-line why this song]",
    links: { youtube: "#" },
  },
  {
    id: "s4",
    title: "[TODO: song 4]",
    artist: "[TODO: artist]",
    why: "[TODO: one-line why this song]",
    links: { youtube: "#" },
  },
  {
    id: "s5",
    title: "[TODO: song 5]",
    artist: "[TODO: artist]",
    why: "[TODO: one-line why this song]",
    links: { youtube: "#" },
  },
];
