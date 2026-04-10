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
  headline: "Sign ups start at 7:00 PM",
  body: 'See host at the "Tech Table" for more details.',
} as const;

// ─── Data fetch ───────────────────────────────────────────────────────────────

async function fetchNotice(screenSlug: string): Promise<NoticeSession | null> {
  const db = getSupabaseClient();
  const { data, error } = await db
    .from("open_mic_session")
    .select("display_notice, display_subnotice")
    .eq("venue_slug", screenSlug)
    .in("status", ACTIVE_SESSION_STATUSES)
    .order("session_date", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) return null;
  return data[0] as NoticeSession;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NoticePanel({ screenSlug = "copperrocket" }: { screenSlug?: string }) {
  const [session, setSession] = useState<NoticeSession | null>(null);

  useEffect(() => {
    const db = getSupabaseClient();
    let mounted = true;

    async function load() {
      const result = await fetchNotice(screenSlug);
      if (mounted) setSession(result);
    }

    load();
    const poll = setInterval(load, POLL_INTERVAL_MS);

    // Realtime: re-fetch whenever the venue's session row changes.
    // Catches display_notice / display_subnotice edits and status transitions
    // (e.g. ACTIVE → DRAFT) without waiting for the next poll cycle.
    const channel = db
      .channel(`${screenSlug}_session_notice`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "open_mic_session",
          filter: `venue_slug=eq.${screenSlug}`,
        },
        () => load()
      )
      .subscribe();

    return () => {
      mounted = false;
      clearInterval(poll);
      db.removeChannel(channel);
    };
  }, [screenSlug]);

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
        padding: "28px 32px 32px",
      }}
    >
      {/* LIVE NOTICE pill — top-right of container */}
      <span
        className="absolute uppercase font-semibold"
        style={{
          top: -11,
          right: 12,
          fontSize: 9,
          letterSpacing: "0.3em",
          padding: "3px 10px",
          borderRadius: 20,
          border: "1.5px solid #cc0000",
          backgroundColor: "#000000",
          color: "#cc0000",
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
        style={{ fontSize: 34, letterSpacing: "0.01em", opacity: 0.80, lineHeight: 1.2 }}
      >
        {headline}
      </p>
      <p
        className="text-white"
        style={{ fontSize: 18, letterSpacing: "0.03em", opacity: 0.40 }}
      >
        {body}
      </p>
    </div>
  );
}
