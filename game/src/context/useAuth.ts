import type { Database } from "@/_types";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import useEntities from "./useEntities";

const useAuth = (
  supabase: SupabaseClient<Database>,
  entities: ReturnType<typeof useEntities>
) => {
  const [user, setUser] = useState<User | null>(null);

  const player = user
    ? entities.players.find((player) => player.user_id === user.id)
    : undefined;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setUser]);

  return {
    joinGame: async (name: string) => {
      const result = await supabase.rpc("join_game", {
        name,
      });
      if (result.error) {
        throw result.error;
      } else if (result.status < 200 || result.status >= 300) {
        throw Error(result.statusText);
      }
    },
    logIn: async (email: string, password: string) => {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (response.error) {
        throw Error(response.error.message);
      } else {
        setUser(response.data.user);
      }
    },
    logOut: async () => {
      await supabase.auth.signOut();
    },
    signUp: async (email: string, password: string) => {
      const response = await supabase.auth.signUp({
        email,
        password,
      });

      if (response.error) {
        throw Error(response.error.message);
      } else {
        setUser(response.data.user);
      }
    },
    user,
    player,
  };
};

export default useAuth;
