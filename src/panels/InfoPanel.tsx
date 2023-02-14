"use client";

import config from "@/config";
import useGameContext from "@/context/useGameContext";
import Panel from "@/panels/Panel";
import PanelContent from "@/panels/PanelContent";
import PanelHeader from "@/panels/PanelHeader";
import shortId from "@/utils/shortId";
import { Temporal } from "temporal-polyfill";

const InfoPanel = () => {
  const {
    now,
    entities,
    input: { selectedClassification, selectedUnit },
    camera: {
      position: { zoom },
      setPosition: setCamera,
    },
  } = useGameContext();

  const player = selectedUnit
    ? entities.players.find((player) => player.id === selectedUnit.owner_id)
    : undefined;

  return (
    <Panel>
      <PanelHeader>Info</PanelHeader>
      <PanelContent>Time: {now.toString()}</PanelContent>
      <PanelContent>
        {selectedClassification ? (
          <div>Classification: {selectedClassification.name}</div>
        ) : null}
        {selectedUnit ? (
          <>
            <div>ID: {shortId(selectedUnit.id)}</div>
            <div>
              Owner:{" "}
              {player ? (
                <span
                  style={{
                    color: `hsl(${player.color} 100% 50%)`,
                  }}
                >
                  {player.name}
                </span>
              ) : (
                "-"
              )}
            </div>
            <div>
              Action Points:{" "}
              {new Intl.NumberFormat("en", {
                notation: "compact",
              }).format(
                Math.min(
                  345600000,
                  Math.floor(
                    now
                      .since(Temporal.Instant.from(selectedUnit.timestamp))
                      .total("milliseconds")
                  )
                )
              )}
              /
              {new Intl.NumberFormat("en", {
                notation: "compact",
              }).format(172800000)}
            </div>
            <progress
              max={172800000}
              value={Math.min(
                345600000,
                Math.floor(
                  now
                    .since(Temporal.Instant.from(selectedUnit.timestamp))
                    .total("milliseconds")
                )
              )}
            />
          </>
        ) : null}
        <div>
          <input
            type="range"
            min={config.minZoom}
            max={config.maxZoom}
            value={zoom}
            onChange={(event) => {
              setCamera((current) => ({
                ...current,
                zoom: parseInt(event.target.value, 10),
              }));
            }}
          />
        </div>
      </PanelContent>
    </Panel>
  );
};

export default InfoPanel;
