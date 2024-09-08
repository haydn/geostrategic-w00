+++
title = "Units"
weight = 2
[extra]
latex = true
+++

A unit can be a person, a building, a piece of equipment, a work of art, a piece
of infrastructure, a resource or any other physical item that needs to be
represented in the game world. The characteristics of a unit are defined by the
[classification](@/classifications.md) to which it belongs.

## Positioning

A unit's position is denoted by two x-y coordinates that define a square. The
size of a unit's square is constrained by its
[classification](@/classifications.md). Units are positioned on the game world's
grid such that the edges of their square are always on a grid line (i.e. the x-y
coordinates of a unit's position are whole numbers).

Units can overlap each other, but only if the
[classification](@/classifications.md) of the unit being overlapped is marked as
a container and the unit doing the overlapping is smaller in area.

## Unit Types

Units are either autonomous or inert. This is defined by the `autonomous`
property of its [classification](@/classifications.md).

### Autonomous Units

An autonomous unit is a unit that can be owned by a [player](@/players.md).
Autonomous units continuously gain [action points](@/actions.md#action-points)
that are spent when executing [actions](@/actions.md).

### Inert Units

Units that can't be owned by a [player](@/players.md) (such as resources,
equipment or infrastructure) are called inert units.
[Action points](@/actions.md#action-points) are not relevant to inert units.

## Properties

| Field       | Description                                                                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `position`  | A rectangle (represented as `((x,y),(x,y))`) denoting the unit's size and position. The area of the rectangle must equal the `area` of the classification and must have equal side lengths (must be square). |
| `timestamp` | A high-water mark that is used to calculate a unit's [action points](@/actions.md#action-points).                                                                                                            |
