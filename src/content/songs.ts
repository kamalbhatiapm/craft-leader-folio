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
    title: "Fight Till You Win",
    artist: "Ed Sheeran ft. Rihanna & Lady Gaga",
    why: "[TODO: one-line why this song]",
    youtubeId: "vk6014HuxcE",
    links: { youtube: "https://youtu.be/vk6014HuxcE?si=AW4DTS6I7x0Ui-Om" },
  },
];
