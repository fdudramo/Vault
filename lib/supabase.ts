import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://opohctlgjuxvyzglliyj.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wb2hjdGxnanV4dnl6Z2xsaXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyODE5ODUsImV4cCI6MjA4ODg1Nzk4NX0.AWgzPec8qauNwnC79OTbckLto7SIofg29uA03fm3Lno'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
