"use client";

import { useState } from "react";
import { updateDisplayNotice } from "./actions";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SessionRow = {
  session_id: string;
  title: string;
  status: string;
  session_date: string;
  display_notice: string | null;
  display_subnotice: string | null;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function OpenMicWorkstationClient({
  session,
}: {
  session: SessionRow | null;
}) {
  const [notice, setNotice] = useState(session?.display_notice ?? "");
  const [subnotice, setSubnotice] = useState(session?.display_subnotice ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  async function handleSave() {
    // Client-side guard: do not call the action when no session is loaded.
    if (!session?.session_id) {
      setMessage({ ok: false, text: "No session loaded. Cannot save." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const result = await updateDisplayNotice(
        session.session_id,
        notice,
        subnotice
      );
      setMessage(
        result.ok
          ? { ok: true, text: "Saved." }
          : { ok: false, text: result.error ?? "Save failed." }
      );
    } catch {
      // Should not reach here because the action never throws, but guard anyway.
      setMessage({ ok: false, text: "Unexpected error. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  // ── No session ─────────────────────────────────────────────────────────────
  if (!session) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>Copper Rocket: Open Mic Admin</h1>
        <p style={{ color: "#888" }}>
          No active or draft session found for Copper Rocket.
        </p>
      </main>
    );
  }

  // ── Session loaded ─────────────────────────────────────────────────────────
  return (
    <main style={{ padding: "2rem", maxWidth: 600 }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Copper Rocket: Open Mic Admin</h1>
      <p style={{ marginBottom: "1.5rem", color: "#666", fontSize: "0.9rem" }}>
        {session.title}, <strong>{session.status}</strong>,{" "}
        {session.session_date}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label
            htmlFor="display-notice"
            style={{ display: "block", marginBottom: 4, fontWeight: 600 }}
          >
            Live Notice
          </label>
          <input
            id="display-notice"
            type="text"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
          />
        </div>

        <div>
          <label
            htmlFor="display-subnotice"
            style={{ display: "block", marginBottom: 4, fontWeight: 600 }}
          >
            Sub-notice
          </label>
          <input
            id="display-subnotice"
            type="text"
            value={subnotice}
            onChange={(e) => setSubnotice(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
          />
        </div>

        <div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "0.6rem 1.5rem",
              fontSize: "1rem",
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving…" : "Save Notice"}
          </button>
        </div>

        {message && (
          <p
            style={{ color: message.ok ? "green" : "#c00", margin: 0 }}
            role="status"
          >
            {message.text}
          </p>
        )}
      </div>
    </main>
  );
}
