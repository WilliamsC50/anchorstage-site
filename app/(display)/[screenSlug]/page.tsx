import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import DisplayCanvas from "../copperrocket/DisplayCanvas";

type Props = {
  params: Promise<{ screenSlug: string }>;
};

export default async function GenericDisplayPage({ params }: Props) {
  const { screenSlug } = await params;

  const db = supabaseServer();
  const { data: screen } = await db
    .from("signage_screen")
    .select("screen_slug, screen_type, is_active")
    .eq("screen_slug", screenSlug)
    .single();

  if (!screen || !screen.is_active) {
    notFound();
  }

  return (
    <DisplayCanvas
      screenSlug={screen.screen_slug}
      screenType={screen.screen_type}
    />
  );
}
