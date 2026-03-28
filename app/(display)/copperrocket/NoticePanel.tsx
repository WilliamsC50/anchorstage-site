"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

type NoticeSession = {
  display_notice: string | null;
  display_subnotice: string | null;
};

// ─── Configuration ────────────────────────────────────────────────────────────

const ACTIVE_SESSION_STATUSES = ["ACTIVE"];
const POLL_INTERVAL_MS = 30_000;

const DEFAULTS = {
  headline: "Signups open at 7:00 PM sharp",
  body: "See host to join the list.",
} as const;

// ─── Data fetch ───────────────────────────────────────────────────────────────

async function fetchNotice(): Promise<NoticeSession | null> {
  const db = getSupabaseClient();
  const { data, error } = await db
    .from("open_mic_session")
    .select("display_notice, display_subnotice")
    .eq("venue_slug", "copperrocket")
    .in("status", ACTIVE_SESSION_STATUSES)
    .order("session_date", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) return null;
  return data[0] as NoticeSession;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NoticePanel() {
  const [session, setSession] = useState<NoticeSession | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const result = await fetchNotice();
      if (mounted) setSession(result);
    }

    load();
    const poll = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      mounted = false;
      clearInterval(poll);
    };
  }, []);

  const headline =
    session?.display_notice?.trim() || DEFAULTS.headline;
  const body =
    session?.display_subnotice?.trim() || DEFAULTS.body;

  return (
    <div
      className="relative flex flex-col gap-4"
      style={{
        border: "1.5px solid rgba(255,122,26,0.45)",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.04)",
        padding: "1.75rem 2rem 2rem",
      }}
    >
      {/* LIVE NOTICE pill — top-right of container */}
      <span
        className="absolute uppercase font-semibold text-white"
        style={{
          top: -11,
          right: 12,
          fontSize: 9,
          letterSpacing: "0.3em",
          padding: "3px 10px",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.20)",
          backgroundColor: "rgba(5, 15, 28, 1)",
          opacity: 0.65,
        }}
      >
        Live Notice
      </span>

      <p
        className="font-semibold uppercase"
        style={{ fontSize: 12, letterSpacing: "0.45em", color: "var(--aso-orange)", opacity: 0.80 }}
      >
        Tonight
      </p>
      <p
        className="font-bold text-white"
        style={{ fontSize: "clamp(1.5rem, 2.3vw, 2.2rem)", letterSpacing: "0.01em", opacity: 0.80, lineHeight: 1.2 }}
      >
        {headline}
      </p>
      <p
        className="text-white"
        style={{ fontSize: "clamp(0.95rem, 1.35vw, 1.2rem)", letterSpacing: "0.03em", opacity: 0.40 }}
      >
        {body}
      </p>
    </div>
  );
}
