import { ExternalLink, Trophy } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { awards } from "@/content/awards";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export const Awards = () => (
  <section
    id="awards"
    aria-labelledby="awards-heading"
    className="scroll-mt-20 outline-none"
  >
    <div className="container py-16 sm:py-24">
      <SectionHeader
        eyebrow="Awards & Certifications"
        title="Recognition & credentials"
      />
      <h2 id="awards-heading" className="sr-only">Awards & Certifications</h2>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((a) => (
          <li key={a.id}>
            <article className="group h-full flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-soft overflow-hidden transition-colors hover:border-primary/40">
              <div className="aspect-[16/10] bg-gradient-card relative flex items-center justify-center">
                <Trophy className="h-12 w-12 text-primary/60" aria-hidden />
                <span className="absolute top-3 right-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                  {a.year}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold tracking-tight">{a.title}</h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{a.issuer}</p>
                <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>

                {a.url && (
                  <div className="mt-5 flex items-center gap-2 pt-4 border-t border-border">
                    <a
                      href={a.url}
                      {...ext}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden /> Learn more
                    </a>
                  </div>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
