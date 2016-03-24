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
             * @param {String} key — property name
             * @return null || object
             * */
            getProperty: function(key){
                var propertyName = this.namespace + this.SEPARATOR + key;
                var prop = localStorage.getItem(propertyName);

                var data;
                try {
                    data = JSON.parse(prop);
                } catch(e){
                    console.log('данные побились')
                }

                return data;
            },

            setItem: function(key, value){
                var propertyName,
                    propertyValue;

                propertyName = this.namespace + this.SEPARATOR + key;
                propertyValue = value;
                var item = JSON.stringify(value);
                localStorage.setItem(propertyName, item);
            },

            clear: function(){
                localStorage.clear();
            }
        };

}(APP);