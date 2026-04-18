export type ProjectStatus = "live" | "building" | "concept";

export type Project = {
  id: string;
  title: string;
  pitch: string;
  status: ProjectStatus;
  tags: string[];
  cover?: string;
  links: { demo?: string; github?: string; caseStudy?: string };
  caseStudy?: {
    problem: string;
    insight: string;
    solution: string;
    impact: string;
    learnings: string;
  };
};

export const projects: Project[] = [
  {
    id: "calm-falcon",
    title: "Calm Falcon — AI Signals Intelligence",
    pitch:
      "Decision-grade AI ecosystem intelligence for Platform PMs and Engineering Managers — multi-agent pipeline turns GitHub, arXiv, and vendor noise into verified weekly briefs.",
    status: "live",
    tags: ["AI", "Platform", "Multi-Agent", "Intelligence"],
    links: { demo: "https://v0-cf-app-rho.vercel.app/" },
  },
];
