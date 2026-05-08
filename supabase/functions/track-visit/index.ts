import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function parseUA(ua: string) {
  const u = ua || "";
  let device = "desktop";
  if (/mobile/i.test(u)) device = "mobile";
  else if (/tablet|ipad/i.test(u)) device = "tablet";
  let browser = "Unknown";
  if (/edg/i.test(u)) browser = "Edge";
  else if (/chrome/i.test(u)) browser = "Chrome";
  else if (/safari/i.test(u)) browser = "Safari";
  else if (/firefox/i.test(u)) browser = "Firefox";
  let os = "Unknown";
  if (/windows/i.test(u)) os = "Windows";
  else if (/mac os|macintosh/i.test(u)) os = "macOS";
  else if (/android/i.test(u)) os = "Android";
  else if (/iphone|ipad|ios/i.test(u)) os = "iOS";
  else if (/linux/i.test(u)) os = "Linux";
  return { device, browser, os };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body = await req.json();
    const { path, referrer, session_id, duration_seconds } = body || {};
    if (!path || typeof path !== "string") {
      return new Response(JSON.stringify({ error: "path required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ua = req.headers.get("user-agent") || "";
    const { device, browser, os } = parseUA(ua);
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      "";

    let geo: any = {};
    if (ip) {
      try {
        const r = await fetch(`https://ipapi.co/${ip}/json/`);
        if (r.ok) geo = await r.json();
      } catch (_) { /* ignore */ }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("visits").insert({
      session_id: session_id || null,
      path,
      referrer: referrer || null,
      user_agent: ua,
      device, browser, os,
      ip,
      country: geo.country_name || geo.country || null,
      region: geo.region || null,
      city: geo.city || null,
      latitude: geo.latitude ?? null,
      longitude: geo.longitude ?? null,
      duration_seconds: typeof duration_seconds === "number" ? Math.round(duration_seconds) : null,
    });
    if (error) throw error;

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
