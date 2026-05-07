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
    youtubeId: "WpYeekQkAdc",
    links: { youtube: "https://youtu.be/WpYeekQkAdc?si=M1hCCFRXNfX-XOGA" },
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
