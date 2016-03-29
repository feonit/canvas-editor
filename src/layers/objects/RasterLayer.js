!function(APP){
    APP.namespace('APP.objects');

    /**
     * Растровый слой
     * @class RasterLayer
     * @memberof APP
     * */
    APP.objects.RasterLayer = function (options){
        APP.objects.LayerObject.apply(this, arguments);
        options = options || {};
        this.dataUrl = options.dataUrl || null;
    };

    APP.objects.RasterLayer.prototype = Object.create(APP.objects.LayerObject.prototype);
    APP.objects.RasterLayer.prototype.constructor = APP.objects.RasterLayer;
}(APP);