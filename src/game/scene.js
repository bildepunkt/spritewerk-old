SW.Scene = (function() {
    'use strict';

    /**
     * manages layers and their entities
     *
     * @class SW.Scene
     * @param {Object} [options]
     * @param {Object} options.assets - a hash of names and src paths for images and audio files
     * @listens SW.Signal#press
     * @listens SW.Signal#dblpress
     * @listens SW.Signal#pressdown
     * @listens SW.Signal#pressup
     * @listens SW.Signal#dragstart
     * @listens SW.Signal#drag
     * @listens SW.Signal#dragend
     * @requires SW.Collection
     * @belongsto SW
     */
    var Scene = function(options) {
        options = options || {};

        /**
         * @member {SW.Collection} SW.Scene.prototype._layers
         * @private
         */
        this._layers = new SW.Collection();

        /**
         * @member {String} SW.Scene.prototype._bgColor
         * @private
         */
        this._bgColor = options.bgColor || '#ddd';

        /**
         * @member {String} SW.Scene.prototype._assets
         * @private
         */
        this._assets = options.assets;
    };

    /**
     * @method SW.Scene.prototype.getBgColor
     */
    Scene.prototype.getBgColor = function(value) {
        return this._bgColor;
    };

    /**
     * @method SW.Scene.prototype.setBgColor
     */
    Scene.prototype.setBgColor = function(value) {
        this._bgColor = value;

        return this;
    };

    /**
     * @method SW.Scene.prototype.getLayers
     * @return {SW.Collection}
     */
    Scene.prototype.getLayers = function() {
        return this._layers;
    };

    /**
     * gets assets
     *
     * @method SW.Scene.prototype.getAssets
     * @return {Array}
     */
    Scene.prototype.getAssets = function() {
        return this._assets;
    };

    /**
     * sets assets
     *
     * @method SW.Scene.prototype.setAssets
     * @param {Object} value
     * @return {SW.Scene}
     * @chainable
     */
    Scene.prototype.setAssets = function(value) {
        this._assets = value;

        return this;
    };

    /**
     * initialization method; for all setup work related to this scene; called when scene is first added to {@link SW.SceneManager}
     *
     * @method SW.Scene.prototype.init
     */
    Scene.prototype.init = function() {};

    /**
     * called on every frame; for updating all entity properties
     *
     * @method SW.Scene.prototype.update
     */
    Scene.prototype.update = function() {};

    /**
     * called when a scene is removed from {@link SW.SceneManager}; for removal of event listeners
     * @method SW.Scene.prototype.destroy
     */
    Scene.prototype.destroy = function() {};

    /**
     * the scene's press event handler
     *
     * @method SW.Scene.prototype.press
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.press = function() {};

    /**
     * the scene's dblpress event handler
     *
     * @method SW.Scene.prototype.dblpress
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.dblpress = function() {};

    /**
     * the scene's pressdown event handler
     *
     * @method SW.Scene.prototype.pressdown
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.pressdown = function() {};

    /**
     * the scene's pressup event handler
     *
     * @method SW.Scene.prototype.pressup
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.pressup = function() {};

    /**
     * the scene's dragstart event handler
     *
     * @method SW.Scene.prototype.dragstart
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.dragstart = function() {};

    /**
     * the scene's drag event handler
     *
     * @method SW.Scene.prototype.drag
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.drag = function() {};

    /**
     * the scene's dragend event handler
     *
     * @method SW.Scene.prototype.dragend
     * @param {object} event {@link SW.Input#_receiveEvent}
     */
    Scene.prototype.dragend = function() {};

    return Scene;
}());