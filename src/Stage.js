import Group from "./Group";

/**
 * @class Stage
 */
export default class Stage extends Group {
    constructor () {
        super();
    }

    render (context, xform) {
        this.each((entity)=> {
            entity.render(context, xform);
        }, this);
    }
}
