import { supabaseServer } from "@/lib/supabase/server";
import OpenMicWorkstationClient, { type SessionRow } from "./OpenMicWorkstationClient";

// Admin page makes a live DB call. Opt out of static prerendering.
export const dynamic = "force-dynamic";

// ─── Page ─────────────────────────────────────────────────────────────────────
//
// Fetches the current Copper Rocket session server-side so session_id is always
// present in the prop passed to the client.
//
// Priority:
//   1. Most recent ACTIVE session: show this if the event is live.
//   2. Most recent DRAFT session: allow admins to prepare notice text early.
//   3. null: client renders the empty state.

const SESSION_SELECT =
  "session_id, title, status, session_date, display_notice, display_subnotice";

async function loadSession(): Promise<SessionRow | null> {
  const db = supabaseServer();

  const { data: active } = await db
    .from("open_mic_session")
    .select(SESSION_SELECT)
    .eq("venue_slug", "copperrocket")
    .eq("status", "ACTIVE")
    .order("session_date", { ascending: false })
    .limit(1);

  if (active && active.length > 0) {
    return active[0] as SessionRow;
  }

  const { data: draft } = await db
    .from("open_mic_session")
    .select(SESSION_SELECT)
    .eq("venue_slug", "copperrocket")
    .eq("status", "DRAFT")
    .order("session_date", { ascending: false })
    .limit(1);

  return (draft?.[0] as SessionRow) ?? null;
}

export default async function CopperRocketAdminPage() {
  const session = await loadSession();
  return <OpenMicWorkstationClient session={session} />;
}
