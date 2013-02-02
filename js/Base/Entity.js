(function (global) {
    'use strict';

    global.app = global.app || {};

    global.app.Entity = (function () {

        /**
         * Entity
         * Basic Game Object. Contains components.
         * @param tag
         * @return {*}
         * @constructor
         */

        function Entity(tag) {
            return Entity.alloc(this, arguments);
        }
        app.inherit(app.BaseObj, Entity);

        Entity.prototype.init = function (tag) {
            this.components = {}; // dep
            this.id = _.uniqueId(tag || 'entity_');
            return this;
        };

        Entity.prototype.deinit = function () {
            this.destroyAllComponents();
        };

        /**** Component Management ****/

        Entity.prototype.createComponent = function (componentName, options) {
            var component = new app.Component[componentName](options);
            this.components[componentName] = component; //dep
            this[componentName] = component;
            this.engine.triggerEvent('componentAdded', this);
            return component;
        };

        Entity.prototype.createComponents = function (components) {
            var component, componentName, componentOptions;
            for (componentName in components) {
                if (components.hasOwnProperty(componentName)) {
                    componentOptions = components[componentName];
                    component = new app.Component[componentName](componentOptions);
                    this.components[componentName] = component; // dep
                    this[componentName] = component;
                }
            }
            this.engine.triggerEvent('componentAdded', this);
        };

        Entity.prototype.destroyComponent = function (componentName) {
            var component = this.components[componentName];
            delete this.components[componentName];
            this.engine.triggerEvent('componentRemoved', this);
            component.destroy();
        };

        Entity.prototype.destroyAllComponents = function () {
            var key, component, componentName;
            // dep
            for (componentName in this.components) {
                if (this.components.hasOwnProperty(componentName)) {
                    component = this.components[componentName];
                    delete this.components[componentName];
                    component.deinit();
                }
            }
            for (key in this) {
                if (this.hasOwnProperty(key) && this[key] instanceof app.Component) {
                    this[key].destroy();
                    delete this[key];
                }
            }
            this.engine.triggerEvent('componentRemoved', this);
        };

        return Entity;

    }());

}(window));