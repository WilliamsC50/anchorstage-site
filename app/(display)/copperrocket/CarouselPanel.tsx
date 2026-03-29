"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

type CarouselSession = {
  display_carousel_enabled: boolean | null;
};

type CarouselItem = {
  item_id: string;
  title: string | null;
  body: string | null;
  image_url: string | null;
  sort_order: number;
};

type Slide = {
  label?: string;
  heading?: string;
  body?: string;
  imageUrl?: string;
};

// ─── Configuration ────────────────────────────────────────────────────────────

const ACTIVE_SESSION_STATUSES = ["ACTIVE"];
const POLL_INTERVAL_MS = 30_000;
const SLIDE_INTERVAL_MS = 7_000;
const FADE_DURATION_MS = 350;

const PLACEHOLDER_SLIDES: Slide[] = [
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
];

// ─── Data fetchers ────────────────────────────────────────────────────────────

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

async function fetchCarouselItems(): Promise<Slide[]> {
  const db = getSupabaseClient();
  const { data, error } = await db
    .from("open_mic_carousel_item")
    .select("item_id, title, body, image_url, sort_order")
    .eq("venue_slug", "copperrocket")
    .eq("is_enabled", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return [];

  return (data as CarouselItem[]).map((item) => ({
    heading: item.title ?? undefined,
    body: item.body ?? undefined,
    imageUrl: item.image_url ?? undefined,
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CarouselPanel() {
  const [enabled, setEnabled] = useState(false);
  const [slides, setSlides] = useState<Slide[]>(PLACEHOLDER_SLIDES);
  const [slideIndex, setSlideIndex] = useState(0);
  const [fading, setFading] = useState(false);

  // ── Session + items: polling and realtime subscriptions ───────────────────
  useEffect(() => {
    const db = getSupabaseClient();
    let mounted = true;

    async function load() {
      const [isEnabled, dbSlides] = await Promise.all([
        fetchCarouselEnabled(),
        fetchCarouselItems(),
      ]);
      if (!mounted) return;
      setEnabled(isEnabled);
      setSlides(dbSlides.length > 0 ? dbSlides : PLACEHOLDER_SLIDES);
    }

    load();
    const poll = setInterval(load, POLL_INTERVAL_MS);

    const sessionChannel = db
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

    const itemsChannel = db
      .channel("cr_carousel_items")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "open_mic_carousel_item",
          filter: "venue_slug=eq.copperrocket",
        },
        () => load()
      )
      .subscribe();

    return () => {
      mounted = false;
      clearInterval(poll);
      db.removeChannel(sessionChannel);
      db.removeChannel(itemsChannel);
    };
  }, []);

  // ── Auto-advance slides with fade ──────────────────────────────────────────
  useEffect(() => {
    if (!enabled || slides.length <= 1) return;

    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSlideIndex((i) => (i + 1) % slides.length);
        setFading(false);
      }, FADE_DURATION_MS);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [enabled, slides]);

  // When carousel is off, render the static event identity block in its place
  if (!enabled) {
    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <p
          className="font-bold uppercase text-white"
          style={{ fontSize: "clamp(1.25rem, 2vw, 1.9rem)", letterSpacing: "0.22em", opacity: 0.36 }}
        >
          Open Mic Night
        </p>
        <p
          className="font-medium uppercase text-white"
          style={{ fontSize: "clamp(0.75rem, 1.1vw, 1rem)", letterSpacing: "0.4em", opacity: 0.18 }}
        >
          Copper Rocket
        </p>
      </div>
    );
  }

  const slide = slides[slideIndex % Math.max(slides.length, 1)] ?? PLACEHOLDER_SLIDES[0];
  const hasImage = !!slide.imageUrl;

  return (
    <div
      className="w-full"
      style={{
        padding: "1.4rem 1.75rem 1.25rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Slide label pill — top-right (placeholder slides only) */}
      {slide.label && (
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
      )}

      {/* Slide content — fades on transition */}
      <div
        style={{
          transition: `opacity ${FADE_DURATION_MS}ms ease`,
          opacity: fading ? 0 : 1,
        }}
      >
        {/* Image — hides itself silently on load error */}
        {hasImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slide.imageUrl}
            alt={slide.heading ?? ""}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{
              display: "block",
              width: "100%",
              maxHeight: 160,
              objectFit: "cover",
              borderRadius: 6,
              marginBottom: slide.heading || slide.body ? "0.75rem" : 0,
            }}
          />
        )}

        {slide.heading && (
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
        )}

        {slide.body && (
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
        )}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-3">
        {slides.map((_, i) => (
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
