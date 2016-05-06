import Collection from './Collection';

/**
 * Provides a transformation hierarchy for {@link Collection}s
 * @class   Group
 * @extends Collection
 */
export default class Group extends Collection {
    constructor() {
        super();
    }

    /**
     * Renders all children recursively. Will be called by {@link Canvas}
     * @method Group#render
     * @param  {CanvasRenderingContext2D} context The 2d context object
     * @param  {Float}                    factor  The 0-1 range of time passed between frames
     */
    render(context, factor) {
        context.save();

        this.each((item)=> {
            item.render(context, factor);
        }, this);

        context.restore();
    }
}