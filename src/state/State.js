import Scene from "../Scene";

/**
 * The base class for states. Handles a small amount of boilerplating.
 * @class State
 */
export default class State {
    constructor(spritewerk) {
        this.preload = [];
        this.spritewerk = spritewerk;
        this.stage = new Group();
        this.scene = new Scene();
        this.bgColor = "#FFF";
    }

    destroy() {}

    init() {}

    render() {
        this.scene.startRender(this);
    }

    update(factor) {
        this.scene.update(this, factor);
    }
}