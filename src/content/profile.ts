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
  name: "[TODO: add name]",
  role: "[TODO: add current role]",
  tagline: "[TODO: add one-line tagline]",
  bio: [
    "[TODO: add bio paragraph 1]",
    "[TODO: add bio paragraph 2]",
    "[TODO: add bio paragraph 3 — optional]",
  ],
  cares: [
    "Product Design",
    "PMF",
    "GTM",
    "Scalability",
    "Security",
    "Craft",
  ],
  socials: {
    email: "[TODO: add email]",
    linkedin: "[TODO: add LinkedIn URL]",
    github: "[TODO: add GitHub URL]",
  },
  resumeUrl: "/resume.pdf",
};
