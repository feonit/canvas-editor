!function(APP){
    APP.namespace('APP.objects');

    /**
     * Растровый слой
     * @class
     * @memberof APP.objects
     * */
    APP.objects.RasterLayer = function (options){
        APP.objects.LayerObject.apply(this, arguments);
        options = options || {};
        this.dataUrl = options.dataUrl || null;
    };

    APP.objects.RasterLayer.prototype = Object.create(APP.objects.LayerObject.prototype);
    APP.objects.RasterLayer.prototype.constructor = APP.objects.RasterLayer;
}(APP);