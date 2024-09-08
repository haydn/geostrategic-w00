+++
title = "Actions"
weight = 4
+++

Actions are how [players](@/players.md) interact with the game. Actions are part
of a [classification](@/classifications.md) and are available to
[units](@/units.md) that belong to that classification.

## Action Points

Most [actions](@/actions.md) cost action points to execute. These points are
paid from the supply of action points that
[autonomous unit](@/units.md#autonomous-units) have accumulated. Action points
are accumulated at a rate of 2,000 per second (irrespective of whether the
player which owns the unit is online). Instead of keeping a running counting of
a unit's current action points, the value is instead calculated from the unit's
`timestamp` which is updated each time a unit's action points are spent. A
unit's actions points can never exceed 172,800,000 (the amount of action points
that accumulate in a 2 day period).

The formula for calculating a unit's current action points (\\(p\\)) is as
follows:

$$p = \min\\{2\times(t-s), 172800000\\}$$

Where:

- \\(t\\) is the current time in milliseconds since Unix epoch.
- \\(s\\) is the unit's current `timestamp` in milliseconds since Unix epoch.

The formula for updating a unit's timestamp (\\(s'\\)) is as follows:

$$s' = \max\\{s, t-172800000\\} + \dfrac{c}{2}$$

Where:

- \\(t\\) is the current time in milliseconds since Unix epoch.
- \\(s\\) is the unit's current `timestamp` in milliseconds since Unix epoch.
- \\(c\\) is the number of action points to deduct.

## Action Types

The `type` property of an action defines how the action functions.

### Move Action

> Value of `type`: `move`

This action causes a "target unit" (the [unit](@/units.md) which belongs to the
action's [classification](@/classifications.md)) to move one square north, east,
south or west. If the target unit contains other units (the contained units are
entirely within its bounds) then the contained units will move with the target
unit.

The action point cost of the move action must be paid be the "operator unit" —
an autonomous unit that is, or is contained within, the target unit.

> Note: Units can only be moved over the top of units that are larger in size
> and marked as container units. See [positioning](@/units.md#positioning) for
> more details.

## Properties

| Field               | Description                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `name`              | A name for this action (e.g. `"Walk"`, `"Run"` or `"Drive"`).                                                  |
| `type`              | The type of action. One of: `move`                                                                             |
| `action_point_cost` | The number of [action points](@/actions.md#action-points) the "operator unit" must pay to execute this action. |
