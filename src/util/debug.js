import color from './color';

/**
 * @class debug
 */
const debug = {
    options: {
        xhairSize: 16
    },

    elements: {
        fps: null
    },

    types: {
        XHAIR: 'XHAIR'
    },

    _showingFPS: false,
    _ticksInSecond: 0,
    _fpsInterval: null,

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
    },

    toggleFPS: function (override) {
        this.elements.fps = this.elements.fps || document.getElementById('fps');
        this._boundOnTick = this._boundOnTick || this._onTick.bind(this);

        if (this._showingFPS) {
            this._showingFPS = false;
            document.removeEventListener('tick', this._boundOnTick, false);
            clearInterval(this._fpsInterval);
        } else {
            this._showingFPS = true;
            document.addEventListener('tick', this._boundOnTick, false);

            // TODO add tick handler to finish this
            this._fpsInterval = setInterval(function () {
                this.elements.fps.innerHTML = this._ticksInSecond;
                this._ticksInSecond = 0;
            }, 1000);
        }
    }
};

export default debug;
