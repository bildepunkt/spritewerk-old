let handlers = {};

/**
 * [getScopedHandler description]
 * @method addScopedHandler
 * @param  {String}   event    [description]
 * @param  {Function} handler [description]
 * @param  {Object}   scope    [description]
 * @return {Function} The scoped handler
 */
function addScopedHandler (event, handler, scope) {
    if (handlers[event] === undefined) {
        handlers[event] = [];
    }

    let scopedHandler = scope ? handler.bind(scope) : handler;

    handlers[event].push({
        original: handler,
        scoped: scopedHandler
    });

    return scopedHandler;
}

/**
 * [removeScopedHandler description]
 * @method removeScopedHandler
 * @param  {String}   event   [description]
 * @param  {Function} handler [description]
 * @return {Function}         Returns the scoped handler or original if scope was not passed on `add`
 */
function removeScopedHandler (event, handler) {
    let scopedHandler;

    for (let i = 0, len = handlers[event].length; i < len; i++) {
        let handlerGroup = handlers[event][i];

        if (handler === handler.original) {
            scopedHandler = handler.scoped;
            handlers[event].splice(i, 1);
        }
    }

    return scopedHandler || handler;
}

/**
 * @method tuneIn
 * @param {HTMLEntity} target
 * @param {String}     event
 * @param {Function}   handler
 * @param {Object}     [scope]
 */
function tuneIn(target, event, handler, scope) {
    // we add the handler here (even if no scope is passed) so that we don't have to make the user pass scope
    // on `remove`
    handler = addScopedHandler(event, handler, scope);

    target.addEventListener(event, handler, false);
}

/**
 * @method tuneOut
 * @param {HTMLEntity} target
 * @param {String}     event
 * @param {Function}   handler
 */
function tuneOut(target, event, handler) {
    // check that a scoped handler was bound, returns original if not
    let scopedHandler = removeScopedHandler(event, handler);

    target.removeEventListener(event, scopedHandler, false);
}

/**
 * @method broadcast
 * @param {Any}    target
 * @param {String} event
 * @param {Object} data
 */
function broadcast(target, event, data) {
    let evt;

    switch(event) {
        // TODO verify MouseEvent
        case "click":
        case "dblclick":
        case "mousedown":
        case "mouseup":
        case "mousemove":
            evt = new MouseEvent(event, {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });
            break;
        default:
            evt = new CustomEvent(event, {
                detail: data
            });
            break;
    }

    target.dispatchEvent(evt);
}

export {
    tuneIn,
    tuneOut,
    broadcast
};
