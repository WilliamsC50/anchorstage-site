"use server";

import { supabaseServer } from "@/lib/supabase/server";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionResult = { ok: true } | { ok: false; error: string };

// ─── updateDisplayNotice ──────────────────────────────────────────────────────
//
// Writes display_notice and display_subnotice to open_mic_session.
// Returns { ok: false, error } instead of throwing so the client can surface
// the message without crashing.

export async function updateDisplayNotice(
  sessionId: string,
  displayNotice: string,
  displaySubnotice: string
): Promise<ActionResult> {
  // Guard: must have a real session_id before touching the DB.
  if (!sessionId?.trim()) {
    return { ok: false, error: "Session ID is required" };
  }

  // Normalise: trim whitespace, convert empty strings to null.
  const notice = displayNotice.trim() || null;
  const subnotice = displaySubnotice.trim() || null;

  try {
    const db = supabaseServer();

    const { error } = await db
      .from("open_mic_session")
      .update({
        display_notice: notice,
        display_subnotice: subnotice,
      })
      .eq("session_id", sessionId);

    if (error) {
      console.error("[updateDisplayNotice] Supabase error:", error.message);
      return { ok: false, error: "Database error. Please try again." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[updateDisplayNotice] Unexpected error:", err);
    return { ok: false, error: "Unexpected error. Please try again." };
  }
}
