import { Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { companies } from "@/content/companies";
import profilePhoto from "@/assets/profile.jpeg";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export const About = () => {
  const { name, role, tagline, tags, tools, bio, cares, socials } = profile;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-hero scroll-mt-20 outline-none"
    >
      <div className="container py-16 sm:py-24">
        <div className="grid gap-10 md:gap-14 md:grid-cols-[minmax(0,1fr)_18rem] lg:grid-cols-[minmax(0,1fr)_20rem] md:items-start">
          <div className="min-w-0 max-w-2xl animate-fade-in-up">
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
            <p className="mt-6 text-xl sm:text-2xl text-foreground leading-snug">{tagline}</p>

            <div className="mt-8 space-y-5 text-base text-muted-foreground leading-relaxed">
              {bio.filter(Boolean).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ul className="mt-10 flex flex-wrap gap-2" aria-label="What I care about">
              {cares.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>

            {tags?.length ? (
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Skills
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Skills">
                  {tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {tools?.length ? (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Tools / Platforms
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Tools / Platforms">
                  {tools.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent dark:text-accent-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
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
              </div>
            </div>
          </div>

          {/* Profile photo */}
          <div className="md:sticky md:top-24 md:self-start">
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-card shadow-soft border border-border/60">
              <img
                src={profilePhoto}
                alt={`${name} portrait`}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Companies I've worked with */}
        <div className="mt-16 sm:mt-20">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Companies I've worked with
          </p>
          <ul className="flex flex-wrap items-center gap-4 sm:gap-5">
            {companies.map((c) => (
              <li
                key={c.name}
                className="group h-20 w-36 sm:w-40 [perspective:1000px] cursor-default"
                aria-label={c.name}
              >
                <div className="relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front: logo */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-soft border border-border/40 [backface-visibility:hidden]">
                    <img
                      src={c.logo}
                      alt={`${c.name} logo`}
                      loading="lazy"
                      className="max-h-12 max-w-[80%] object-contain"
                    />
                  </div>
                  {/* Back: name */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary px-3 py-2 shadow-soft border border-primary/40 text-primary-foreground text-sm font-semibold text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    {c.name}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
