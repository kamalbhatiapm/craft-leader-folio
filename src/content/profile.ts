export type Social = {
  email?: string;
  linkedin?: string;
  github?: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  tags: string[];
  tools: string[];
  bio: string[];
  cares: string[];
  socials: Social;
};

export const profile: Profile = {
  name: "Kamal Bhatia",
  role: "AI Builder • Creative Thinker • Mom • Founder",
  tagline:
    "AI Infrastructure & Automation Platforms Product Leader — DevSecOps, IaC, and execution governance at enterprise scale.",
  tags: [
    "Agentic AI",
    "Agentic RAG",
    "RAG",
    "Knowledge Graphs",
    "Evals",
    "React",
    "DevSecOps",
    "Infrastructure as Code",
    "AI Product Sense",
    "Developer Empathy",
  ],
  tools: [
    "Claude Code",
    "n8n",
    "Supabase",
    "V0",
    "Lovable",
    "Google AI Studio",
    "Gitlab Runners",
    "TFE + Agent Pools",
    "Neo4j",
    "Grafana",
  ],
  bio: [
    "I'm a product leader with 6+ years in product management and 17+ years across platform engineering, enterprise software, and UX. Across that journey, I've led and scaled products that delivered $350M+ in revenue uplift, supported 90K+ users, and drove 20%+ productivity gains across enterprise environments.",
    "Earlier in my career, I worked on global enterprise products including AppleCare for Enterprise, Apple CRM, employee security systems, and sales enablement tools. That experience shaped how I think about product: start with the user workflow, understand the operational constraints, and build systems that create measurable business value.",
    "Over time, I grew into broader product leadership roles where I was responsible not just for features, but for driving direction across complex systems with multiple stakeholders and dependencies. I've led work across enterprise applications, automation, and platform experiences, often in ambiguous environments where success depended on aligning engineering, UX, business, and operational teams around a common strategy.",
    "In my current role, I lead Automation Platforms in a hybrid cloud environment, including CI/CD execution platform, Terraform Enterprise agent pools, and dependency resource graph systems. My focus is on execution reliability, change safety, governance, and scalability — essentially turning complex infrastructure capabilities into products that teams can adopt and trust.",
    "More recently, I've been extending that work into AI-native product development, especially in areas like agentic systems, retrieval architectures, and evaluation frameworks, where reliability and product rigor matter as much as innovation.",
    "Outside of work, I enjoy music, traveling, and mentoring, which help me stay grounded and bring fresh perspective to how I think about people, products, and impact.",
  ],
  cares: [
    "AI Infrastructure",
    "Developer Platforms",
    "Execution Governance",
    "Enterprise Scale",
    "Hybrid Cloud",
    "Platform Strategy",
  ],
  socials: {
    email: "kamal.bhatia.pm@gmail.com",
    linkedin: "https://www.linkedin.com/in/kbhatiatech",
    github: "https://github.com/kamalbhatiapm",
  },
};
