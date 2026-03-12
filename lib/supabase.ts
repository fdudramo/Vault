import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://opohctlgjuxvyzglliyj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wb2hjdGxnanV4dnl6Z2xsaXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyODE5ODUsImV4cCI6MjA4ODg1Nzk4NX0.AWgzPec8qauNwnC79OTbckLto7SIofg29uA03fm3Lno";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
