/**
 * A point that passes its transforms to its children
 *
 * @class Group
 */
import Point from './Point';

export default class Group extends Point {
    constructor() {
        super();

        this._children = [];
    }

    addChild(item) {
        this._children.push(item);
    }

    getChildren() {
        return this._children;
    }

    render(parentX, parentY, children) {
        if (children === undefined) {
            children = [];
        }

        let globalX = this._x + (parentX || 0);
        let globalY = this._y + (parentY || 0);

        children.push(this);

        for(let item of this._children) {
            item.render(globalX, globalY, children);
        }

        return children;
    }
}
