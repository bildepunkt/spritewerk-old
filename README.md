SPRITEWERK
==========

### A small, friendly HTML5 framework for device-agnostic game development  

SPRITEWERK is a culmination of:
* my desire to learn and keep up with Javascript and HTML5 advances
* self-expression (read: the ability to write code the way I want :P )
* a desire to quickly and easily prototype my game/interactive ideas

#### Architecture
* all object properties are private and thus, should only be accessed through methods
* all packages/modules require SW.Common to work on their own, and SW.Media requires SW.Events
* currently the SPRITEWERK interaction paradigm is that game control is device-agnostic; therefore:
 * no mouse-move or hover events are emitted
 * touch/mouse events are normalized and merged into these singular events: press, dblpress, pressup, pressdown, dragstart, drag, dragstop
