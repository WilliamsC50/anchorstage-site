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
const SLIDE_INTERVAL_MS = 10_000;
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
          style={{ fontSize: 28, letterSpacing: "0.22em", opacity: 0.36 }}
        >
          Open Mic Night
        </p>
        <p
          className="font-medium uppercase text-white"
          style={{ fontSize: 15, letterSpacing: "0.4em", opacity: 0.18 }}
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
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
      }}
    >
      {/* Slide content — fades on transition */}
      <div
        style={{
          transition: `opacity ${FADE_DURATION_MS}ms ease`,
          opacity: fading ? 0 : 1,
        }}
      >
        {/* Image — contain-fit so full graphic is always visible; no cropping */}
        {hasImage && (
          <div
            style={{
              width: "100%",
              height: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(5, 10, 20, 0.60)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imageUrl}
              alt={slide.heading ?? ""}
              onError={(e) => {
                (e.currentTarget.parentElement as HTMLElement).style.display = "none";
              }}
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        {/* Text — padded below the image (or standalone for text-only slides) */}
        {(slide.label || slide.heading || slide.body) && (
          <div style={{ padding: "0.75rem 1.25rem 0" }}>
            {/* Label pill inline for text-only slides */}
            {slide.label && (
              <span
                className="uppercase font-semibold"
                style={{
                  display: "inline-block",
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  padding: "3px 10px",
                  borderRadius: 20,
                  border: "1.5px solid rgba(255,122,26,0.40)",
                  color: "rgba(255,122,26,0.75)",
                  marginBottom: "0.5rem",
                }}
              >
                {slide.label}
              </span>
            )}

            {slide.heading && (
              <p
                className="font-bold text-white"
                style={{
                  fontSize: 22,
                  letterSpacing: "0.02em",
                  opacity: 0.78,
                  marginBottom: "0.35rem",
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
                  fontSize: 16,
                  letterSpacing: "0.03em",
                  opacity: 0.38,
                }}
              >
                {slide.body}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5" style={{ padding: "0.5rem 1.25rem 0.75rem" }}>
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
