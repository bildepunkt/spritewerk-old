SW.Movable = (function() {
    /**
     * the base movable object
     *
     * @class SW.Movable
     * @extends SW.Base
     * @belongsto SW
     */
    var Movable = function() {
        /**
         * @member {integer} SW.Movable.prototype.x
         * @default 0
         * @private
         */
        this.x = 0;

        /**
         * @member {integer} SW.Movable.prototype.y
         * @default 0
         * @private
         */
        this.y = 0;

        /**
         * @member {integer} SW.Movable.prototype.vx
         * @default 0
         * @private
         */
        this.vx = 0;

        /**
         * @member {integer} SW.Movable.prototype.vx
         * @default 0
         * @private
         */
        this.vy = 0;
    };

    Movable.prototype = new SW.Base();

    /**
     * @method SW.Movable.prototype.update
     */
    Movable.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
    };

    return Movable;
}());