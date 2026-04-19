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
    text: "[TODO: quote 3 text]",
    attribution: "[TODO: attribution]",
    theme: "Product",
  },
  {
    id: "q4",
    text: "[TODO: quote 4 text]",
    attribution: "[TODO: attribution]",
    theme: "Craft",
  },
  {
    id: "q5",
    text: "[TODO: quote 5 text]",
    attribution: "[TODO: attribution]",
    theme: "Leadership",
  },
];
