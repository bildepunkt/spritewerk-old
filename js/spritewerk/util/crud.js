/**
 * An observable object with CRUD capabilities -using localStorage by default- on persistant data
 *
 * @class Crud
 * @extends Observable
 */
define([
    './config',
    './observable'
], function(config, Observable) {
    return Observable.extend({
        protosName: 'saveLoad',

        init: function() {
            this.$observable.init.call(this);
        },

        /**
         * Write data to localStorage
         *
         * @method SaveLoad.prototype.save
         */
        save: function() {
            localStorage.setItem(config.uglyTitle, JSON.stringify(this.data));
        },

        /**
         * Read data to localStorage
         *
         * @method SaveLoad.prototype.load
         */
        load: function() {
            this.data = JSON.parse(localStorage.getItem(config.uglyTitle));
        },

        /**
         * Clear all data from localStorage
         *
         * @method SaveLoad.prototype.clear
         */
        clear: function() {
            localStorage.removeItem(config.uglyTitle);
            this.data = {};
        }
    });
});