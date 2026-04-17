export type Song = {
  id: string;
  title: string;
  artist: string;
  why: string;
  cover?: string;
  links: { youtube?: string };
};

export const songs: Song[] = [
  {
    id: "s1",
    title: "[TODO: song 1]",
    artist: "[TODO: artist]",
    why: "[TODO: one-line why this song]",
    links: { youtube: "#" },
  },
  {
    id: "s2",
    title: "[TODO: song 2]",
    artist: "[TODO: artist]",
    why: "[TODO: one-line why this song]",
    links: { youtube: "#" },
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
