SW.Scenes.Scene = (function() {
    'use strict';

    /**
     * manages layers and their entities
     *
     * @class SW.Scenes.Scene
     * @extends SW.Common.Collection
     * @param {Object} [options]
     * @param {Object} options.assets - a hash of names and src paths for images and audio files
     * @listens SW.Events.Signal#press
     * @listens SW.Events.Signal#dblpress
     * @listens SW.Events.Signal#pressdown
     * @listens SW.Events.Signal#pressup
     * @listens SW.Events.Signal#dragstart
     * @listens SW.Events.Signal#drag
     * @listens SW.Events.Signal#dragend
     * @requires SW.Display.Layer
     * @belongsto SW.Scenes
     */
    var Scene = function(options) {
        SW.Common.Util.inherit(this, SW.Common.Collection);

        options = options || {};

        /**
         * @member {String} SW.Scenes.Scene.prototype._bgColor
         * @private
         */
        this._bgColor = null;

        /**
         * @member {String} SW.Scenes.Scene.prototype._assets
         * @private
         */
        this._assets = options.assets;

        /**
         * the collection of {@link SW.Scenes.Layer} objects
         * @member {String} SW.Scenes.Scene.prototype._items
         * @private
         */
    };

    /**
     * initialization method; for all setup work related to this scene; called when scene is first added to {@link SW.Scenes.SceneManager}
     * @method SW.Scenes.Scene.prototype.init
     */
    Scene.prototype.init = function() {};

    /**
     * called on every frame; for updating all entity properties
     * @method SW.Scenes.Scene.prototype.update
     */
    Scene.prototype.update = function() {};

    /**
     * called when a scene is removed from {@link SW.Scenes.SceneManager}; for removal of event listeners
     * @method SW.Scenes.Scene.prototype.destroy
     */
    Scene.prototype.destroy = function() {};

    /**
     * the scene's press event handler
     *
     * @method SW.Scenes.Scene.prototype.press
     * @param {object} event {@link SW.Events.Input#_receiveEvent}
     */
    Scene.prototype.press = function() {};

    /**
     * the scene's dblpress event handler
     *
     * @method SW.Scenes.Scene.prototype.dblpress
     * @param {object} event {@link SW.Events.Input#_receiveEvent}
     */
    Scene.prototype.dblpress = function() {};

    /**
     * the scene's pressdown event handler
     *
     * @method SW.Scenes.Scene.prototype.pressdown
     * @param {object} event {@link SW.Events.Input#_receiveEvent}
     */
    Scene.prototype.pressdown = function() {};

    /**
     * the scene's pressup event handler
     *
     * @method SW.Scenes.Scene.prototype.pressup
     * @param {object} event {@link SW.Events.Input#_receiveEvent}
     */
    Scene.prototype.pressup = function() {};

    /**
     * the scene's dragstart event handler
     *
     * @method SW.Scenes.Scene.prototype.dragstart
     * @param {object} event {@link SW.Events.Input#_receiveEvent}
     */
    Scene.prototype.dragstart = function() {};

    /**
     * the scene's drag event handler
     *
     * @method SW.Scenes.Scene.prototype.drag
     * @param {object} event {@link SW.Events.Input#_receiveEvent}
     */
    Scene.prototype.drag = function() {};

    /**
     * the scene's dragend event handler
     *
     * @method SW.Scenes.Scene.prototype.dragend
     * @param {object} event {@link SW.Events.Input#_receiveEvent}
     */
    Scene.prototype.dragend = function() {};

    /**
     * gets/sets assets
     *
     * @method SW.Scenes.Scene.prototype.assets
     * @param {Object} [value]
     * @return {Boolean|SW.Scenes.Scene}
     * @chainable
     */
    Scene.prototype.assets = function(value) {
        if (value === undefined) {
            return this._assets;
        }

        if (typeof value === 'object') {
            this._assets = value;
        }

        return this;
    };

    return Scene;
}());