export type QuoteTheme = "Leadership" | "Resilience" | "Product" | "Craft" | "Other";

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
  },
  {
    id: "q3",
    text: "When we manage by outcomes, we give our teams the autonomy, responsibility, and ownership to chart their own path.",
    attribution: "Teresa Torres",
    context: "Continuous Discovery Habits: Discover Products that Create Customer Value and Business Value",
  },
  {
    id: "q4",
    text: "Any product that needs a manual to work is broken.",
    attribution: "Elon Musk",
  },
  {
    id: "q5",
    text: "[TODO: quote 5 text]",
    attribution: "[TODO: attribution]",
    theme: "Leadership",
  },
];
