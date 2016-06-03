import Preloader from "../src/Preloader";

/**
 * 
 */
class Body {
    constructor(x=0, y=0, w=0, h=0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sx = 1;
        this.sy = 1;
    }

    boundingBox() {
        return {
            minX: this.x,
            minY: this.y,
            maxX: (this.x + this.w) * this.sx,
            maxY: (this.y + this.h) * this.sy
        };
    }

    translate(x, y) {
        this.x += x;
        this.y += y;
    }
}

/**
 * 
 */
class Sprite extends Body {
    constructor(x=0, y=0, w=0, h=0) {
        super(x, y, w, h);

        this.srcX = 0;
        this.srcY = 0;
        this.srcW = 0;
        this.srcH = 0;
        this.img = null;
    }

    render(context) {
        context.drawImage(
            this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.x,
            this.y,
            this.w * this.sx,
            this.h * this.sy
        );
    }

    setImage(path) {
        this.img = new Image();
        this.img.src = path;

        if (!this.w || !this.h) {
            this.w = this.img.width;
            this.h = this.img.height;
        }

        if (!this.srcW || !this.srcH) {
            this.srcW = this.img.width;
            this.srcH = this.img.height;
        }

        return this;
    }
}

/**
 * 
 */
class Rectangle extends Body {
    constructor(x=0, y=0, w=0, h=0) {
        super(x, y, w, h);
    }

    render(context) {
        context.fillRect(
            this.x,
            this.y,
            this.w,
            this.h
        );
    }
}

/**
 * 
 */
class Canvas {
    constructor(canvasEl, camera) {
        this._cam = camera;
        this._ctx = canvasEl.getContext("2d");
    }

    render(entity) {
        this._ctx.save();
        this._ctx.translate(-this._cam.x, -this._cam.y);

        if (this._cam.zoom !== 1) {
            const centerX = this._cam.w / 2;
            const centerY = this._cam.h / 2;
            const zoom = this._cam.zoom;

            this._ctx.translate(centerX, centerY);
            this._ctx.scale(zoom, zoom);
            this._ctx.translate(-centerX, -centerY);
        }

        entity.render(this._ctx);

        this._ctx.restore();
    }
}

/**
 * 
 */
class Camera extends Body {
    constructor(x=0, y=0, w=0, h=0) {
        super(x, y, w, h);

        this.zoom = 1;
    }
}

let coordinatePath = "./assets/images/coordinates.png";

Preloader.complete = ()=> {
    let camera = new Camera(0, 0, 400, 400);
    camera.zoom = 2;
    let canvas = new Canvas(document.getElementById("sw"), camera);
    let bg = new Sprite(0, 0, 400, 400).setImage(coordinatePath);
    let rect = new Rectangle(300, 0, 100, 100);

    canvas.render(bg);
    canvas.render(rect);
}

Preloader.load(coordinatePath);
