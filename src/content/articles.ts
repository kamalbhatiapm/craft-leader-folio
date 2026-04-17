export type ArticleSource = "Medium" | "LinkedIn" | "Substack" | "Blog" | "Other";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  source: ArticleSource;
  url: string;
  publishedAt: string; // ISO
  readTimeMin: number;
  tags?: string[];
};

export const articles: Article[] = [
  {
    id: "a1",
    title: "[TODO: article 1 title]",
    excerpt: "[TODO: 2-line excerpt]",
    source: "Medium",
    url: "#",
    publishedAt: "2025-01-15",
    readTimeMin: 6,
    tags: ["product"],
  },
  {
    id: "a2",
    title: "[TODO: article 2 title]",
    excerpt: "[TODO: 2-line excerpt]",
    source: "LinkedIn",
    url: "#",
    publishedAt: "2024-09-02",
    readTimeMin: 4,
    tags: ["leadership"],
  },
  {
    id: "a3",
    title: "[TODO: article 3 title]",
    excerpt: "[TODO: 2-line excerpt]",
    source: "Substack",
    url: "#",
    publishedAt: "2024-04-21",
    readTimeMin: 8,
    tags: ["craft"],
  },
];
