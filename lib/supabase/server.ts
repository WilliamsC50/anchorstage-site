import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using the service role key.
// Only call from Server Actions and Route Handlers. Never import on the client.
//
// Requires in environment:
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
export function supabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
