"use client";

import * as styles from "./Game.module.css";

import type { Writeable } from "@/_types";
import Grid from "@/components/Grid";
import IconEditor from "@/components/IconEditor";
import Selection from "@/components/Selection";
import UnitLayer from "@/components/UnitLayer";
import GameContext from "@/context/GameContext";
import useAuth from "@/context/useAuth";
import useCamera from "@/context/useCamera";
import useEntities from "@/context/useEntities";
import useInput from "@/context/useInput";
import useNow from "@/context/useNow";
import useSupabase from "@/context/useSupabase";
import InfoPanel from "@/panels/InfoPanel";
import UserPanel from "@/panels/UserPanel";
import PanelSet from "@/ui/PanelSet";

const Game = () => {
  const now = useNow();
  const supabase = useSupabase();

  const entities = useEntities(supabase);

  const auth = useAuth(supabase, entities);
  const camera = useCamera();
  const input = useInput({
    camera,
    entities,
    supabase,
  });

  return (
    <GameContext.Provider
      value={{
        auth,
        camera,
        entities,
        input,
        now,
        supabase,
      }}
    >
      <div className={styles.panels}>
        <PanelSet>
          <UserPanel />
          <InfoPanel />
        </PanelSet>
      </div>
      <IconEditor />
      <div
        ref={(element) => {
          input.gameRef.current = element;
          (camera.cameraRef as Writeable<typeof camera.cameraRef>).current =
            element;
        }}
        className={styles.container}
      >
        <svg width={camera.width} height={camera.height}>
          <Grid />
          <UnitLayer />
          <Selection />
        </svg>
      </div>
    </GameContext.Provider>
  );
};

export default Game;
