spritewerk
==========

### the what
spritewerk is a canvas based framework to ease and speed up the process of multi-platform html game development

### the why
spritewerk is a culmination of my own curiosity and desire to improve my skills, coupled (loosely amirite?) with my interest in producing traditional, console-style games.

### Home Page
http://c-concat-p.github.io/spritewerk/

## core attributes
* keep it clean organized properly commented
* extendable state objects which use facades to seamlessly integrate
  * libs
  * and also the core api itself, to keep core code clean
* state manager for loading/switching states with default/custom loading screen
* state contains
  * access to related data object
  * entity creation, and all user init
  * update method (un)binding
* data contains
  * array of assets to preload
  * entities and their config
  * extras config (eg: scrolling, tilesheets etc)
* controllable camera (game dimensions)
* camera/entity pos determines rendering
* entities with layer ordering/swapping
* entity (or ent mgr?) update method updates basic vx/vy
* entities have plugin functionality to add collision boxes, physics etc?
* audio handling - possibly with ["audio sprites"](http://remysharp.com/2010/12/23/audio-sprites/)
* via lib
  * preloader
  * inheritable objects
  * event handling
  * input handling

## extras
* sprite sheet animation
* tweening
* particles
* arcade physics

## stream
* dom ready
* core is bootstrapped
* states are registered
* game manager loads initial state and data
