import color from './color';

/**
 * @class debug
 */
const debug = {
    options: {
        xhairSize: 16
    },

    types: {
        XHAIR: 'XHAIR'
    },

    render: function (type, context, entity) {
        context.save();

        switch (type) {
            case this.types.XHAIR:
            const size = this.options.xhairSize;
            context.fillStyle = color.getRandRGB();
            context.translate(entity.getX() + entity.getPivotX(), entity.getY() + entity.getPivotY());
            context.fillRect(-(size / 2), 0, size, 1);
            context.fillRect(0, -(size / 2), 1, size);
            break;
            default: break;
        }

        context.restore();
    }
};

export default debug;
