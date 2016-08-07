import Collection from "./Collection";
import Sprite from "./Sprite";

export default class Group extends Sprite {
    constructor (x, y, w, h) {
        super(x, y, w, h);

        this.isGroup = true;
        this.items = new Collection();
    }
}
