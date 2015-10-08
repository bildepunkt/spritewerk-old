/**
 * @class
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _MathPlus = require('./MathPlus');

var _MathPlus2 = _interopRequireDefault(_MathPlus);

var DebugRenderer = (function () {
    function DebugRenderer(deps) {
        _classCallCheck(this, DebugRenderer);

        this._deps = deps;

        this._context = this._deps.viewport.getContext();

        this._displaySize = 12;
        this._items = [];
    }

    _createClass(DebugRenderer, [{
        key: '_getRandRGB',
        value: function _getRandRGB() {
            return {
                r: _MathPlus2['default'].clamp(Math.round(Math.random() * 255), 64, 191),
                g: _MathPlus2['default'].clamp(Math.round(Math.random() * 255), 64, 191),
                b: _MathPlus2['default'].clamp(Math.round(Math.random() * 255), 64, 191)
            };
        }
    }, {
        key: 'watch',
        value: function watch(list) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var rgb = this._getRandRGB();

                    this._items.push({
                        name: item.name,
                        entity: item.entity,
                        rgb: 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')'
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var size = this._displaySize;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    var x = item.entity.getGlobalX();
                    var y = item.entity.getGlobalY();
                    var rotation = item.entity.getRotation();

                    this._context.save();

                    if (rotation) {
                        this._context.translate(x, y);
                        this._context.rotate(rotation * Math.PI / 180);

                        x = 0;
                        y = 0;
                    }

                    this._context.strokeStyle = item.rgb;
                    this._context.fillStyle = item.rgb;

                    var crosshair = new Path2D();
                    crosshair.moveTo(x, y - size / 2);
                    crosshair.lineTo(x, y + size / 2);
                    crosshair.moveTo(x - size / 2, y);
                    crosshair.lineTo(x + size / 2, y);
                    crosshair.closePath();
                    this._context.stroke(crosshair);

                    this._context.fillText(item.name, x + size, y + size);
                    this._context.restore();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return DebugRenderer;
})();

exports['default'] = DebugRenderer;
module.exports = exports['default'];