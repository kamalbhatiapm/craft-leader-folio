import { SectionHeader } from "@/components/SectionHeader";
import { quotes } from "@/content/quotes";

export const Quotes = () => {

  return (
    <section
      id="quotes"
      aria-labelledby="quotes-heading"
      className="scroll-mt-20 bg-secondary/30 outline-none"
    >
      <div className="container py-16 sm:py-24">
        <SectionHeader
          eyebrow="Quotes"
          title="Words I keep close."
          description="Lines that ground me when I'm doubtful, stretched, or mid-build."
        />
        <h2 id="quotes-heading" className="sr-only">Quotes</h2>

        <ul className="grid gap-5 md:grid-cols-2">
          {quotes.map((q) => (
            <li key={q.id}>
              <figure className="relative flex h-full flex-col rounded-xl border border-border bg-card p-6 sm:p-8 shadow-soft">
                <span className="absolute -top-4 left-6 font-serif text-6xl leading-none text-primary/40 select-none" aria-hidden>
                  “
                </span>
                <blockquote className="font-serif text-xl sm:text-2xl leading-snug text-foreground">
                  {q.text}
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  — {q.attribution}
                  {q.theme && (
                    <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs">
                      {q.theme}
                    </span>
                  )}
                </figcaption>
                {q.context && (
                  <p className="mt-4 text-sm text-muted-foreground/90">{q.context}</p>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
