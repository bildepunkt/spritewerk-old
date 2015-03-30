'use strict';

/**
 * Sprite
 */
var Sprite = function(x, y) {
    this.x = x;
    this.y = y;
    this.oldX = this.x;
    this.oldY = this.y;
    this.vx = 0;
    this.vy = 0;

    this.size = 16;

    this.hitBoundaryTop    = false;
    this.hitBoundaryBottom = false;
    this.hitBoundaryLeft   = false;
    this.hitBoundaryRight  = false;

    this.type = 'rect';

    this.bounce = 0.4;

    Signal.addListener('update', this.update, this);
};
Sprite.prototype.update = function(e) {
    var frictionX = e.detail.forces.frictionX;
    var frictionY = e.detail.forces.frictionY;
    var gravity;
    var wind;

    if (this.hitBoundaryLeft || this.hitBoundaryRight) {
        this.oldX = this.x + this.vx * this.bounce;
        this.hitBoundaryLeft = false;
        this.hitBoundaryRight = false;
        frictionY /= 1.1;
    }
    if (this.hitBoundaryTop || this.hitBoundaryBottom) {
        this.oldY = this.y + this.vy * this.bounce;
        frictionX /= 16;

        this.hitBoundaryTop = false;
        this.hitBoundaryBottom = false;
    }

    gravity = e.detail.forces.gravity * frictionY;
    wind = e.detail.forces.wind * frictionX;

    // Verlet integration
    this.vx = (this.x - this.oldX) * frictionX;
    this.vy = (this.y - this.oldY) * frictionY;

    this.oldX = this.x;
    this.oldY = this.y;

    this.x += this.vx;
    this.y += this.vy;

    this.y += gravity;
    this.x += wind;
};

/**
 * Draw
 */
var Draw = function(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    Signal.addListener('render', this.update, this);
};
Draw.prototype.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
Draw.prototype.render = function(entity) {
    this.context.save();
    this.context.fillStyle = '#ccc';
    this.context.translate(entity.x, entity.y);

    switch(entity.type) {
        case 'rect':
            this.renderRect(entity);
        break;
    }

    this.context.restore();
};
Draw.prototype.update = function(e) {
    var inhabitants = e.detail.inhabitants;

    this.clear();
    for (var i = 0; i < inhabitants.length; i++) {
        this.render(inhabitants[i]);
    };
};
Draw.prototype.renderRect = function(entity) {
    this.context.fillRect(0, 0, entity.size, entity.size);
};

/**
 * Camera
 */
var Camera = function(canvas) {
    this.canvas = canvas;
};
Camera.prototype.contain = function(entity) {
    if (entity.x < 0) {
        entity.x = 0;
        entity.hitBoundaryLeft = true;
    }
    if (entity.x + entity.size > this.canvas.width) {
        entity.x = this.canvas.width - entity.size;
        entity.hitBoundaryRight = true;
    }
    if (entity.y < 0) {
        entity.y = 0;
        entity.hitBoundaryTop = true;
    }
    if (entity.y + entity.size > this.canvas.height) {
        entity.y = this.canvas.height - entity.size;
        entity.hitBoundaryBottom = true;
    }
};

/**
 * World
 */
var World = function(canvas) {
    this.canvas = canvas;

    this.frame = 0;

    this.forces = {
        gravity: 0.5,
        frictionX: 0.999,
        frictionY: 0.999999,
        wind: -0.08
    };

    this.camera = new Camera(canvas);

    this.inhabitants = null;

    this.scopedUpdate = this.update.bind(this);

    requestAnimationFrame(this.scopedUpdate);
};
World.prototype.populate = function() {
    this.inhabitants = arguments;
};
World.prototype.update = function() {
    this.frame++;

    var data = {
        frame: this.frame,
        inhabitants: this.inhabitants,
        forces: this.forces
    };

    Signal.dispatch('update', data);

    for (var i = 0; i < this.inhabitants.length; i++) {
        this.camera.contain(this.inhabitants[i]);
    };

    Signal.dispatch('render', data);

    requestAnimationFrame(this.scopedUpdate);
};

/**
 * Creation
 */
(function() {
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    var world;

    canvas.width = 800;
    canvas.height = 600;

    new Draw(canvas, context);

    world = new World(canvas);
    world.populate(
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128),
        new Sprite(Math.random()*canvas.width, Math.random()*128)
    );
}());