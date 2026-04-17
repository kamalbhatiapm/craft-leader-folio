export type Social = {
  email?: string;
  linkedin?: string;
  github?: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  cares: string[];
  socials: Social;
};

export const profile: Profile = {
  name: "Kamal Bhatia",
  role: "Principal Product Manager, Technical at T-Mobile · Greater Chicago Area",
  tagline:
    "AI Infrastructure & Automation Platforms Product Leader — DevSecOps, IaC, and execution governance at enterprise scale.",
  bio: [
    "I build the platforms that let other teams ship faster and safer. For 16+ years I've worked at the intersection of AI infrastructure, developer platforms, and automation — turning fragmented internal tooling into governed, reusable systems that scale across thousands of engineers.",
    "Today I lead product for AI infrastructure and automation at T-Mobile, where my focus is CI/CD, infrastructure-as-code, and execution governance. I care about the unglamorous parts of platform work: paved roads, sane defaults, and clear ownership — the things that compound into real velocity.",
    "[TODO: add a third paragraph in your own voice — what you're learning, what you're hiring for, or what kind of problems you want to work on next]",
  ],
  cares: [
    "AI Infrastructure",
    "Developer Platforms",
    "DevSecOps",
    "Infrastructure as Code",
    "Execution Governance",
    "Enterprise Scale",
  ],
  socials: {
    email: "[TODO: add email]",
    linkedin: "https://www.linkedin.com/in/kbhatiatech",
    github: "[TODO: add GitHub URL or remove]",
  },
};
