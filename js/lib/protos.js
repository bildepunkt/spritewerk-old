
(function() {

// deep copy an object
function clone(src) {
    // check for arrays too!
    var obj = (src.hasOwnProperty('length')) ? [] : {},
        prop;

    for (prop in src) {
        if (typeof src[prop] === 'object' && src[prop] !== null) {
            obj[prop] = clone(src[prop]);
        } else {
            obj[prop] = src[prop];
        }
    }
    return obj;
}

var protos = {
    _uidCounter: 1,

    /**
     * @param {object} members - properties and mwthods for the class
     * @param {object} [_super] - just used by protos.extend to add super class members
     */
    create: function(members, _super) {
        /**
         * @param {object} options - obj to merge into properties
         * @param {boolean} [noInit] - just used by protos.extend to suppress init call
         */
        var Alpha = function(options, noInit) {
            var prop;

            for (prop in this) {
                if (typeof this[prop] === 'object' && this[prop] !== null) {
                    this[prop] = clone(this[prop]);
                }
            }

            for (prop in options) {
                this[prop] = options[prop];
            }

            this._uid = protos._uidCounter++;

            if (this.init && !noInit) {
                this.init(options);
            }
        };
        var superName;
        var prop;

        if (!members.protosName) {
            throw new Error('All protos objects need a "protosName" property for working inheritance');
        }

        if (_super) {
            superName = '$' + _super.protosName;
            members[superName] = {};

            for(prop in _super) {
                if (members[prop]) {
                    members[superName][prop] = _super[prop];
                } else {
                    members[prop] = _super[prop];
                }
            }
        }

        for(prop in members) {
            Alpha.prototype[prop] =
                (typeof members[prop] === 'object' && members[prop] !== null) ?
                clone(members[prop]) :
                members[prop];
        }

        Alpha.extend = protos.extend;

        return Alpha;
    },

    extend: function(members) {
        return protos.create(members, new this(null, true));
    }
};

/**
 * so we don't have to use the ugly protos.create
 */
var Protos = {
    extend: protos.create
};

try {
    module.exports = Protos;
} catch(e) {
    try {
        define([], Protos);
    } catch(e) {
        window.Protos = Protos;
    }
}

}());