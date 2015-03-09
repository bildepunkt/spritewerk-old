SW.Game.SceneManager = (function() {
    'use strict';

    /**
     * manages scenes
     *
     * @class SW.Game.SceneManager
     * @extends SW.Common.Collection
     * @requires SW.Common.Util
     * @requires SW.Media.MediaManager
     * @listens SW.Events.Signal#preload/complete
     * @belongsto SW.Game
     */
    var SceneManager = function() {
        var eventType;

        SW.Common.Collection.call(this);

        /**
         * name of the scene currently being loaded
         *
         * @member SW.Game.SceneManager.prototype._loadingName
         * @private
         */
        this._loadingName = null;

        /**
         * the scene currently being loaded
         *
         * @member SW.Game.SceneManager.prototype._loadingScene
         * @private
         */
        this._loadingScene = null;

        /**
         * the SW input event types
         *
         * @member SW.Game.SceneManager.prototype._eventTypes
         * @private
         */
        this._eventTypes = ['press', 'dblpress', 'pressdown', 'pressup', 'dragstart', 'drag', 'dragend'];

        // bind input events
        for(var i = 0, len = this._eventTypes.length; i < len; i += 1) {
            eventType = this._eventTypes[i];
            SW.Events.Signal.addListener(eventType, this._handleEvents, this);
        }

        SW.Events.Signal.addListener('preload/complete', this._onPreloadComplete, this);
    };

    SceneManager.prototype = SW.Common.Collection.prototype;

    /**
     * SW input event handler to dispatch to current scene (with SW event data as event param)
     *
     * @method SW.Game.SceneManager.prototype._handleEvents
     * @param {DOMEvent} event
     * @private
     */
    SceneManager.prototype._handleEvents = function(e) {
        var swEvent = e.detail;
        var activeScene = this.activeScene();

        activeScene[swEvent.type](swEvent);
    };

    /**
     * preloads scene's assets (if any), adds scene to stack, calls scene's init()
     *
     * @method SW.Game.SceneManager.prototype.addScene
     * @param {String} name
     * @param {SW.Game.Scene} Scene
     * @private
     */
    SceneManager.prototype.addScene = function(name, Scene) {
        var scene = new Scene();
        var assets = scene.assets();

        this._loadingName = name;
        this._loadingScene = scene;

        if (SW.Common.Util.hasMembers(assets)) {
            SW.Media.MediaManager.preload(assets);
        } else {
            this._onPreloadComplete();
        }
    };

    /**
     * gets/sets the active scene
     *
     * @method SW.Game.SceneManager.prototype.activeScene
     * @param {String} [name]
     * @fires SW.Events.Signal#scene/activated
     * @return {SW.Game.Scene|SW.Game.SceneManager}
     * @private
     * @chainable
     */
    SceneManager.prototype.activeScene = function(name) {
        var lastIndex = this.getItemCount() - 1;

        if (name === undefined) {
            return this._sortedItems[lastIndex];
        }

        if (typeof name === 'string') {
            this.setItemIndex(name, lastIndex);

            SW.Events.Signal.dispatch('scene/activated', {
                scene: this._sortedItems[lastIndex]
            });
        }

        return this;
    };

    /**
     * finishes adding scene after preload
     *
     * @method SW.Game.SceneManager.prototype._onPreloadComplete
     * @fires SW.Events.Signal#scene/activated
     * @private
     */
    SceneManager.prototype._onPreloadComplete = function() {
        var eventType;

        this.addItem(this._loadingName, this._loadingScene);

        SW.Events.Signal.dispatch('scene/activated', {
            scene: this.loadingScene
        });

        this._loadingScene.init();

        // remove references for GC (in case no more scenes added and this scene removed)
        this._loadingName = null;
        this._loadingScene = null;
    };

    return new SceneManager();
}());