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
    id: "pitch-day-2026",
    title: "Pitch Day — Most Comprehensive Project",
    issuer: "Agentic AI Product Management Certification",
    year: 2026,
    description:
      "Recognized for building a complete, end-to-end AI product with exceptional depth, clarity, and execution during the Agentic AI PM course.",
  },
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
