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
    id: "project-1",
    title: "[TODO: project 1 title]",
    pitch: "[TODO: one-line pitch]",
    status: "live",
    tags: ["Product", "Design"],
    links: { demo: "#", github: "#" },
  },
];
