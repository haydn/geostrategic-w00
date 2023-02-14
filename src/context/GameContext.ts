import useAuth from "@/context/useAuth";
import useCamera from "@/context/useCamera";
import useEntities from "@/context/useEntities";
import useInput from "@/context/useInput";
import useNow from "@/context/useNow";
import useSupabase from "@/context/useSupabase";
import { createContext } from "react";

const GameContext = createContext<{
  auth: ReturnType<typeof useAuth>;
  camera: ReturnType<typeof useCamera>;
  entities: ReturnType<typeof useEntities>;
  input: ReturnType<typeof useInput>;
  now: ReturnType<typeof useNow>;
  supabase: ReturnType<typeof useSupabase>;
} | null>(null);

export default GameContext;
