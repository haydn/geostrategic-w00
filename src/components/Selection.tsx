import useGameContext from "@/context/useGameContext";
import { bottom, left, right, top } from "@/utils/geometric-fns";

const Selection = () => {
  const {
    camera,
    input: { selectedUnit },
  } = useGameContext();

  return selectedUnit ? (
    <>
      <polyline
        stroke="#f0f"
        fill="none"
        points={[
          `${
            camera.transformX(left(selectedUnit.position)) - 6
          },${camera.transformY(top(selectedUnit.position))}`,
          `${camera.transformX(left(selectedUnit.position)) - 6},${
            camera.transformY(top(selectedUnit.position)) - 6
          }`,
          `${camera.transformX(left(selectedUnit.position))},${
            camera.transformY(top(selectedUnit.position)) - 6
          }`,
        ].join(" ")}
      />
      <polyline
        stroke="#f0f"
        fill="none"
        points={[
          `${
            camera.transformX(right(selectedUnit.position)) + 6
          },${camera.transformY(top(selectedUnit.position))}`,
          `${camera.transformX(right(selectedUnit.position)) + 6},${
            camera.transformY(top(selectedUnit.position)) - 6
          }`,
          `${camera.transformX(right(selectedUnit.position))},${
            camera.transformY(top(selectedUnit.position)) - 6
          }`,
        ].join(" ")}
      />
      <polyline
        stroke="#f0f"
        fill="none"
        points={[
          `${
            camera.transformX(right(selectedUnit.position)) + 6
          },${camera.transformY(bottom(selectedUnit.position))}`,
          `${camera.transformX(right(selectedUnit.position)) + 6},${
            camera.transformY(bottom(selectedUnit.position)) + 6
          }`,
          `${camera.transformX(right(selectedUnit.position))},${
            camera.transformY(bottom(selectedUnit.position)) + 6
          }`,
        ].join(" ")}
      />
      <polyline
        stroke="#f0f"
        fill="none"
        points={[
          `${
            camera.transformX(left(selectedUnit.position)) - 6
          },${camera.transformY(bottom(selectedUnit.position))}`,
          `${camera.transformX(left(selectedUnit.position)) - 6},${
            camera.transformY(bottom(selectedUnit.position)) + 6
          }`,
          `${camera.transformX(left(selectedUnit.position))},${
            camera.transformY(bottom(selectedUnit.position)) + 6
          }`,
        ].join(" ")}
      />
    </>
  ) : null;
};

export default Selection;
