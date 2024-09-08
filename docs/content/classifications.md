+++
title = "Classifications"
weight = 3
+++

A classification defines the characteristics of the [units](@/units.md) that
belong to it. This includes purely cosmetic characteristics (such as a name or
icon) as well as functional characteristics. The [actions](@/actions.md) that
are available for a given unit are also defined by its classification.

## Properties

| Field        | Description                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `area`       | The size of units that have this classification. See [positioning](@/units.md#positioning).                                                  |
| `autonomous` | If true, units with this classification can be owned by players and gain action points. See [autonomous units](@/units.md#autonomous-units). |
| `container`  | If true, units with this classification can contain other units. See [positioning](@/units.md#positioning).                                  |
| `icon`       | A unique icon for this classification.                                                                                                       |
| `name`       | A unique name for this classification.                                                                                                       |
