/**
 * @class       Mobile
 * @description A class with helpers for making the application play nice with mobile browsers
 * @author      Chris Peters
 */
export default class Mobile {
    /**
     * [addMetaTags description]
     * @method Mobile.addMetaTags
     * @param  {Object} doc [description]
     */
    static addMetaTags(doc = document) {
        var head = doc.head;
        var meta = doc.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, user-scalable=no, ' +
            'initial-scale=1, maximum-scale=1, user-scalable=0';
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
}
