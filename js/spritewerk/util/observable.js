/**
 * An observable object that emits events when changed
 *
 * @class Observable
 */
define([
    '../lib/protos',
    '../lib/radio'
], function(Protos, radio) {
    return Protos.extend({
        /** 
         * @member {string} Event.prototype.name - the unique name necessary for proto's inheritance
         */
        name: 'observable',

        data: {},

        init: function() {
            this.el = document.createElement('div');
            this.el.id = this.name + this._uid;
            document.getElementsByTagName('body')[0].appendChild(this.el);
        },

        /**
         * Adds a listener to this object
         *
         * @method Event.prototype.listen
         * @param {string} type - the event type
         * @param {function} handler - the event handler
         * @param {object} [context] - the scope the handler will be executed in
         */
        listen: function(type, handler, context) {
            radio.tuneIn(this.el, type, handler, context);
        },

        /**
         * Removes a listener from this object
         *
         * @method Event.prototype.ignore
         * @param {string} type - the event type
         * @param {function} handler - the event handler
         */
        ignore: function(type, handler) {
            radio.tuneOut(this.el, type, handler);
        },

        /**
         * Triggers an event from this object
         *
         * @method Event.prototype.announce
         * @param {string} type - the event type
         * @param {object} [data] - data to pass along with the event
         */
        announce: function(type, data) {
            radio.broadcast(this.el, type, data);
        },

        /**
         * @method Overt.prototype.set
         * @param {object} pairs - key/val pairs to set
         * @param {object} options - 
         */
        set: function(obj, options) {
            var old = {},
                prop;

            for (prop in obj) {
                old[prop] = this.data[prop];
                this.data[prop] = obj[prop];
                this.announce('change', {
                    'key': prop,
                    'oldValue': old[prop],
                    'newValue': obj[prop]
                });
            }
        },

        /**
         * @method Overt.prototype.get
         * @param {string} prop - the property
         * @returns {any} property
         */
        get: function(prop) {
            return this.data[prop];
        }
    });
});