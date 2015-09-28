/**
 * A point that passes its transforms to its children
 *
 * @class Group
 */
import Point from './Point';
import Sprite from './Sprite';

export default class Group extends Point {
    constructor() {
        super();

        this._renderable = [];
        this._groups = [];
    }

    addChild(child) {
        child.setParentX(this.getGlobalX()).setParentY(this.getGlobalY());

        if (child instanceof Sprite) {
            this._renderable.push(child);
        } else if (child instanceof Group) {
            this._groups.push(child);
        }
    }

    getChildren() {
        return this._renderable.concat(this._groups);
    }

    setParentX(val) {
        this._parentX = val;

        var globalX = this.getGlobalX();

        for(let child of this._renderable) {
            child.setParentX(globalX);
        }

        for(let child of this._groups) {
            child.setParentX(globalX);
        }

        return this;
    }

    setParentY(val) {
        this._parentY = val;

        var globalY = this.getGlobalY();

        for(let child of this._renderable) {
            child.setParentY(globalY);
        }

        for(let child of this._groups) {
            child.setParentY(globalY);
        }

        return this;
    }

    setX(val) {
        this._x = val;

        var globalX = this.getGlobalX();

        for(let child of this._renderable) {
            child.setParentX(globalX);
        }

        for(let child of this._groups) {
            child.setParentX(globalX);
        }

        return this;
    }

    setY(val) {
        this._y = val;

        var globalY = this.getGlobalY();

        for(let child of this._renderable) {
            child.setParentY(globalY);
        }

        for(let child of this._groups) {
            child.setParentY(globalY);
        }

        return this;
    }
}
