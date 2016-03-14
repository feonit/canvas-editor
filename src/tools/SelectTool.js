!function(CanvasEditor){

    /** @namespace CanvasEditor.Tool */
    CanvasEditor.namespace('CanvasEditor.Tool').SelectTool = SelectTool;

    /**
     * @class SelectTool
     * @memberof CanvasEditor.Tool
     * @param {CanvasEditor} appInstance
     * @param {HTMLCanvasElement} canvas — канвас
     * Инструмент позволяющий избирать и удалять избранные объекты с холста
     * */
    function SelectTool(appInstance, canvas){
        /** @type {CanvasEditor} */
        this.appInstance = appInstance;
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
        /** @type {RegionObject[]} Коллекция избранных объектов */
        this.selectedObjects = [];
    }

    /**
     * Добавить объект в коллекцию избранных по координате
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * @return {boolean|RegionObject} — результат операции, найденный объект или false если объект не найден
     * */
    SelectTool.prototype.selectObjectByCoordinate = function(x, y){
        var regionObject = this.appInstance.regionManager.searchRegionByCoordinate(x, y);

        if (!regionObject)
            return false;

        var index = this.selectedObjects.indexOf(regionObject);

        if (index === -1){
            this.selectedObjects.push(regionObject);
            regionObject.activate();
            this.appInstance.regionManager.redrawLayers();
        } else {
            this.selectedObjects.splice(index, 1);
            regionObject.deactivate();
            this.appInstance.regionManager.redrawLayers();
        }
        return regionObject;
    };

    /**
     * Удалить все объекты в коллекции избранных с холста
     * */
    SelectTool.prototype.deleteSelectedObjects = function(){
        this.selectedObjects.forEach((function(regionObject){
            this.appInstance.regionManager.removeRegion(regionObject);
        }).bind(this));
        this.appInstance.regionManager.redrawLayers();
        this.selectedObjects = [];
    };

    /**
     * Сбрасывает в исходное состояние
     * */
    SelectTool.prototype.reset = function(){
        this.selectedObjects.forEach((function(regionObject){
            regionObject.deactivate();
        }).bind(this));

        this.appInstance.regionManager.redrawLayers();
        this.selectedObjects = [];
    }

}(CanvasEditor);


