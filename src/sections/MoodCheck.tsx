import { useEffect, useState } from "react";
import { z } from "zod";
import { Slider } from "@/components/ui/slider";
import { SectionHeader } from "@/components/SectionHeader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const MOODS = [
  { value: 1, emoji: "😞", label: "Rough" },
  { value: 2, emoji: "😕", label: "Meh" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😄", label: "Great" },
];

const schema = z.object({
  mood: z.number().int().min(1).max(5),
  note: z.string().trim().max(500).optional(),
});

const STORAGE_KEY = "mood-check-submitted";

export const MoodCheck = () => {
  const [mood, setMood] = useState(3);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [summary, setSummary] = useState<Record<number, number>>({});

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
      setSubmitted(true);
    }
    loadSummary();
  }, []);

  const loadSummary = async () => {
    const { data } = await supabase.rpc("mood_summary");
    if (data) {
      const map: Record<number, number> = {};
      (data as Array<{ mood: number; count: number }>).forEach((r) => {
        map[r.mood] = Number(r.count);
      });
      setSummary(map);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ mood, note: note || undefined });
    if (!parsed.success) {
      toast({ title: "Check your input", description: "Note must be under 500 characters.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const id = crypto.randomUUID();
    const sessionId = typeof window !== "undefined" ? localStorage.getItem("session_id") : null;
    const { error } = await supabase.from("mood_checks").insert({
      id,
      mood: parsed.data.mood,
      note: parsed.data.note ?? null,
      session_id: sessionId,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Couldn't submit", description: error.message, variant: "destructive" });
      return;
    }
    const moodMeta = MOODS.find((m) => m.value === parsed.data.mood)!;
    const templateData = {
      mood: parsed.data.mood,
      moodLabel: moodMeta.label,
      moodEmoji: moodMeta.emoji,
      note: parsed.data.note ?? null,
      sessionId: sessionId ?? null,
      submittedAt: new Date().toISOString(),
    };
    const recipients = ["kbhatia.tech@gmail.com", "info@calmfalcon.ai"];
    recipients.forEach((recipientEmail) => {
      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "mood-check-notification",
            recipientEmail,
            idempotencyKey: `mood-check-${id}-${recipientEmail}`,
            templateData,
          },
        })
        .catch((err) => console.error("Email notification failed", recipientEmail, err));
    });
    localStorage.setItem(STORAGE_KEY, "1");
    setSubmitted(true);
    toast({ title: "Thanks for sharing", description: "Your mood has been recorded." });
    loadSummary();
  };

  const total = Object.values(summary).reduce((a, b) => a + b, 0);
  const current = MOODS.find((m) => m.value === mood)!;

  return (
    <section
      id="mood"
      aria-labelledby="mood-heading"
      className="scroll-mt-20 outline-none"
    >
      <div className="container py-16 sm:py-24">
        <SectionHeader
          eyebrow="Mood Check"
          title="How are you feeling today?"
          description="A quick pulse — slide where you're at, leave a note if you'd like."
        />
        <h2 id="mood-heading" className="sr-only">Mood check</h2>

        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            {submitted ? (
              <div className="rounded-xl border border-border bg-card p-8 shadow-soft">
                <p className="font-serif text-2xl text-foreground">Thanks for checking in.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your mood is recorded. Come back tomorrow.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-soft"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl" aria-hidden>{current.emoji}</span>
                    <span className="font-serif text-xl text-foreground">{current.label}</span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {mood} / 5
                  </span>
                </div>

                <Slider
                  value={[mood]}
                  onValueChange={(v) => setMood(v[0] ?? 3)}
                  min={1}
                  max={5}
                  step={1}
                  aria-label="Mood"
                />
                <div className="mt-2 flex justify-between text-lg" aria-hidden>
                  {MOODS.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setMood(m.value)}
                      className={`transition-opacity ${mood === m.value ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                      aria-label={m.label}
                    >
                      {m.emoji}
                    </button>
                  ))}
                </div>

                <label className="mt-6 block">
                  <span className="text-sm font-medium text-foreground">Anonymous note</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, 500))}
                    placeholder="What's on your mind? (optional)"
                    rows={3}
                    className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <span className="mt-1 block text-right text-xs text-muted-foreground">
                    {note.length}/500
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? "Submitting…" : "Share mood"}
                </button>
              </form>
            )}
          </div>

          <aside className="md:col-span-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Visitor pulse
              </p>
              <p className="mt-1 font-serif text-lg text-foreground">
                {total === 0 ? "Be the first to check in." : `${total} check-in${total === 1 ? "" : "s"}`}
              </p>

              <ul className="mt-5 space-y-3">
                {MOODS.map((m) => {
                  const count = summary[m.value] ?? 0;
                  const pct = total === 0 ? 0 : Math.round((count / total) * 100);
                  return (
                    <li key={m.value} className="flex items-center gap-3">
                      <span className="w-6 text-lg" aria-hidden>{m.emoji}</span>
                      <div className="flex-1">
                        <div className="h-2 overflow-hidden rounded-full bg-background">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                        {pct}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
