import Scene from "../Scene";

/**
 * The base class for states. Handles a small amount of boilerplating.
 * @class State
 */
export default class State {
    constructor(spritewerk) {
        this.preload = [];
        this.spritewerk = spritewerk;
        this.items = new Group();
        this.scene = new Scene();
        this.bgColor = "#FFF";
    }

    destroy() {}

    init() {}

    render(context) {
        this.scene.startRender(context);
    }

    update(factor) {
        this.scene.update(factor);
    }
}