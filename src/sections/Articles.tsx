import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { articles, type Article } from "@/content/articles";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function parseISODate(iso: string): Date | null {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  // Construct as local date to avoid UTC->local off-by-one shifts.
  return new Date(+m[1], +m[2] - 1, +m[3]);
}

function formatDate(iso: string) {
  const d = parseISODate(iso);
  if (!d) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function groupBySource(items: Article[]) {
  const map = new Map<string, Article[]>();
  for (const a of items) {
    const list = map.get(a.source) ?? [];
    list.push(a);
    map.set(a.source, list);
  }
  // Sort each list by date desc
  for (const [, list] of map) {
    list.sort(
      (a, b) =>
        (parseISODate(b.publishedAt)?.getTime() ?? 0) -
        (parseISODate(a.publishedAt)?.getTime() ?? 0),
    );
  }
  return Array.from(map.entries());
}

export const Articles = () => {
  const grouped = groupBySource(articles);

  return (
    <section
      id="articles"
      aria-labelledby="articles-heading"
      className="scroll-mt-20 bg-secondary/30 outline-none"
    >
      <div className="container py-16 sm:py-24">
        <SectionHeader eyebrow="Writing" title="Articles & essays" />
        <h2 id="articles-heading" className="sr-only">Articles</h2>

        <div className="space-y-12">
          {grouped.map(([source, list]) => (
            <div key={source}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {source}
              </h3>
              <ul className="divide-y divide-border rounded-xl border border-border bg-card">
                {list.map((a) => (
                  <li key={a.id}>
                    <a
                      href={a.url}
                      {...ext}
                      className="group flex flex-col gap-2 p-5 transition-colors hover:bg-secondary/60 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="rounded-full border border-border bg-background px-2 py-0.5">
                            {a.source}
                          </span>
                          <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
                          <span aria-hidden>·</span>
                          <span>{a.readTimeMin} min read</span>
                        </div>
                        <h4 className="mt-2 text-lg font-medium tracking-tight text-foreground group-hover:text-primary">
                          {a.title}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {a.excerpt}
                        </p>
                      </div>
                      <ExternalLink
                        className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
