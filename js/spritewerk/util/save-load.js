/**
 * An observable object with CRUD capabilities -using localStorage- on persistant data
 * @package Core
 * @class   SaveLoad
 * @extends Overt
 */
define([
    './observable'
], function(Observable) {
    return Observable.extend({
        name: 'saveLoad',

        init: function() {
            this.$overt.init.call(this);
        },

        /**
         * Write data to localStorage
         *
         * @method SaveLoad.prototype.save
         */
        save: function() {
            localStorage.setItem(config.title, JSON.stringify(this.data));
        },

        /**
         * Read data to localStorage
         *
         * @method SaveLoad.prototype.load
         */
        load: function() {
            this.data = JSON.parse(localStorage.getItem(config.title));
        },

        /**
         * Clear all data from localStorage
         *
         * @method SaveLoad.prototype.clear
         */
        clear: function() {
            localStorage.removeItem(config.title);
            this.data = {};
        }
    });
});