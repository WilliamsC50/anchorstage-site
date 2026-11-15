import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import DisplayCanvas from "../copperrocket/DisplayCanvas";

type Props = {
  params: Promise<{ screenSlug: string }>;
};

// Signage slugs are normalized by the app on creation to lowercase letters,
// digits, and hyphens. Anything else cannot name a screen, so it 404s here
// without a database round trip (stray marketing URLs, probes like /.env).
const SCREEN_SLUG_PATTERN = /^[a-z0-9-]+$/;

export default async function GenericDisplayPage({ params }: Props) {
  const { screenSlug } = await params;

  if (!SCREEN_SLUG_PATTERN.test(screenSlug)) {
    notFound();
  }

  // Without server credentials no screen can be loaded. Treat it as not
  // found rather than letting the client constructor throw a 500.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    notFound();
  }

  const db = supabaseServer();

  const { data: rawScreen, error: screenError } = await db
    .from("signage_screen")
    .select("screen_slug, screen_type, is_active, display_name, website_url, tip_url, background_image_url, attribution_text, default_notice, default_subnotice, logo_url, accent_color, secondary_color")
    .eq("screen_slug", screenSlug)
    .maybeSingle();

  // Lookup failures are logged server-side only; visitors see the 404.
  if (screenError) {
    console.error("signage_screen lookup failed", screenError.code);
  }

  if (!rawScreen || !(rawScreen as { is_active: boolean }).is_active) {
    notFound();
  }

  const screen = rawScreen as {
    screen_slug: string;
    screen_type: string;
    is_active: boolean;
    display_name: string;
    website_url: string | null;
    tip_url: string | null;
    background_image_url: string | null;
    attribution_text: string | null;
    default_notice: string | null;
    default_subnotice: string | null;
    logo_url: string | null;
    accent_color: string | null;
    secondary_color: string | null;
  };

  const { data: rawSession } = await db
    .from("open_mic_session")
    .select("graphic_url")
    .eq("venue_slug", screenSlug)
    .eq("status", "ACTIVE")
    .order("session_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <DisplayCanvas
      screenSlug={screen.screen_slug}
      screenType={screen.screen_type}
      screenConfig={{
        display_name: screen.display_name,
        website_url: screen.website_url,
        tip_url: screen.tip_url,
        background_image_url: screen.background_image_url,
        attribution_text: screen.attribution_text,
        default_notice: screen.default_notice,
        default_subnotice: screen.default_subnotice,
        logo_url: screen.logo_url,
        accent_color: screen.accent_color,
        secondary_color: screen.secondary_color,
      }}
      sessionGraphicUrl={(rawSession as { graphic_url: string | null } | null)?.graphic_url ?? null}
    />
  );
}
