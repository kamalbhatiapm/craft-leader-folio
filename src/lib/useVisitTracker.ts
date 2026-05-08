import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SESSION_KEY = "vt_session";
const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visit`;

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function send(path: string, durationSeconds?: number) {
  const payload = JSON.stringify({
    path,
    referrer: document.referrer || null,
    session_id: getSessionId(),
    duration_seconds: durationSeconds,
  });
  try {
    if (navigator.sendBeacon && durationSeconds !== undefined) {
      navigator.sendBeacon(FN_URL, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(FN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch (_) { /* ignore */ }
}

export function useVisitTracker() {
  const { pathname } = useLocation();
  const enteredAt = useRef<number>(Date.now());
  const lastPath = useRef<string>("");

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    enteredAt.current = Date.now();
    send(pathname);
  }, [pathname]);

  useEffect(() => {
    const onHide = () => {
      const dur = (Date.now() - enteredAt.current) / 1000;
      send(pathname, dur);
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, [pathname]);
}
