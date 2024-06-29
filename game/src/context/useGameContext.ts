import GameContext from "@/context/GameContext";
import { useContext } from "react";

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) throw Error("No context");
  return context;
};

export default useGameContext;
