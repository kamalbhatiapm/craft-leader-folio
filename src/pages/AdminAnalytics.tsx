import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Visit = {
  id: string;
  session_id: string | null;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  duration_seconds: number | null;
  created_at: string;
};

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    document.title = "Admin · Analytics";
    let cancelled = false;

    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      // Try to read visits — RLS will reject non-admins.
      const { data, error } = await supabase
        .from("visits")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (cancelled) return;
      if (error) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
        setVisits((data || []) as Visit[]);
      }
      setLoading(false);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const stats = useMemo(() => {
    const sessions = new Set(visits.map((v) => v.session_id || v.id));
    const countries: Record<string, number> = {};
    const cities: Record<string, number> = {};
    const refs: Record<string, number> = {};
    const devices: Record<string, number> = {};
    visits.forEach((v) => {
      if (v.country) countries[v.country] = (countries[v.country] || 0) + 1;
      const city = [v.city, v.country].filter(Boolean).join(", ");
      if (city) cities[city] = (cities[city] || 0) + 1;
      const ref = v.referrer ? new URL(v.referrer, "https://x").hostname : "Direct";
      refs[ref] = (refs[ref] || 0) + 1;
      const d = v.device || "unknown";
      devices[d] = (devices[d] || 0) + 1;
    });
    const top = (o: Record<string, number>) =>
      Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 8);
    return {
      total: visits.length,
      uniqueSessions: sessions.size,
      countries: top(countries),
      cities: top(cities),
      refs: top(refs),
      devices: top(devices),
    };
  }, [visits]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (loading) {
    return <main className="min-h-screen grid place-items-center">Loading…</main>;
  }
  if (!authorized) {
    return (
      <main className="min-h-screen grid place-items-center p-6">
        <Card className="p-6 max-w-md text-center space-y-3">
          <h1 className="text-xl font-semibold">Not authorized</h1>
          <p className="text-sm text-muted-foreground">
            Your account doesn't have the admin role. Add a row to <code>user_roles</code> with your
            user id and role <code>admin</code>.
          </p>
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Visitor Analytics</h1>
          <p className="text-sm text-muted-foreground">
            {stats.total} pageviews · {stats.uniqueSessions} unique sessions (latest 500)
          </p>
        </div>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Top countries", data: stats.countries },
          { title: "Top cities", data: stats.cities },
          { title: "Top referrers", data: stats.refs },
          { title: "Devices", data: stats.devices },
        ].map((b) => (
          <Card key={b.title} className="p-4">
            <h2 className="text-sm font-medium mb-3">{b.title}</h2>
            <ul className="space-y-1.5 text-sm">
              {b.data.length === 0 && <li className="text-muted-foreground">—</li>}
              {b.data.map(([k, v]) => (
                <li key={k} className="flex justify-between gap-2">
                  <span className="truncate">{k}</span>
                  <span className="text-muted-foreground">{v}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Page</TableHead>
              <TableHead>Referrer</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Browser / OS</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visits.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="whitespace-nowrap text-xs">
                  {new Date(v.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="text-xs">
                  {[v.city, v.region, v.country].filter(Boolean).join(", ") || "—"}
                </TableCell>
                <TableCell className="text-xs font-mono">{v.ip || "—"}</TableCell>
                <TableCell className="text-xs">{v.path}</TableCell>
                <TableCell className="text-xs max-w-[200px] truncate">
                  {v.referrer || <Badge variant="secondary">Direct</Badge>}
                </TableCell>
                <TableCell className="text-xs">{v.device || "—"}</TableCell>
                <TableCell className="text-xs">
                  {[v.browser, v.os].filter(Boolean).join(" / ") || "—"}
                </TableCell>
                <TableCell className="text-xs text-right">
                  {v.duration_seconds != null ? `${v.duration_seconds}s` : "—"}
                </TableCell>
              </TableRow>
            ))}
            {visits.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No visits yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}
