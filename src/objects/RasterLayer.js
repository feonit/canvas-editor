!function(APP){
    APP.namespace('APP');

    /**
     * Растровый слой
     * @class RasterLayer
     * @memberof APP
     * */
    APP.RasterLayer = function (options){
        APP.DraggingAbstract.apply(this, arguments);
        options = options || {};
        this.dataUrl = options.dataUrl || null;
    };

    APP.RasterLayer.prototype = Object.create(APP.DraggingAbstract.prototype);
    APP.RasterLayer.prototype.constructor = APP.RasterLayer;
}(APP);