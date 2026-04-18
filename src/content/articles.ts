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
    title: "AI Strategy",
    excerpt: "[TODO: 2-line excerpt]",
    source: "LinkedIn",
    url: "https://www.linkedin.com/posts/kbhatiatech_ai-strategy-ugcPost-7431114848152997888-Xne0",
    publishedAt: "2024-09-02",
    readTimeMin: 4,
    tags: ["leadership"],
  },
  {
    id: "a3",
    title: "ML",
    excerpt: "[TODO: 2-line excerpt]",
    source: "LinkedIn",
    url: "https://www.linkedin.com/posts/kbhatiatech_ml-ugcPost-7434054905633517568-XJjk",
    publishedAt: "2024-12-01",
    readTimeMin: 4,
    tags: ["ml"],
  },
  {
    id: "a4",
    title: "Knowledge Access",
    excerpt: "[TODO: 2-line excerpt]",
    source: "LinkedIn",
    url: "https://www.linkedin.com/posts/kbhatiatech_knowledge-access-ugcPost-7437632308557496321-YS1U",
    publishedAt: "2024-12-15",
    readTimeMin: 4,
    tags: ["knowledge"],
  },
];
