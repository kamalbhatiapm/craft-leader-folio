export type QuoteTheme = "Leadership" | "Resilience" | "Product" | "Craft" | "AI Risk" | "Other";

export type Quote = {
  id: string;
  text: string;
  attribution: string;
  context?: string;
  theme?: QuoteTheme;
};

export const quotes: Quote[] = [
  {
    id: "q1",
    text: "If we realize the divinity that enlivens all life forms on our planet, we will spread peace and love wherever we go.",
    attribution: "Rajinder Singh",
    context: "Inner and Outer Peace through Meditation",
  },
  {
    id: "q2",
    text: "It's perfectly fine to start with a learning goal and work your way toward a S.M.A.R.T. performance goal.",
    attribution: "Teresa Torres",
    context: "Continuous Discovery Habits: Discover Products that Create Customer Value and Business Value",
    theme: "Product",
  },
  {
    id: "q3",
    text: "When we manage by outcomes, we give our teams the autonomy, responsibility, and ownership to chart their own path.",
    attribution: "Teresa Torres",
    context: "Continuous Discovery Habits: Discover Products that Create Customer Value and Business Value",
    theme: "Leadership",
  },
  {
    id: "q5",
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    attribution: "Steve Jobs",
    theme: "Craft",
  },
  {
    id: "q6",
    text: "Your mindset is everything. Whether you think you can or think you can't, you're right.",
    attribution: "Henry Ford",
    theme: "Resilience",
  },
  {
    id: "q7",
    text: "When they go low, we go high.",
    attribution: "Michelle Obama",
    theme: "Leadership",
  },
  {
    id: "q8",
    text: "Even if it takes longer, do it yourself. There is a different kind of confidence that comes from knowing you built it with your own hands.",
    attribution: "Alex Hormozi",
    theme: "Craft",
  },
];
