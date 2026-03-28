"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

type CarouselSession = {
  display_carousel_enabled: boolean | null;
};

// ─── Configuration ────────────────────────────────────────────────────────────

const ACTIVE_SESSION_STATUSES = ["ACTIVE"];
const POLL_INTERVAL_MS = 30_000;
const SLIDE_INTERVAL_MS = 7_000;
const FADE_DURATION_MS = 350;

const SLIDES = [
  {
    label: "Bar Specials",
    heading: "Tonight's Bar Specials",
    body: "Ask your bartender for tonight's featured drinks and deals.",
  },
  {
    label: "PA Rentals",
    heading: "Need a PA System?",
    body: "Small PA rentals available through ASO & CFAV — ask at the Tech Table.",
  },
  {
    label: "Event Photos",
    heading: "Event Photography",
    body: "Professional event photos from past shows — check our social pages.",
  },
  {
    label: "Open Mic Gallery",
    heading: "Open Mic Gallery",
    body: "Photos from past open mic nights — follow us to see yours.",
  },
] as const;

// ─── Data fetch ───────────────────────────────────────────────────────────────

async function fetchCarouselEnabled(): Promise<boolean> {
  const db = getSupabaseClient();
  const { data, error } = await db
    .from("open_mic_session")
    .select("display_carousel_enabled")
    .eq("venue_slug", "copperrocket")
    .in("status", ACTIVE_SESSION_STATUSES)
    .order("session_date", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) return false;
  return !!(data[0] as CarouselSession).display_carousel_enabled;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CarouselPanel() {
  const [enabled, setEnabled] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [fading, setFading] = useState(false);

  // ── Session subscription: enables/disables carousel in real time ───────────
  useEffect(() => {
    const db = getSupabaseClient();
    let mounted = true;

    async function load() {
      const result = await fetchCarouselEnabled();
      if (mounted) setEnabled(result);
    }

    load();
    const poll = setInterval(load, POLL_INTERVAL_MS);

    const channel = db
      .channel("cr_session_carousel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "open_mic_session",
          filter: "venue_slug=eq.copperrocket",
        },
        () => load()
      )
      .subscribe();

    return () => {
      mounted = false;
      clearInterval(poll);
      db.removeChannel(channel);
    };
  }, []);

  // ── Auto-advance slides with fade ──────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSlideIndex((i) => (i + 1) % SLIDES.length);
        setFading(false);
      }, FADE_DURATION_MS);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [enabled]);

  if (!enabled) return null;

  const slide = SLIDES[slideIndex];

  return (
    <div
      className="w-full"
      style={{
        border: "1.5px solid rgba(255,122,26,0.28)",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.03)",
        padding: "1.4rem 1.75rem 1.25rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Slide label pill — top-right */}
      <span
        className="absolute uppercase font-semibold"
        style={{
          top: -11,
          right: 12,
          fontSize: 9,
          letterSpacing: "0.3em",
          padding: "3px 10px",
          borderRadius: 20,
          border: "1.5px solid rgba(255,122,26,0.40)",
          backgroundColor: "#000000",
          color: "rgba(255,122,26,0.75)",
        }}
      >
        {slide.label}
      </span>

      {/* Slide content — fades on transition */}
      <div
        style={{
          transition: `opacity ${FADE_DURATION_MS}ms ease`,
          opacity: fading ? 0 : 1,
        }}
      >
        <p
          className="font-bold text-white"
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.45rem)",
            letterSpacing: "0.02em",
            opacity: 0.78,
            marginBottom: "0.4rem",
            lineHeight: 1.25,
          }}
        >
          {slide.heading}
        </p>
        <p
          className="text-white"
          style={{
            fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
            letterSpacing: "0.03em",
            opacity: 0.38,
          }}
        >
          {slide.body}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-3">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            style={{
              height: 3,
              borderRadius: 2,
              width: i === slideIndex ? 18 : 5,
              backgroundColor:
                i === slideIndex
                  ? "rgba(255,122,26,0.75)"
                  : "rgba(255,255,255,0.18)",
              transition: "width 0.3s ease, background-color 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
