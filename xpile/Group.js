"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Group
 */

var Group = function () {
    function Group() {
        _classCallCheck(this, Group);

        this.items = [];
    }

    /**
     * Add an item with optional name
     * @method Group#add
     * @param  {Any}    item The item to add
     * @param  {String} [name=""] The optional name of the item
     */


    _createClass(Group, [{
        key: "add",
        value: function add(item) {
            var name = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.items.push({
                item: item, name: name
            });
        }

        /**
         * Add an item at a given index
         * @method Group#addAt
         * @param  {Integer} index The index to add the item
         * @param  {Any}     item The item to add
         * @param  {String}  [name=""] The optional name of the item
         */

    }, {
        key: "addAt",
        value: function addAt(index, item) {
            var name = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            if (index > this.getCount()) {
                this.add(item, name);
            } else {
                this.items.splice(index, 0, {
                    item: item, name: name
                });
            }
        }

        /**
         * Add multiple items
         * @method Group#addMany
         * @param  {...Object} items An object containing item and optional name. eg: <code>{item: someItem, name: "someName"}</code>
         */

    }, {
        key: "addMany",
        value: function addMany() {
            for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
                items[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this.add(item.item, item.name);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * Iterates the collection's sorted items. The item, index, and name are supplied
         * to the provided function
         * @method Collection#each
         * @param {Function} fn      The function to execute on the iterable
         * @param {Object}   [scope] The scope with which to execute the function
         */

    }, {
        key: "each",
        value: function each(fn, scope) {
            fn = scope ? fn.bind(scope) : fn;

            for (var i = 0, len = this.getCount(); i < len; i++) {
                var item = this.items[i];
                var doContinue = void 0;

                // if item on last item and an item is removed
                if (!item) {
                    break;
                }

                doContinue = fn(item.item, item.name, i);

                if (doContinue === false) {
                    break;
                }
            }
        }

        /**
         * Returns an object at a given index
         * @method Group#getAt
         * @param  {Integer} index The index
         * @return {Any}
         */

    }, {
        key: "getAt",
        value: function getAt(index) {
            return this.items[index].item;
        }

        /**
         * Returns an object by name
         * @method Group#getBy
         * @param  {String} name The name
         * @return {Any}
         */

    }, {
        key: "getBy",
        value: function getBy(name) {
            for (var i = 0, len = this.getCount(); i < len; i++) {
                var item = this.items[i];
                if (item.name === name) {
                    return item.item;
                }
            }
        }

        /**
         * Returns the count of items in group
         * @method Group#getCount
         * @return {Integer}
         */

    }, {
        key: "getCount",
        value: function getCount() {
            return this.items.length;
        }

        /**
         * Removes an item by name
         * @method Group#removeBy
         * @param  {String} name The item's name
         * @return {Any}
         */

    }, {
        key: "removeBy",
        value: function removeBy(name) {
            for (var i = 0, len = this.getCount(); i < len; i++) {
                var item = this.items[i];
                if (item.name === name) {
                    this.items.splice(i, 1);
                    break;
                }
            }
        }

        /**
         * Removes all items
         * @method Group#removeAll
         */

    }, {
        key: "removeAll",
        value: function removeAll() {
            this.items = [];
        }
    }, {
        key: "removeAt",
        value: function removeAt(index) {
            this.items.splice(index, 1);
        }
    }, {
        key: "removeBy",
        value: function removeBy(name) {
            for (var i = 0, len = this.getCount(); i < len; i++) {
                var item = this.items[i];
                if (item.name === name) {
                    this.items.splice(i, 1);
                    break;
                }
            }
        }
    }]);

    return Group;
}();

exports.default = Group;