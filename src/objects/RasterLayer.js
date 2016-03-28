!function(APP){
    APP.namespace('APP.objects');

    /**
     * Растровый слой
     * @class RasterLayer
     * @memberof APP
     * */
    APP.objects.RasterLayer = function (options){
        APP.DraggingAbstract.apply(this, arguments);
        options = options || {};
        this.dataUrl = options.dataUrl || null;
    };

    APP.objects.RasterLayer.prototype = Object.create(APP.DraggingAbstract.prototype);
    APP.objects.RasterLayer.prototype.constructor = APP.objects.RasterLayer;
}(APP);