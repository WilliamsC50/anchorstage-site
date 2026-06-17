import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import DisplayCanvas from "./DisplayCanvas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Copper Rocket Open Mic - AnchorStage",
  description: "Live open mic signup display.",
};

const SCREEN_SLUG = "copperrocket";

export default async function CopperRocketPage() {
  const db = supabaseServer();

  const { data: rawScreen } = await db
    .from("signage_screen")
    .select("screen_type, display_name, website_url, tip_url, background_image_url, attribution_text, default_notice, default_subnotice, logo_url, accent_color, secondary_color")
    .eq("screen_slug", SCREEN_SLUG)
    .maybeSingle();

  const { data: rawSession } = await db
    .from("open_mic_session")
    .select("graphic_url")
    .eq("venue_slug", SCREEN_SLUG)
    .eq("status", "ACTIVE")
    .order("session_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const screen = rawScreen as {
    screen_type: string;
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
  } | null;

  return (
    <DisplayCanvas
      screenSlug={SCREEN_SLUG}
      screenType={screen?.screen_type ?? "OPEN_MIC"}
      screenConfig={{
        display_name: screen?.display_name ?? "Open Mic",
        website_url: screen?.website_url ?? null,
        tip_url: screen?.tip_url ?? null,
        background_image_url: screen?.background_image_url ?? null,
        attribution_text: screen?.attribution_text ?? null,
        default_notice: screen?.default_notice ?? null,
        default_subnotice: screen?.default_subnotice ?? null,
        logo_url: screen?.logo_url ?? null,
        accent_color: screen?.accent_color ?? null,
        secondary_color: screen?.secondary_color ?? null,
      }}
      sessionGraphicUrl={(rawSession as { graphic_url: string | null } | null)?.graphic_url ?? null}
    />
  );
}
