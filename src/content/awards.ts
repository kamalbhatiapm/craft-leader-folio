export type Award = {
  id: string;
  title: string;
  issuer: string;
  year: number;
  description: string;
  url?: string;
};

export const awards: Award[] = [
  {
    id: "award-1",
    title: "[TODO: Award title]",
    issuer: "[TODO: Issuer]",
    year: 2024,
    description: "[TODO: 1-2 line description of what this award recognized]",
    url: "#",
  },
  {
    id: "award-2",
    title: "[TODO: Award title]",
    issuer: "[TODO: Issuer]",
    year: 2023,
    description: "[TODO: 1-2 line description]",
  },
  {
    id: "award-3",
    title: "[TODO: Award title]",
    issuer: "[TODO: Issuer]",
    year: 2022,
    description: "[TODO: 1-2 line description]",
  },
];
