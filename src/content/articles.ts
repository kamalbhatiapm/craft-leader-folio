export type ArticleSource = "LinkedIn";

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
    title: "What makes an AI system truly agentic?",
    excerpt: "[TODO: 2-line excerpt]",
    source: "LinkedIn",
    url: "https://www.linkedin.com/posts/kbhatiatech_what-makes-an-ai-system-truly-agentic-ugcPost-7429905010328776704-bFQm",
    publishedAt: "2025-01-15",
    readTimeMin: 6,
    tags: ["product"],
  },
  {
    id: "a2",
    title: "[TODO: LinkedIn article 2 title]",
    excerpt: "[TODO: 2-line excerpt]",
    source: "LinkedIn",
    url: "#",
    publishedAt: "2024-09-02",
    readTimeMin: 4,
    tags: ["leadership"],
  },
];
