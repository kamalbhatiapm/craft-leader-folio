import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<
    "loading" | "valid" | "already" | "invalid" | "success" | "error"
  >("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    fetch(
      `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
      { headers: { apikey: supabaseAnonKey } }
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke(
      "handle-email-unsubscribe",
      { body: { token } }
    );
    setSubmitting(false);
    if (error) {
      setStatus("error");
      return;
    }
    if (data?.success) setStatus("success");
    else if (data?.reason === "already_unsubscribed") setStatus("already");
    else setStatus("error");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full rounded-xl border border-border bg-card p-8 shadow-soft">
        <h1 className="font-serif text-2xl text-foreground">Unsubscribe</h1>

        {status === "loading" && (
          <p className="mt-4 text-sm text-muted-foreground">Checking your link…</p>
        )}

        {status === "valid" && (
          <>
            <p className="mt-3 text-sm text-muted-foreground">
              Click below to unsubscribe from emails from this site.
            </p>
            <button
              onClick={confirm}
              disabled={submitting}
              className="mt-5 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Unsubscribing…" : "Confirm unsubscribe"}
            </button>
          </>
        )}

        {status === "success" && (
          <p className="mt-4 text-sm text-foreground">
            You've been unsubscribed. You won't receive any more emails.
          </p>
        )}

        {status === "already" && (
          <p className="mt-4 text-sm text-foreground">
            You're already unsubscribed.
          </p>
        )}

        {status === "invalid" && (
          <p className="mt-4 text-sm text-muted-foreground">
            This unsubscribe link is invalid or has expired.
          </p>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-destructive">
            Something went wrong. Please try again later.
          </p>
        )}

        <Link
          to="/"
          className="mt-6 inline-block text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
};

export default Unsubscribe;
