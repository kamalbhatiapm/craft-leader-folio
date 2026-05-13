import standoutBuildsMyAi2026 from "@/assets/awards/standout-builds-myaicommunity-2026.png";
import pitchDay2026 from "@/assets/awards/pitch-day-2026.jpg";
import agenticAiPm2026 from "@/assets/awards/agentic-ai-pm-2026.jpg";
import claudeCodeSkills2026 from "@/assets/awards/claude-code-skills-2026.jpg";
import spmc2023 from "@/assets/awards/spmc-2023.jpg";

export type Award = {
  id: string;
  title: string;
  issuer: string;
  year: number;
  description: string;
  url?: string;
  /** Optional image (e.g. certificate). Imported asset URL. */
  image?: string;
};

export const awards: Award[] = [
  {
    id: "pitch-day-2026",
    title: "Pitch Day — Most Comprehensive Project",
    issuer: "Agentic AI Product Management Certification",
    year: 2026,
    description:
      "Recognized for building a complete, end-to-end AI product with exceptional depth, clarity, and execution during the Agentic AI PM course.",
    image: pitchDay2026,
  },
  {
    id: "agentic-ai-pm-2026",
    title: "Agentic AI Product Management Certification",
    issuer: "Maven — taught by Mahesh Yadav",
    year: 2026,
    description:
      "Completed the Agentic AI Product Management Certification, covering the end-to-end product lifecycle for building and shipping agentic AI products.",
    image: agenticAiPm2026,
  },
  {
    id: "claude-code-skills-2026",
    title: "Build your own AI Agents & Crack AI PM Interviews",
    issuer: "Maven — taught by Mahesh Yadav",
    year: 2026,
    description:
      "Completed the Acing AI PM Interviews & Mastering Claude Code Skills program — building AI agents and preparing for AI product sense and execution interviews.",
    image: claudeCodeSkills2026,
  },
  {
    id: "spmc-2023",
    title: "Sr Product Manager Certification (SPMC)™",
    issuer: "Product School",
    year: 2023,
    description:
      "Demonstrated knowledge, skills, and competence in product management and earned the Sr Product Manager Certification from Product School.",
    image: spmc2023,
  },
];
