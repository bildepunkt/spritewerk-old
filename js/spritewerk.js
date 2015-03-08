/**
 * @namespace
 */
var SW = {
    /**
     * @namespace
     * @belongsto SW
     */
    Common: {},
    /**
     * @namespace
     * @requires SW.Common
     * @belongsto SW
     */
    Display: {},
    /**
     * @namespace
     * @requires SW.Common
     * @belongsto SW
     */
    Events: {},
    /**
     * @namespace
     * @requires SW.Common
     * @requires SW.Events
     * @belongsto SW
     */
    Media: {},
    /**
     * @namespace
     * @requires SW.Common
     * @requires SW.Events
     * @requires SW.Media
     * @belongsto SW
     */
    Scenes: {}
};