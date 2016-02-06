/**
 * @class       Mobile
 * @description Adds mobile-friendly tags to the head tag
 * @author      Chris Peters
 *
 * @param {Object} [opts]
 * @param {Object} [opts.document] For testing
 */
export default class Mobile {
    constructor(opts = {}) {
        this._document = opts.document || document;

        var head = this._document.head;
        var meta = this._document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, user-scalable=no, ' +
            'initial-scale=1, maximum-scale=1, user-scalable=0';
        head.appendChild(meta);

        meta = this._document.createElement('meta');
        meta.name = 'apple-mobile-web-app-capable';
        meta.content = 'yes';
        head.appendChild(meta);

        meta = this._document.createElement('meta');
        meta.name = 'mobile-web-app-capable';
        meta.content = 'yes';
        head.appendChild(meta);
    }
}
