!function(APP){
    APP.namespace('APP.objects');

    /**
     * Класс определяет две контрольные точки
     * @class
     * @memberof APP.objects
     * */
    APP.objects.SimpleRaster = function(attributes){
        APP.objects.RasterLayer.apply(this, arguments);
        attributes = attributes || {};
        this.ownedPoint = attributes.ownedPoint;
        this.borderCoordinates = attributes.borderCoordinates;
        this.coordinates = attributes.coordinates;

        if (attributes.dataUrl){
            var image = new Image();
            image.height = attributes.height;
            image.width = attributes.width;
            image.src = attributes.dataUrl;
            var canvas = document.createElement('canvas');
            canvas.height = attributes.height;
            canvas.width = attributes.width;
            canvas.getContext('2d').drawImage(image, 0, 0);
            var searchedData = APP.algorithms.searchPixelsAlgorithm(attributes.ownedPoint[0], attributes.ownedPoint[1], canvas);
            this.borderCoordinates = searchedData[1];
            this.coordinates = searchedData[0];
        }
    };

    APP.objects.SimpleRaster.prototype = Object.create(APP.objects.RasterLayer.prototype);
    APP.objects.SimpleRaster.prototype.constructor = APP.objects.SimpleRaster;

    APP.objects.SimpleRaster._generateDataUrlFromCanvas = function(canvas){
        return canvas.toDataURL();
    };

    /**
     * @param {HTMLCanvasElement} canvas — холст
     * @param {number[]} coordinate — координата точки на холсте, откуда начнется поиск объекта
     * @return {RasterLayer} объект фигуры
     * */
    APP.objects.SimpleRaster.createObject = function(canvas, coordinate){
        var beginWithX = coordinate[0];
        var beginWithY = coordinate[1];
        var color = canvas.getContext('2d').getImageData(beginWithX, beginWithY, 1, 1).data;
        var searchedData = APP.algorithms.searchPixelsAlgorithm(beginWithX, beginWithY, canvas);

        var layer = document.createElement('canvas');
        layer.height = canvas.height;
        layer.width = canvas.width;
        APP.views.RasterLayerView.drawPixelsToColor(layer, searchedData[0], color);

        var dataUrl = APP.objects.SimpleRaster._generateDataUrlFromCanvas(layer);

        return new APP.objects.SimpleRaster({
            ownedPoint: [beginWithX, beginWithY],
            height: canvas.height,
            width: canvas.width,
            coordinates: searchedData[0],
            borderCoordinates: searchedData[1],
            color: color,
            dataUrl: dataUrl
        });
    };

}(APP);