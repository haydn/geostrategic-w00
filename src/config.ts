import envCheck from "./utils/envCheck";

envCheck(process.env.SUPABASE_URL, "SUPABASE_URL");
envCheck(process.env.SUPABASE_ANON_KEY, "SUPABASE_ANON_KEY");

const config = {
  maxZoom: 20,
  minZoom: 1,
  supabaseKey: process.env.SUPABASE_ANON_KEY,
  supabaseUrl: process.env.SUPABASE_URL,
};

export default config;
