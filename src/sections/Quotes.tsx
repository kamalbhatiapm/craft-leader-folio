import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { quotes } from "@/content/quotes";
import { toast } from "@/hooks/use-toast";

export const Quotes = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string, attribution: string) => {
    const payload = `"${text}" — ${attribution}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedId(id);
      toast({ title: "Quote copied", description: "Pasted-ready on your clipboard." });
      window.setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1800);
    } catch {
      toast({ title: "Couldn't copy", description: "Clipboard access was blocked.", variant: "destructive" });
    }
  };

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
          {quotes.map((q) => {
            const copied = copiedId === q.id;
            return (
              <li key={q.id}>
                <figure className="relative flex h-full flex-col rounded-xl border border-border bg-card p-6 sm:p-8 shadow-soft">
                  <span className="absolute -top-4 left-6 font-serif text-6xl leading-none text-primary/40 select-none" aria-hidden>
                    “
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(q.id, q.text, q.attribution)}
                    aria-label={copied ? "Quote copied" : "Copy quote"}
                    title={copied ? "Copied" : "Copy quote"}
                    className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground opacity-0 transition-all hover:bg-secondary hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100 [li:hover_&]:opacity-100"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden />
                    )}
                  </button>
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
            );
          })}
        </ul>
      </div>
    </section>
  );
};
