"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

type OpenMicSession = {
  session_id: string;
  title: string;
  venue_slug: string;
  session_date: string;
  status: string;
};

type SignupStatus = "queued" | "on_stage" | "done" | "skipped";

type OpenMicSignup = {
  signup_id: string;
  session_id: string;
  display_name: string;
  sort_order: number;
  status: SignupStatus;
  song_title: string | null;
};

// ─── Configuration ────────────────────────────────────────────────────────────

// Statuses that mean a session is live tonight.
// Adjust once the actual DB values are confirmed.
const ACTIVE_SESSION_STATUSES = ["active", "open", "live"];

// Polling interval. Used as a continuous fallback even when realtime is active.
const POLL_INTERVAL_MS = 30_000;

// ─── Data fetch ───────────────────────────────────────────────────────────────

async function fetchData(): Promise<{
  session: OpenMicSession | null;
  signups: OpenMicSignup[];
}> {
  const db = getSupabaseClient();

  // Fetch the most recent active session for Copper Rocket.
  // If more than one session can be active at once, the most recent by
  // session_date wins.
  const { data: sessions, error: sessionError } = await db
    .from("open_mic_session")
    .select("session_id, title, venue_slug, session_date, status")
    .eq("venue_slug", "copperrocket")
    .in("status", ACTIVE_SESSION_STATUSES)
    .order("session_date", { ascending: false })
    .limit(1);

  if (sessionError || !sessions || sessions.length === 0) {
    return { session: null, signups: [] };
  }

  const session = sessions[0] as OpenMicSession;

  // Fetch signups for this session, excluding skipped.
  // Ordered by sort_order so sections derive correctly without extra sorting.
  const { data: signups, error: signupsError } = await db
    .from("open_mic_signup")
    .select("signup_id, session_id, display_name, sort_order, status, song_title")
    .eq("session_id", session.session_id)
    .in("status", ["queued", "on_stage", "done"])
    .order("sort_order", { ascending: true });

  if (signupsError) {
    return { session, signups: [] };
  }

  return { session, signups: (signups ?? []) as OpenMicSignup[] };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SignupDisplay() {
  const [session, setSession] = useState<OpenMicSession | null>(null);
  const [signups, setSignups] = useState<OpenMicSignup[]>([]);
  const [loading, setLoading] = useState(true);

  // Tracks which session_id the active realtime channel is scoped to.
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    const db = getSupabaseClient();
    let mounted = true;
    let channel: ReturnType<typeof db.channel> | null = null;

    async function load() {
      const { session, signups } = await fetchData();
      if (!mounted) return;

      setSession(session);
      setSignups(signups);
      setLoading(false);

      // Set up or swap the realtime channel if the active session changed.
      const newSessionId = session?.session_id ?? null;
      if (newSessionId !== sessionIdRef.current) {
        sessionIdRef.current = newSessionId;

        if (channel) {
          db.removeChannel(channel);
          channel = null;
        }

        if (newSessionId && mounted) {
          channel = db
            .channel(`cr_signups_${newSessionId}`)
            .on(
              "postgres_changes",
              {
                event: "*",
                schema: "public",
                table: "open_mic_signup",
                filter: `session_id=eq.${newSessionId}`,
              },
              // Re-fetch full state on any signup change rather than applying
              // partial updates — keeps display consistent.
              () => load()
            )
            .subscribe();
        }
      }
    }

    load();

    // Polling runs continuously as a fallback.
    // If realtime is working, polls are redundant but harmless on a low-traffic page.
    const poll = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      mounted = false;
      clearInterval(poll);
      if (channel) db.removeChannel(channel);
    };
  }, []);

  // ── Derive display sections ────────────────────────────────────────────────
  // signups arrive ordered by sort_order from the query.
  const nowPlaying = signups.find((s) => s.status === "on_stage") ?? null;
  const upNext = signups.filter((s) => s.status === "queued");
  const completed = signups.filter((s) => s.status === "done");

  // Slot numbers for Up Next: if someone is on stage they hold slot 1.
  const upNextStartSlot = nowPlaying ? 2 : 1;

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm tracking-widest uppercase text-white/20">
          Loading…
        </p>
      </div>
    );
  }

  // ── No active session ──────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-10 gap-3 text-center">
        <p className="text-2xl font-semibold text-white/40">No Active Session</p>
        <p className="text-sm text-white/20">Check back when the show starts</p>
      </div>
    );
  }

  // ── Active session with live data ──────────────────────────────────────────
  return (
    <div className="h-full overflow-y-auto scrollbar-hide px-10 py-8 flex flex-col gap-8">

      {/* NOW PLAYING ─────────────────────────────────────────────────────── */}
      <section>
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--aso-orange)" }}
        >
          Now Playing
        </p>
        {nowPlaying ? (
          <div>
            <p className="text-5xl font-bold text-white leading-tight tracking-tight">
              {nowPlaying.display_name}
            </p>
            {nowPlaying.song_title && (
              <p className="text-lg text-white/50 mt-2">{nowPlaying.song_title}</p>
            )}
          </div>
        ) : (
          <p className="text-3xl font-semibold text-white/40 italic">
            Signups Open
          </p>
        )}
      </section>

      <div className="border-t border-white/10" />

      {/* UP NEXT ─────────────────────────────────────────────────────────── */}
      <section>
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-5"
          style={{ color: "var(--aso-blue-light)" }}
        >
          Up Next
        </p>
        {upNext.length > 0 ? (
          <ol className="flex flex-col gap-4">
            {upNext.map((signup, i) => (
              <li key={signup.signup_id} className="flex items-baseline gap-5">
                <span
                  className="text-sm font-semibold tabular-nums w-5 text-right shrink-0 opacity-50"
                  style={{ color: "var(--aso-blue-light)" }}
                >
                  {i + upNextStartSlot}
                </span>
                <div>
                  <p className="text-2xl font-semibold text-white">
                    {signup.display_name}
                  </p>
                  {signup.song_title && (
                    <p className="text-sm text-white/40 mt-0.5">
                      {signup.song_title}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-base text-white/30 italic">No one queued yet</p>
        )}
      </section>

      {/* COMPLETED — only rendered when at least one signup is done ──────── */}
      {completed.length > 0 && (
        <>
          <div className="border-t border-white/10" />
          <section>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/30">
              Completed
            </p>
            <ul className="flex flex-col gap-2">
              {completed.map((signup) => (
                <li key={signup.signup_id} className="text-base text-white/30">
                  {signup.display_name}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

    </div>
  );
}
