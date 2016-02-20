'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class   Bitmap
 * @extends Sprite
 * @desc    A sprite that renders an image asset
 * @author  Chris Peters
 */

var Bitmap = function (_Sprite) {
    _inherits(Bitmap, _Sprite);

    function Bitmap() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Bitmap);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bitmap).call(this, x, y));

        _this._image = null;
        _this._tiling = 'no-repeat';
        return _this;
    }

    _createClass(Bitmap, [{
        key: 'update',
        value: function update(xform) {
            var matrix = xform.getMatrix();

            this._globalX = matrix[4];
            this._globalY = matrix[5];
            this._globalScaleX = matrix[0];
            this._globalScaleY = matrix[3];
        }

        /**
         * Render the entity via context's drawImage
         *
         * @method Bitmap#render
         * @param  {Object} context The context object
         */

    }, {
        key: 'render',
        value: function render(context) {
            context.save();

            if (this._tiling != 'no-repeat') {
                var pattern = context.createPattern(this._image, this._tiling);
                context.rect(this._getActualX(), this._getActualY(), this._width * this._getActualScaleX(), this._height * this._getActualScaleY());
                context.fillStyle = pattern;
                context.fill();
            } else {
                context.drawImage(this._image, this._srcX, this._srcY, this._srcWidth, this._srcHeight, this._getGlobalX(), this._getGlobalY(), this._width * this._getActualScaleX(), this._height * this._getActualScaleY());
            }

            context.restore();
        }

        /**
         * Set the iamge to render and sets dimensions if not set
         *
         * @method Bitmap#setImage
         * @param  {String} path The image path
         * @return {Bitmap}
         */

    }, {
        key: 'setImage',
        value: function setImage(path) {
            this._image = new Image();
            this._image.src = path;

            if (!this._srcWidth && !this._srcWidth) {
                this._srcWidth = this._image.width;
                this._srcHeight = this._image.height;
            }

            if (!this._width && !this._height) {
                this._width = this._image.width;
                this._height = this._image.height;
            }

            return this;
        }

        /**
         * Choose how to tile the image. Can be <code>repeat</code>, <code>repeat-x</code>
         * <code>repeat-y</code> or <code>no-repeat</code>. Default is <code>no-repeat</code>.
         *
         * @method Bitmap#setTiling
         * @param  {String} val The tiling value
         * @return {Bitmap}
         */

    }, {
        key: 'setTiling',
        value: function setTiling(val) {
            this._tiling = val;

            return this;
        }
    }]);

    return Bitmap;
}(_Sprite3.default);

exports.default = Bitmap;