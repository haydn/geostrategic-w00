import config from "@/config";
import { area, contains } from "@/utils/geometric-fns";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import type { Database } from "../_types";
import useCamera from "./useCamera";
import useEntities from "./useEntities";

const DIRECTIONS = {
  ArrowDown: "south",
  ArrowLeft: "west",
  ArrowRight: "east",
  ArrowUp: "north",
} as const;

const isDirectionKey = (key: string): key is keyof typeof DIRECTIONS =>
  key in DIRECTIONS;

const useInput = ({
  camera,
  entities,
  supabase,
}: {
  camera: ReturnType<typeof useCamera>;
  entities: ReturnType<typeof useEntities>;
  supabase: SupabaseClient<Database>;
}) => {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const { units, classifications, actions } = entities;

  const [selectedUnitId, setSelectedUnitId] = useState<string | undefined>(
    undefined
  );
  const [showIconEditor, setShowIconEditor] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const lastTouchPositions = useRef<Array<{ x: number; y: number }>>([]);

  const selectedUnit = selectedUnitId
    ? units.find((unit) => unit.id === selectedUnitId)
    : undefined;

  const selectedClassification = selectedUnit
    ? classifications.find(
        (classification) => classification.id === selectedUnit.classification_id
      )
    : undefined;

  useEffect(() => {
    const game = gameRef.current;

    if (!game) return;

    const clickHandler = () => {
      setSelectedUnitId(undefined);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (event.buttons === 2) {
        camera.setPosition(({ x, y, zoom }) => ({
          x: x - event.movementX / zoom,
          y: y - event.movementY / zoom,
          zoom,
        }));
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();

      switch (event.touches.length) {
        case 1: {
          const lastPos = lastTouchPositions.current[0];
          const touch = event.touches[0];
          if (touch) {
            if (lastPos) {
              camera.setPosition(({ x, y, zoom }) => ({
                x: x - (touch.clientX - lastPos.x) / zoom,
                y: y - (touch.clientY - lastPos.y) / zoom,
                zoom,
              }));
            }
            lastTouchPositions.current = [
              { x: touch.clientX, y: touch.clientY },
            ];
          }
          break;
        }
        case 2: {
          break;
        }
        default: {
          lastTouchPositions.current = [];
          break;
        }
      }
    };

    const onDocumentTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const onTouchEnd = () => {
      lastTouchPositions.current = [];
    };

    const contextMenuHandler = (event: MouseEvent) => {
      event.preventDefault();
    };

    const keyDownHandler = (event: KeyboardEvent) => {
      if (
        document.activeElement !== null &&
        document.activeElement !== document.body
      ) {
        return;
      }

      if (selectedUnit && isDirectionKey(event.key)) {
        let targetUnit = selectedUnit;

        if (event.shiftKey) {
          targetUnit =
            units
              .sort((a, b) => area(a.position) - area(b.position))
              .find(
                (unit) =>
                  unit.id !== selectedUnit.id &&
                  contains(unit.position, selectedUnit.position)
              ) ?? targetUnit;
        }

        const moveAction = actions.find(
          (action) =>
            action.classification_id === targetUnit.classification_id &&
            action.type === "move"
        );

        if (moveAction) {
          supabase
            .rpc("move_unit", {
              target_unit_id: targetUnit.id,
              operator_unit_id: selectedUnit.id,
              action_id: moveAction.id,
              direction: DIRECTIONS[event.key],
            })
            .then((result) => {
              if (result.status < 200 || result.status >= 300) {
                console.error(result);
              }
            });
        }
      }

      if (event.key === "i" && event.ctrlKey) {
        setShowIconEditor((current) => !current);
      }

      if (event.key === "g" && event.ctrlKey) {
        setShowGrid((current) => !current);
      }
    };

    const wheelHandler = (event: WheelEvent) => {
      camera.setPosition((current) => ({
        ...current,
        zoom: Math.min(
          Math.max(current.zoom + (event.deltaY < 0 ? 1 : -1), config.minZoom),
          config.maxZoom
        ),
      }));
    };

    document.addEventListener("touchmove", onDocumentTouchMove, {
      passive: false,
    });
    game.addEventListener("click", clickHandler);
    game.addEventListener("mousemove", onMouseMove);
    game.addEventListener("touchmove", onTouchMove);
    game.addEventListener("touchend", onTouchEnd);
    game.addEventListener("contextmenu", contextMenuHandler);
    game.addEventListener("wheel", wheelHandler);
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("touchmove", onDocumentTouchMove);
      game.removeEventListener("click", clickHandler);
      game.removeEventListener("mousemove", onMouseMove);
      game.removeEventListener("touchmove", onTouchMove);
      game.removeEventListener("touchend", onTouchEnd);
      game.removeEventListener("contextmenu", contextMenuHandler);
      game.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [actions, camera, selectedUnit, supabase, units]);

  return {
    gameRef,
    selectedClassification,
    selectedUnit,
    selectedUnitId,
    setSelectedUnitId,
    setShowIconEditor,
    showGrid,
    showIconEditor,
  };
};

export default useInput;
