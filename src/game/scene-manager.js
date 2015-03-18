SW.SceneManager = (function() {
    'use strict';

    /**
     * manages scenes
     *
     * @class SW.SceneManager
     * @extends SW.Collection
     * @requires SW.Util
     * @requires SW.MediaManager
     * @listens SW.Signal#preload/complete
     * @belongsto SW
     * @singleton
     */
    var SceneManager = function() {
        var eventType;

        SW.Collection.call(this);

        /**
         * name of the scene currently being loaded
         *
         * @member SW.SceneManager.prototype._loadingName
         * @private
         */
        this._loadingName = null;

        /**
         * the scene currently being loaded
         *
         * @member SW.SceneManager.prototype._loadingScene
         * @private
         */
        this._loadingScene = null;

        /**
         * the SW input event types
         *
         * @member SW.SceneManager.prototype._eventTypes
         * @private
         */
        this._eventTypes = ['press', 'dblpress', 'pressdown', 'pressup', 'dragstart', 'drag', 'dragend'];

        // bind input events
        for(var i = 0, len = this._eventTypes.length; i < len; i += 1) {
            eventType = this._eventTypes[i];
            SW.Signal.addListener(eventType, this._handleEvents, this);
        }

        SW.Signal.addListener('preload/complete', this._onPreloadComplete, this);
    };

    SceneManager.prototype = SW.Util.clone(SW.Collection.prototype);

    /**
     * SW input event handler to dispatch to current scene (with SW event data as event param)
     *
     * @method SW.SceneManager.prototype._handleEvents
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
     * @method SW.SceneManager.prototype.addScene
     * @param {String} name
     * @param {SW.Scene} Scene
     * @private
     */
    SceneManager.prototype.addScene = function(name, Scene) {
        var scene = new Scene();
        var assets = scene.assets();

        this._loadingName = name;
        this._loadingScene = scene;

        if (SW.Util.hasMembers(assets)) {
            SW.MediaManager.preload(assets);
        } else {
            this._onPreloadComplete();
        }
    };

    /**
     * gets/sets the active scene
     *
     * @method SW.SceneManager.prototype.activeScene
     * @param {String} [name]
     * @fires SW.Signal#scene/activated
     * @return {SW.Scene|SW.SceneManager}
     * @private
     * @chainable
     */
    SceneManager.prototype.activeScene = function(name) {
        var lastIndex = this.getItemCount() - 1;

        if (name === undefined) {
            return this.getItemAt(lastIndex);
        }

        if (typeof name === 'string') {
            this.setItemIndex(name, lastIndex);

            /**
             * @event SW.Signal#scene/activated
             */
            SW.Signal.dispatch('scene/activated', {
                scene: this.getItemAt(lastIndex)
            });
        }

        return this;
    };

    /**
     * finishes adding scene after preload
     *
     * @method SW.SceneManager.prototype._onPreloadComplete
     * @fires SW.Signal#scene/activated
     * @private
     */
    SceneManager.prototype._onPreloadComplete = function() {
        var eventType;

        this.addItem(this._loadingName, this._loadingScene);

        this._loadingScene.init();

        SW.Signal.dispatch('scene/activated', {
            scene: this._loadingScene
        });

        // remove references for GC (in case no more scenes added and this scene removed)
        this._loadingName = null;
        this._loadingScene = null;
    };

    return new SceneManager();
}());