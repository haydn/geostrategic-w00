import useGameContext from "@/context/useGameContext";
import { bottom, left, right, top } from "@/utils/geometric-fns";

const Selection = () => {
  const {
    camera,
    input: { selectedUnit },
  } = useGameContext();

  return selectedUnit ? (
    <>
      <g stroke="#fff" strokeWidth={3} fill="none">
        <polyline
          points={[
            `${camera.transformX(left(selectedUnit.position)) - 6},${
              camera.transformY(top(selectedUnit.position)) + 1
            }`,
            `${camera.transformX(left(selectedUnit.position)) - 6},${
              camera.transformY(top(selectedUnit.position)) - 6
            }`,
            `${camera.transformX(left(selectedUnit.position)) + 1},${
              camera.transformY(top(selectedUnit.position)) - 6
            }`,
          ].join(" ")}
        />
        <polyline
          points={[
            `${camera.transformX(right(selectedUnit.position)) + 6},${
              camera.transformY(top(selectedUnit.position)) + 1
            }`,
            `${camera.transformX(right(selectedUnit.position)) + 6},${
              camera.transformY(top(selectedUnit.position)) - 6
            }`,
            `${camera.transformX(right(selectedUnit.position)) - 1},${
              camera.transformY(top(selectedUnit.position)) - 6
            }`,
          ].join(" ")}
        />
        <polyline
          points={[
            `${camera.transformX(right(selectedUnit.position)) + 6},${
              camera.transformY(bottom(selectedUnit.position)) - 1
            }`,
            `${camera.transformX(right(selectedUnit.position)) + 6},${
              camera.transformY(bottom(selectedUnit.position)) + 6
            }`,
            `${camera.transformX(right(selectedUnit.position)) - 1},${
              camera.transformY(bottom(selectedUnit.position)) + 6
            }`,
          ].join(" ")}
        />
        <polyline
          points={[
            `${camera.transformX(left(selectedUnit.position)) - 6},${
              camera.transformY(bottom(selectedUnit.position)) - 1
            }`,
            `${camera.transformX(left(selectedUnit.position)) - 6},${
              camera.transformY(bottom(selectedUnit.position)) + 6
            }`,
            `${camera.transformX(left(selectedUnit.position)) + 1},${
              camera.transformY(bottom(selectedUnit.position)) + 6
            }`,
          ].join(" ")}
        />
      </g>
      <g stroke="#000" strokeWidth={1} fill="none">
        <polyline
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
      </g>
    </>
  ) : null;
};

export default Selection;
