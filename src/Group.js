import Collection from "./Collection";
import Sprite from "./Sprite";

/**
 * Composes Sprite and Collection
 * @class Group
 * @requires Collection
 * @requires Sprite
 */
export default class Group {
    constructor () {
        /**
         * @member {Collection} Group#collection - The group's collection
         */
        this.collection = new Collection();
        /**
         * @member {Sprite} Group#sprite - The group's display object
         */
        this.sprite = new Sprite();
        /**
         * @member {Boolean} Group#isGroup - Denote's the object as a group
         */
        this.isGroup = true;
    }
}
