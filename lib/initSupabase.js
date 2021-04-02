import { createClient } from "@supabase/supabase-js";

const URL = "https://rnendkmlmdpqykxjyoqp.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzM1MzU0MiwiZXhwIjoxOTMyOTI5NTQyfQ.AIk6zHOKRLoaN1rKR373G_vE0H7M9xU_fQbELNdACvk";

/*
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
*/

export const supabase = createClient(URL, ANON_KEY);
