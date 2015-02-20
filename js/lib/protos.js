var SW.Protos = (function() {
    var uidCounter = 0;

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

    var SW.Protos = function(members, alpha) {
        var prop;
        var Beta = function(options, extending) {
            var prop;

            for(prop in this) {
                if (typeof this[prop] === 'object' && this[prop] !== null) {
                    this[prop] = clone(this[prop]);
                }
            }

            for(prop in options) {
                if (this[prop] !== undefined) {
                    this[prop] = options[prop];
                }
            }

            this.uid = uidCounter++;

            if (this.init && !extending) {
                this.init(options);
            }
        };

        for(prop in members) {
            if (typeof members[prop] === 'object' && members[prop] !== null) {
                alpha[prop] = clone(members[prop]);
            } else {
                alpha[prop] = members[prop];
            }
        }

        Beta.prototype = alpha;

        Beta.extend = function(members) {
            return SW.Protos(members, new this(null, true));
        };

        return Beta;
    };

    return SW.Protos();
}());