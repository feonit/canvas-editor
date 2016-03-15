!function(APP){
    APP.namespace('APP');


    /**
     * @constructor
     * @throw
     * @return {StorageManager}
     * */
     APP.StorageManager = function StorageManager(localNamespace){
            if (!this.supportsLocalStorage()) return false;
            if (!localNamespace) throw 'You need specific name';

            var namespace = this.GLOBAL_NAMESPACE + this.SEPARATOR + localNamespace;

            Object.defineProperties(this, {
                namespace: {
                    value: namespace
                },
                localNamespace: {
                    value: localNamespace
                }
            });
        };

    APP.StorageManager.prototype = {
            constructor: APP.StorageManager,

            SEPARATOR: '.',
            GLOBAL_NAMESPACE: 'CANVAS_EDITOR',

            supportsLocalStorage: function(){
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                } catch (e) {
                    return false;
                }
            },

            /**
             * @param {Object} object — hash data
             * @return false || object
             * */
            setProperties: function(object){
                var key;

                if (typeof object !== 'object' || object === null) return false;

                for (key in object ){
                    if (!object.hasOwnProperty(key)) continue;

                    if (typeof object[key] === "object"){
                        this.setProperties(object[key]);
                    } else {
                        this.setItem(key, object[key]);
                    }
                }
                return object;
            },

            getProperties: function(){
                var archive = this.allStorage(),
                    data = {}, key, split;

                for (key in archive) {
                    split = key.split(this.SEPARATOR);

                    if (split[0] === this.GLOBAL_NAMESPACE && split[1] === this.localNamespace) {
                        data[split[2]] = archive[key];
                    }
                }

                return data;
            },

            /**
             * @param {String} key — property name
             * @return null || object
             * */
            getProperty: function(key){
                var propertyName = this.namespace + this.SEPARATOR + key;
                return localStorage.getItem(propertyName)
            },

            allStorage: function(){
                var archive = {}, // Notice change here
                    keys = Object.keys(localStorage),
                    i = keys.length;

                while ( i-- ) {
                    archive[ keys[i] ] = localStorage.getItem( keys[i] );
                }

                return archive;
            },

            setItem: function(key, value){
                var propertyName,
                    propertyValue;

                propertyName = this.namespace + this.SEPARATOR + key;
                propertyValue = value;
                localStorage.setItem(propertyName, propertyValue);
            }
        };

}(APP);