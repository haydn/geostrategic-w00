import { useParentSize } from "@visx/responsive";
import { useCallback, useState } from "react";

const useCamera = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, zoom: 10 });
  const {
    parentRef: cameraRef,
    height,
    width,
  } = useParentSize<HTMLDivElement>();

  const transformX = useCallback(
    (x: number) => (x - position.x) * position.zoom + width / 2,
    [position.x, position.zoom, width]
  );
  const transformY = useCallback(
    (y: number) => (y - position.y) * position.zoom + height / 2,
    [height, position.y, position.zoom]
  );

  return {
    cameraRef,
    height,
    position,
    setPosition,
    transformX,
    transformY,
    width,
  };
};

export default useCamera;
