import config from "@/config";
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";
import type { Database } from "../_generated";

const useSupabase = () => {
  const supabase = useMemo(
    () => createClient<Database>(config.supabaseUrl, config.supabaseKey),
    []
  );
  return supabase;
};

export default useSupabase;
