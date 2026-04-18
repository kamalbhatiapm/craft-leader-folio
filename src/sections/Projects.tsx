import { ExternalLink, Github, FileText, Presentation, FolderOpen } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { projects, type ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/utils";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const statusStyles: Record<ProjectStatus, string> = {
  live: "bg-primary/15 text-primary border-primary/30",
  building: "bg-secondary text-secondary-foreground border-border",
  concept: "bg-muted text-muted-foreground border-border",
};

const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  building: "Building",
  concept: "Concept",
};

export const Projects = () => (
  <section
    id="projects"
    aria-labelledby="projects-heading"
    className="scroll-mt-20 outline-none"
  >
    <div className="container py-16 sm:py-24">
      <SectionHeader
        eyebrow="AI Projects"
        title="Things I've shipped & built"
      />
      <h2 id="projects-heading" className="sr-only">AI Projects</h2>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.id}>
            <article className="group h-full flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-soft overflow-hidden transition-colors hover:border-primary/40">
              <div
                className="aspect-[16/10] bg-gradient-card relative overflow-hidden"
                aria-hidden={!p.cover && !p.previewUrl}
              >
                {p.previewUrl ? (
                  <div className="absolute inset-0 pointer-events-none">
                    <iframe
                      src={p.previewUrl}
                      title={`${p.title} live preview`}
                      loading="lazy"
                      tabIndex={-1}
                      aria-hidden
                      sandbox="allow-scripts allow-same-origin"
                      className="origin-top-left"
                      style={{
                        width: "200%",
                        height: "200%",
                        transform: "scale(0.5)",
                        border: "0",
                      }}
                    />
                  </div>
                ) : p.cover ? (
                  <img
                    src={p.cover}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : null}
                {p.previewUrl && (
                  <a
                    href={p.previewUrl}
                    {...ext}
                    aria-label={`Open ${p.title} live demo in new tab`}
                    className="absolute inset-0 z-10"
                  />
                )}
                <span
                  className={cn(
                    "absolute top-3 right-3 z-20 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium backdrop-blur-sm",
                    statusStyles[p.status],
                  )}
                >
                  {statusLabel[p.status]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.pitch}</p>

                {p.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex items-center gap-2 pt-4 border-t border-border">
                  {p.links.demo && (
                    <a
                      href={p.links.demo}
                      {...ext}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden /> Demo
                    </a>
                  )}
                  {p.links.github && (
                    <a
                      href={p.links.github}
                      {...ext}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden /> GitHub
                    </a>
                  )}
                  {p.links.caseStudy && (
                    <a
                      href={p.links.caseStudy}
                      {...ext}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <FileText className="h-3.5 w-3.5" aria-hidden /> Case study
                    </a>
                  )}
                  {p.links.pitchDeck && (
                    <a
                      href={p.links.pitchDeck}
                      {...ext}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <Presentation className="h-3.5 w-3.5" aria-hidden /> Pitch deck
                    </a>
                  )}
                  {p.links.artifacts && (
                    <a
                      href={p.links.artifacts}
                      {...ext}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <FolderOpen className="h-3.5 w-3.5" aria-hidden /> Artifacts
                    </a>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
