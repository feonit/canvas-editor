!function(APP){
    APP.namespace('APP.tools');
    /**
     * Логика работы инструмента выборки
     * @class
     * @memberof APP.tools
     * @param {CanvasEditor} appInstance
     * @param {HTMLCanvasElement} canvas — канвас
     * Инструмент позволяющий избирать и удалять избранные объекты с холста
     * */
    APP.tools.SelectTool = function (appInstance, canvas){
        /** @type {CanvasEditor} */
        this.appInstance = appInstance;
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
        /** @type {LayerObject[]} Коллекция избранных объектов */
        this.selectedObjects = [];
    };
    APP.tools.SelectTool.prototype = {
        constructor: APP.tools.SelectTool,
        /**
         * Добавить объект в коллекцию избранных по координате
         * @param {number} x — координата X
         * @param {number} y — координата Y
         * @return {boolean|LayerObject} — результат операции, найденный объект или false если объект не найден
         * */
        selectObjectByCoordinate : function(x, y){
            var layerObject = this.appInstance.regionManager.searchRegionByCoordinate(x, y);

            if (!layerObject)
                return false;

            var index = this.selectedObjects.indexOf(layerObject);

            if (index === -1){
                this.selectedObjects.push(layerObject);
                layerObject.activate();
                this.appInstance.regionManager.redrawLayers();
            } else {
                this.selectedObjects.splice(index, 1);
                layerObject.deactivate();
                this.appInstance.regionManager.redrawLayers();
            }
            return layerObject;
        },
        /**
         * Удалить все объекты в коллекции избранных с холста
         * */
        deleteSelectedObjects : function(){
            this.selectedObjects.forEach((function(layerObject){
                this.appInstance.regionManager.removeRegion(layerObject);
            }).bind(this));
            this.appInstance.regionManager.redrawLayers();
            this.selectedObjects = [];
        },
        /**
         * Сбрасывает в исходное состояние
         * */
        reset : function(){
            this.selectedObjects.forEach((function(layerObject){
                layerObject.deactivate();
            }).bind(this));

            this.appInstance.regionManager.redrawLayers();
            this.selectedObjects = [];
        }
    }
}(APP);


