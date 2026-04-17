export type QuoteTheme = "Leadership" | "Resilience" | "Product" | "Craft" | "Other";

export type Quote = {
  id: string;
  text: string;
  attribution: string;
  context?: string;
  theme: QuoteTheme;
};

export const quotes: Quote[] = [
  {
    id: "q1",
    text: "[TODO: quote 1 text]",
    attribution: "[TODO: attribution]",
    theme: "Leadership",
  },
  {
    id: "q2",
    text: "[TODO: quote 2 text]",
    attribution: "[TODO: attribution]",
    context: "[TODO: optional context]",
    theme: "Resilience",
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
