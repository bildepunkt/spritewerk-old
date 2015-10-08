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
        this._unnamedCount = 0;
    }

    _setChildsParentX(globalX) {
        for(let child of this._renderable) {
            child.val.setParentX(globalX);
        }

        for(let child of this._groups) {
            child.val.setParentX(globalX);
        }
    }

    _setChildsParentY(globalY) {
        for(let child of this._renderable) {
            child.val.setParentY(globalY);
        }

        for(let child of this._groups) {
            child.val.setParentY(globalY);
        }
    }

    _setChildsRotation(angle) {
        for(let child of this._renderable) {
            child.val.setRotation(angle);
        }

        for(let child of this._groups) {
            child.val.setRotation(angle);
        }
    }

    addChild(child, name) {
        name = name || 'child' + this._unnamedCount++;

        child
            .setParentX(this.getGlobalX())
            .setParentY(this.getGlobalY());

        if (child instanceof Sprite) {
            this._renderable.push({
                key: name,
                val: child
            });
        } else if (child instanceof Group) {
            this._groups.push({
                key: name,
                val: child
            });
        }
    }

    getChild(name) {
        return this._renderable.filter(function (child) {
            return child.key === name;
        }) ||
        this._groups.filter(function (child) {
            return child.key === name;
        });
    }

    getChildren() {
        let renderable = this._renderable.map(function (child) {
            return child.val;
        });
        let groups = this._groups.map(function (child) {
            return child.val;
        });

        return renderable.concat(groups);
    }

    getRotation() {
        return this._rotation;
    }

    setParentX(val) {
        this._parentX = val;

        this._setChildsParentX(this.getGlobalX());

        return this;
    }

    setParentY(val) {
        this._parentY = val;

        this._setChildsParentY(this.getGlobalY());

        return this;
    }

    setRotation(angle) {
        this._rotation = angle;

        this._setChildsRotation(this._rotation);

        return this;
    }

    setX(val) {
        this._x = val;

        this._setChildsParentX(this.getGlobalX());

        return this;
    }

    setY(val) {
        this._y = val;

        this._setChildsParentY(this.getGlobalY());

        return this;
    }
}
