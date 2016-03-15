import Collection from './Collection';
import Sprite from './Sprite';

/**
 * @class       Group
 * @description Provides a transformation hierarchy for {@link Collection}s
 * @extends     Collection
 * @requires    Sprite
 * @author      Chris Peters
 *
 */
export default class Group extends Collection {
    constructor() {
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
