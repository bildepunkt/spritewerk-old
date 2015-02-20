/**
 * CustomEvent polyfill
 */
CustomEvent = window.CustomEvent ||
function( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
};
CustomEvent.prototype = window.Event.prototype;

/**
 * Bind polyfill
 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                ? this
                                : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

(function() {
'use strict';

/** private */
var _compliant = 'addEventListener' in window,
    _mediator = document.createElement('div'),
    _body = document.getElementsByTagName('body')[0],
    _handlerManager = {};

_mediator.id = 'SW.Radio-mediator';
_body.appendChild(_mediator);

/**
 *
 */
function _tuneIn(el, type, handler) {
    if (_compliant) {
        el.addEventListener(type, handler, false);
    } else {
        el.attachEvent(type, handler);
    }
}

/**
 *
 */
function _tuneOut(el, type, handler) {
    if (_compliant) {
        el.removeEventListener(type, handler, false);
    } else {
        el.detachEvent(type, handler);
    }
}

/**
 *
 */
function _broadcast(el, type, data) {
    var windowType,
        customEvent;

        if (_compliant) {
            customEvent = new CustomEvent(type, {
                detail : data
            });
            el.dispatchEvent(customEvent);
        } else {
            windowType = 'on' + type;
            el.fireEvent(windowType);
        }
}

/**
 *
 */
function _getEl(selector) {
    var el;

    if (/^\..+$/.test(selector)) {
        el = document.getElementsByClassName(selector.split('.')[1]);
    } else if (/^\#.+$/.test(selector)) {
        el = document.getElementById(selector.split('#')[1]);
    } else if (selector === 'window') {
        el = window;
    } else if (selector === 'document') {
        el = document;
    } else {
        el = document.getElementsByTagName(selector);
    }

    return el;
}

/** public */
var SW.Radio = {
    // when using @context, assign return value to original handler to make it scope-bound
    tuneIn: function(el, type, handler, context) {
        var handlers;
        // no element, shift args over
        if (typeof(el) === 'string' && typeof(type) === 'function') {
            context = handler ? handler : null;
            handler = type;
            type = el;
            el = _mediator;
        }

        if (typeof(el) === 'string') {
            el = _getEl(el);
        }

        if (context) {
            if (!_handlerManager[type]) {
                _handlerManager[type] = [];
            }

            handlers = {
                handler: handler,
                boundHandler: handler.bind(context)
            };

            _handlerManager[type].push(handlers);
        }

        if (el.hasOwnProperty('length') && el.length > 0) {
            for (var i = 0; i < el.length; i += 1) {
                _tuneIn(el[i], type, handlers ? handlers.boundHandler : handler);
            }    
        } else {
            _tuneIn(el, type, handlers ? handlers.boundHandler : handler);
        }
    },

    tuneOut: function(el, type, handler) {
        // no element, shift args over
        if (typeof(el) === 'string' && typeof(type) === 'function') {
            handler = type;
            type = el;
            el = _mediator;
        }

        if (typeof(el) === 'string') {
            el = _getEl(el);
        }

        // if handler matches object of handler & boundHandler - assign boundHandler to handler; else leave as is
        if (_handlerManager[type]) {
            for (var i = 0; i < _handlerManager[type].length; i += 1) {
                if (handler === _handlerManager[type][i].handler) {
                    handler = _handlerManager[type][i].boundHandler;
                    _handlerManager[type].splice(i, 1);
                    break;
                }
            }
        }

        if (el.hasOwnProperty('length') && el.length > 0) {
            for (var i = 0; i < el.length; i += 1) {
                _tuneOut(el[i], type, handler);
            }    
        } else {
            _tuneOut(el, type, handler);
        }
    },

    broadcast: function(el, type, data) {
        // no element, shift args over
        if (typeof(el) === 'string' && typeof(type) !== 'string') {
            data = type;
            type = el;
            el = _mediator;
        }

        if (typeof(el) === 'string') {
            el = _getEl(el);
        }

        if (el.hasOwnProperty('length') && el.length > 0) {
            for (var i = 0; i < el.length; i += 1) {
                _broadcast(el[i], type, data);
            }    
        } else {
            _broadcast(el, type, data);
        }
    },

    destroy: function() {
        // remove mediator el, ?
    }
};

try {
    module.exports = SW.Radio;
} catch(e) {
    try {
        define([], SW.Radio);
    } catch(e) {
        window.SW.Radio = SW.Radio;
    }
}

}());
