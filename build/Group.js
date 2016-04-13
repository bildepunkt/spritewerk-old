'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection2 = require('./Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

var _Sprite = require('./Sprite');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class       Group
 * @description Provides a transformation hierarchy for {@link Collection}s
 * @extends     Collection
 * @requires    Sprite
 * @author      Chris Peters
 *
 */

var Group = function (_Collection) {
    _inherits(Group, _Collection);

    function Group() {
        _classCallCheck(this, Group);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Group).call(this));
    }

    /**
     * Renders all children recursively on top of own transformation stack
     *
     * @method Group#render
     * @param  {Object} context The 2d context object
     */


    _createClass(Group, [{
        key: 'render',
        value: function render(context, factor, ticks) {
            context.save();

            this.each(function (item) {
                item.render(context, factor, ticks);
            }, this);

            context.restore();
        }
    }]);

    return Group;
}(_Collection3.default);

exports.default = Group;