import { Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { profile } from "@/content/profile";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export const About = () => {
  const { name, role, tagline, bio, cares, socials, resumeUrl } = profile;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-hero scroll-mt-20 outline-none"
    >
      <div className="container py-16 sm:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              About
            </p>
            <h1
              id="about-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground"
            >
              {name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{role}</p>
            <p className="mt-6 text-xl sm:text-2xl text-foreground">{tagline}</p>

            <div className="mt-8 space-y-4 text-base text-muted-foreground leading-relaxed">
              {bio.filter(Boolean).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="What I care about">
              {cares.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={resumeUrl}
                {...ext}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 transition-opacity"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download Resume
              </a>

              <div className="flex items-center gap-1" aria-label="Contact">
                {socials.email && (
                  <a
                    href={`mailto:${socials.email}`}
                    aria-label="Email"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    {...ext}
                    aria-label="LinkedIn"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden />
                  </a>
                )}
                {socials.github && (
                  <a
                    href={socials.github}
                    {...ext}
                    aria-label="GitHub"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                  </a>
                )}
                {socials.x && (
                  <a
                    href={socials.x}
                    {...ext}
                    aria-label="X (Twitter)"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                  >
                    <Twitter className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Photo slot — gradient mesh fallback */}
          <div className="md:w-64 lg:w-72">
            <div
              role="img"
              aria-label="Profile photo placeholder"
              className="aspect-square w-full rounded-2xl bg-gradient-card shadow-soft border border-border/60 flex items-end p-4"
            >
              <span className="text-xs text-muted-foreground bg-background/70 backdrop-blur px-2 py-1 rounded">
                [TODO: add profile photo]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
