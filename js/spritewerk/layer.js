/**
 * an object in a state containing entities and config data
 *
 * @class Layer
 */
define([
    '../lib/protos'
], function(Protos) {
    return Protos.extend({
        protosName: 'layer',

        /**
         * @member {array} Layer.prototype.entities
         */
        entities: [],

        /**
         * @method Layer.prototype.getEntity
         * @param {string} name
         */
        getEntity: function(name) {
            var len = this.entities.length;
            var i;

            for(i = 0; i < len; i += 1) {
                if (this.entities[i].name == name) {
                    return this.entities[i];
                }
            }
        },

        /**
         * @param {Sprite} entity
         * @method Layer.prototype.addEntity
         */
        addEntity: function(entityData) {
            var entity = new entityData.type(entityData.config);
            entity.name = entityData.name;

            if (entity.src) {
                entity.attachImage();
            }

            this.entities.push(entity);
        },

        /**
         * @param {object} layer
         * @param {Sprite} entity
         * @method Layer.prototype.removeEntity
         */
        removeEntity: function(entity) {
            var len = this.entities.length;
            var i;

            for (i = 0; i < len; i += 1) {
                if (entity._uid === this.entities[i]._uid) {
                    this.entities[i] = null;
                    this.entities.splice(i, 1);
                    break;
                }
            }
        },

        /**
         * changes an entity's depth
         *
         * @param {Sprite} entity
         * @param {int|string} newDepth - int use: 0 for back, -1 for front, or anything inbetween. string use: '++' or '--' for forward or back respectively
         * @method Layer.prototype.setEntityDepth
         */
        setEntityDepth: function(entity, newDepth) {
            var entitiesLen = this.entities.length;
            var entityObject;
            var depth;
            var i;

            for (i = 0; i < entitiesLen; i += 1) {
                if (this.entities[i]._uid === entity._uid) {
                    entityObject = this.entities[i];
                    depth = i;
                    break;
                }
            }

            if (newDepth === -1 && depth === this.entities.length -1) {
                return;
            }

            if (newDepth === 0  && depth === 0) {
                return;
            }

            this.entities.splice(depth, 1);

            switch(typeof newDepth) {
            case 'number':
                if (newDepth === -1 || newDepth >= this.entities.length) {
                    this.entities.push(entityObject);
                } else {
                    this.entities.splice(newDepth, 0, entityObject);
                }
                break;
            case 'string':
                if (newDepth === '++') {
                    this.entities.splice(depth + 1, 0, entityObject);
                } else if (newDepth === '--') {
                    this.entities.splice(depth - 1, 0, entityObject);
                }
                break;
            }
            
        },

        /**
         * @method Layer.prototype.getEntity
         * @param {Sprite} entity
         * @return {int} depth
         */
        getEntityDepth: function(entity) {
            var entitiesLen = this.entities.length;
            var i;

            for (i = 0; i < entitiesLen; i += 1) {
                if (this.entities[i]._uid === entity._uid) {
                    return i;
                }
            }
        }
    });
});