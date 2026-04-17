type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export const SectionHeader = ({ eyebrow, title, description }: Props) => (
  <div className="mb-10 max-w-2xl">
    <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
      {eyebrow}
    </p>
    <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-base text-muted-foreground">{description}</p>
    )}
  </div>
);
