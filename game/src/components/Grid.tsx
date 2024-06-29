import useGameContext from "@/context/useGameContext";
import { Fragment } from "react";

const Grid = () => {
  const {
    camera,
    input: { showGrid },
  } = useGameContext();

  return showGrid
    ? [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50].map((x) =>
        [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50].map((y) => (
          <Fragment key={`${x},${y}`}>
            <path
              d={`M ${camera.transformX(x) - 5} ${camera.transformY(y)} L ${
                camera.transformX(x) + 5
              } ${camera.transformY(y)} M ${camera.transformX(x)} ${
                camera.transformY(y) - 5
              } L ${camera.transformX(x)} ${camera.transformY(y) + 5}`}
              stroke="#111"
              strokeWidth={0.5}
            />
            <text
              x={camera.transformX(x) + 10}
              y={camera.transformY(y) + 2}
              fontSize={10}
              fontFamily="monospace"
              fill="#262626"
              style={{ userSelect: "none" }}
            >
              {x},{y}
            </text>
          </Fragment>
        ))
      )
    : null;
};

export default Grid;
