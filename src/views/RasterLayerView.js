!function(APP, Image){
    APP.namespace('APP.views');

    /**
     * Отвечает за отображение информации
     * @class RasterLayerView
     * @memberof APP.views
     * */
    APP.views.RasterLayerView = function(options){
        APP.views.LayerView.apply(this, arguments);
        options = options || {};
        this.coordinates = options.coordinates || null;
        this.color = options.coordinates || null;
        this.dataUrl = options.dataUrl || null;
    };

    APP.views.RasterLayerView.prototype = Object.create(APP.views.LayerView.prototype);
    APP.views.RasterLayerView.prototype.constructor = APP.RasterLayerView;

    // два способа отрисовки растрового слоя,
    APP.views.RasterLayerView.createByDataUrl = function(options){
        var view = new APP.views.RasterLayerView(options);
        var image = new Image();
        image.height = view.height;
        image.width = view.width;
        image.src = options.dataUrl;
        view.layer.getContext('2d').drawImage(image, 0, 0);
        return view;
    };

    // по точкам и по отпечатку
    APP.views.RasterLayerView.createByCoordinates = function (options){
        var view = new APP.views.RasterLayerView(options);
        APP.views.RasterLayerView.drawPixelsToColor(view.layer, options.coordinates, options.color);
        return view;
    };

    APP.views.RasterLayerView.drawPixelsToColor = function (layer, coordinates, color){
        var canvas = layer;
        var canvasCtx = layer.getContext('2d');
        var imageData = canvasCtx.createImageData(1,1);
        var data = imageData.data;
        data[0] = color[0];
        data[1] = color[1];
        data[2] = color[2];
        data[3] = color[3];
        var canvas1px = document.createElement('canvas');
        canvas1px.height = 1;
        canvas1px.width = 1;
        var canvas1pxCtx = canvas1px.getContext('2d');
        canvas1pxCtx.putImageData(imageData, 0, 0);
        var coordinate, i, len;
        for (i = 0, len = coordinates.length; i < len; i++){
            coordinate = coordinates[i];
            canvasCtx.drawImage(canvas1px, coordinate[0], coordinate[1]);
        }
    }

}(APP, window.Image);