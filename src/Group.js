import Collection from "./Collection";
import Sprite from "./Sprite";

function groupFactory () {
    let proto = Object.assign({}, Collection.prototype, Sprite.prototype);
    let Group = function () {};
    let group;
    
    Group.prototype = proto;
    Group.constructor = Sprite;
    Group.prototype.render = function (context, xform) {
        Sprite.prototype.render.call(this, context, xform);

        if (this.opacity !== 1) {
            context.globalAlpha *= this.opacity;
        }
    }

    group = new Group();
    
    return Object.assign(group, new Collection(), new Sprite());
}

export default function Group () {
    return groupFactory();
}
