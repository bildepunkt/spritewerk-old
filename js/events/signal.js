SW.Signal = (function() {

    function getMediator() {
        window.removeEventListener('load', getMediator);

        Signal.prototype._mediator = document;
    }

    /**
     * event handler
     *
     * @class SW.Signal
     * @belongsto SW
     * @singleton
     */
    var Signal = function() {
        this._handlerManager = {};

        window.addEventListener('load', getMediator);
    };

    /**
     * tune in to events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.addListener
     * @param {HTMLElement} [el] - the element to listen to (if not present, will listen to built-in mediator)
     * @param {string} type - event type; can be custom or DOM
     * @param {function} handler - the event handler
     * @param {object} [context] - if present will call handler with this scope
     */
    Signal.prototype.addListener = function(el, type, handler, context) {
        var handlers;

        // no element, shift args over
        if (typeof el === 'string' && typeof type === 'function') {
            context = handler ? handler : null;
            handler = type;
            type = el;
            el = this._mediator;
        }

        if (context) {
            if (!this._handlerManager[type]) {
                this._handlerManager[type] = [];
            }

            handlers = {
                handler: handler,
                boundHandler: handler.bind(context)
            };

            this._handlerManager[type].push(handlers);
        }

        el.addEventListener(type, handler, false);
    };

    /**
     * tune out events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.removeListener
     * @param {HTMLElement} [el] - the element to stop listening to (if not present, will tune out the built-in mediator)
     * @param {string} type - event type; can be custom or DOM
     * @param {function} handler - the event handler
     */
    Signal.prototype.removeListener = function(el, type, handler) {
        // no element, shift args over
        if (typeof el === 'string' && typeof type === 'function') {
            handler = type;
            type = el;
            el = this._mediator;
        }

        // if handler matches object of handler & boundHandler - assign boundHandler to handler; else leave as is
        if (this._handlerManager[type]) {
            for (var i = 0; i < this._handlerManager[type].length; i += 1) {
                if (handler === this._handlerManager[type][i].handler) {
                    handler = this._handlerManager[type][i].boundHandler;
                    this._handlerManager[type].splice(i, 1);
                    break;
                }
            }
        }

        el.removeEventListener(type, handler, false);
    };

    /**
     * dispatches events from a dom element or built-in mediator
     *
     * @method SW.Signal.prototype.dispatch
     * @param {HTMLElement} [el] - the element to broadcast from (if not present, will broadcast from built-in mediator)
     * @param {string} type - event type
     * @param {object} data - the data to pass to the handler
     */
    Signal.prototype.dispatch = function(el, type, data) {
        var customEvent = new CustomEvent(type, {
            detail : data
        });

        // no element, shift args over
        if (typeof el === 'string' && typeof type !== 'string') {
            data = type;
            type = el;
            el = this._mediator;
        }

        el.dispatchEvent(customEvent);
    };

    return new Signal();
}());