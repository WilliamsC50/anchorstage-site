import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — createClient is deferred until first use so it is never
// called during Next.js build-time prerendering (when env vars are absent).
//
// Requires in .env.local:
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY
let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}
