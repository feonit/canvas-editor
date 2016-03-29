!function(APP){
    APP.namespace('APP.core');

    /**
     * @constructor
     * @throw
     * @return {StorageManager}
     * */
     APP.core.StorageManager = function StorageManager(options){
         options = options || {};

         if (!this.supportsLocalStorage())
             return false;

         if (!options.key || !options.namespace)
             throw 'You need specific key and namespace for storage';

         var namespace = options.namespace;

         this.uniqueNamespace = namespace + this.SEPARATOR + options.key;
    };

    APP.core.StorageManager.prototype = {
            constructor: APP.core.StorageManager,

            SEPARATOR: '.',

            supportsLocalStorage: function(){
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                } catch (e) {
                    return false;
                }
            },

            /**
             * @param {String} propName — property name
             * @return null || object
             * */
            getProperty: function(propName){
                var propertyName = this.uniqueNamespace + this.SEPARATOR + propName;
                var prop = localStorage.getItem(propertyName);

                var data;
                try {
                    data = JSON.parse(prop);
                } catch(e){
                    console.log('данные побились')
                }

                return data;
            },

            setItem: function(propName, value){
                var propertyName = this.uniqueNamespace + this.SEPARATOR + propName;
                var item = JSON.stringify(value);
                localStorage.setItem(propertyName, item);
            },

            clear: function(){
                localStorage.clear();
            }
        };

}(APP);