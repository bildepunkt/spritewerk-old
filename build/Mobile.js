'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Mobile
 * @description A class with helpers for making the application play nice with mobile browsers
 * @author      Chris Peters
 */

var Mobile = function () {
    function Mobile() {
        _classCallCheck(this, Mobile);
    }

    _createClass(Mobile, null, [{
        key: 'addMetaTags',

        /**
         * [addMetaTags description]
         * @method Mobile.addMetaTags
         * @param  {Object} doc [description]
         */
        value: function addMetaTags() {
            var doc = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

            var head = doc.head;
            var meta = doc.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, user-scalable=no, ' + 'initial-scale=1, maximum-scale=1, user-scalable=0';
            head.appendChild(meta);

            meta = doc.createElement('meta');
            meta.name = 'apple-mobile-web-app-capable';
            meta.content = 'yes';
            head.appendChild(meta);

            meta = doc.createElement('meta');
            meta.name = 'mobile-web-app-capable';
            meta.content = 'yes';
            head.appendChild(meta);
        }
    }]);

    return Mobile;
}();

exports.default = Mobile;