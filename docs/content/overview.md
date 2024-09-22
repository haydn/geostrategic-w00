+++
title = "Overview"
weight = 0
+++

World 00 is the first in the series of Geostrategic worlds. This world is
intended to be a sandbox for developing the basic game engine and is likely to
be superseded by World 01 fairly quickly.

World 00 has a simple 2D grid on which [units](@/units.md) are positioned. Some
units are [autonomous units](@/units.md#autonomous-units) (which can be owned by
[players](@/players.md)) and the rest are [inert units](@/units.md#inert-units).
The characteristics of units are defined by their
[classification](@/classifications.md). The [actions](@/actions.md) of a
classification define how players can interact with units of that
classification.

<!-- prettier-ignore-start -->
{% mermaid() %}
flowchart LR
  subgraph units[Units]
    autonomous_units[Autonomous Units]
    inert_units[Inert Units]
  end
  players[Players]
  classifications[Classifications]
  actions[Actions]
  
  autonomous_units .->|"owned by"| players
  autonomous_units & inert_units -->|"belong to"| classifications
  actions -->|"part of"| classifications
{% end %}
<!-- prettier-ignore-end -->
