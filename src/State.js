import Group from "./Group";

/**
 * The base class for states. Handles a small amount of boilerplating.
 * @class State
 */
export default class State {
    constructor(game) {
        this.preload = [];
        this.game = game;
        this.stage = new Group();
    }

    destroy() {}

    init() {}

    render(context) {
        this.stage.render(context);
    }

    update(factor) {}
}
