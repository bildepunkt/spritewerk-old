import Collection from './Collection';
import Sprite from './Sprite';

/**
 * @class       Group
 * @description Provides a transformation hierarchy for {@link Collection}s
 * @extends     Collection
 * @requires    Sprite
 * @author      Chris Peters
 *
 * @param {Integer} [x] The initial x position. Default is 0.
 * @param {Integer} [y] The initial y position. Default is 0.
 */
export default class Group extends Collection {
    constructor(x = 0, y = 0) {
        super();
    }

    /**
     * Renders all children recursively on top of own transformation stack
     *
     * @method Group#render
     * @param  {Object} context The 2d context object
     */
    render(context) {
        context.save();

        this.each((item)=> {
            item.render(context);
        }, this);

        context.restore();
    }
}
