import useGameContext from "@/context/useGameContext";
import { area, bottom, left, right, top } from "@/utils/geometric-fns";
import Token from "./Token";

const UnitLayer = () => {
  const {
    auth: { player },
    camera,
    entities: { classifications, players, units },
    input: { selectedUnitId, setSelectedUnitId },
  } = useGameContext();

  return units
    .sort((a, b) => area(b.position) - area(a.position))
    .map((unit) => {
      const classification = classifications.find(
        (c) => c.id === unit.classification_id
      );
      const owner = players.find(
        (p) => p.id === unit.owner_id //&& p.user_id !== null
      );
      return (
        <Token
          key={unit.id}
          x={camera.transformX(left(unit.position))}
          y={camera.transformY(top(unit.position))}
          width={
            camera.transformX(right(unit.position)) -
            camera.transformX(left(unit.position))
          }
          height={
            camera.transformY(bottom(unit.position)) -
            camera.transformY(top(unit.position))
          }
          icon={classification?.icon}
          color={owner?.color}
          owner={player ? unit.owner_id === player.id : false}
          onClick={(event) => {
            setSelectedUnitId(selectedUnitId === unit.id ? undefined : unit.id);
            event.stopPropagation();
          }}
        />
      );
    });
};

export default UnitLayer;
