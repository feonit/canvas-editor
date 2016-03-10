var StorageManager = (function(){

    /**
     * @constructor
     * @throw
     * @return {StorageManager} || false
     * */
    function StorageManager(localNamespace){
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
    }

    StorageManager.prototype = {
        constructor: StorageManager,

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

    return StorageManager;
}());

!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor.ToolController').SaveLocalUtilController = SaveLocalUtilController;

    function SaveLocalUtilController(appInstance){
        var storageManager = new StorageManager('layers_state');

        this._saveToLocalSorage = function (){
            //var props = {};
            //var data = {};
            //
            //for (var k in appInstance.layersManager){
            //    if(!appInstance.layersManager.hasOwnProperty(k)){continue;}
            //
            //    props[k] = appInstance.layersManager[k];
            //}
            //
            //data.layersManager = props;
            //
            //storageManager.setProperties(data);
        };

        this.start = function(){
            this._saveToLocalSorage();
            appInstance.mediator.subscribe(appInstance.UPDATE_CANVAS, this._saveToLocalSorage);
        };

        this.stop = function(){
            appInstance.mediator.unsubscribe(appInstance.UPDATE_CANVAS, this._saveToLocalSorage);
        }
    }

    SaveLocalUtilController.prototype = Object.create(CanvasEditor.ToolController);
    SaveLocalUtilController.prototype.constructor = SaveLocalUtilController;

}(CanvasEditor);