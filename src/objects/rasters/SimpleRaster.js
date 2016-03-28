!function(APP){
    APP.namespace('APP.objects');

    /**
     * Класс определяет две контрольные точки
     * @class SimpleRaster
     * @memberof APP.objects
     * */
    APP.objects.SimpleRaster = function(attributes){
        APP.objects.RasterLayer.apply(this, arguments);
        attributes = attributes || {};
        this.ownedPoint = attributes.ownedPoint;
        this.borderCoordinates = attributes.borderCoordinates;
        this.coordinates = attributes.coordinates;
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

        this.dataUrl = APP.objects.SimpleRaster._generateDataUrlFromCanvas;

        return new APP.objects.SimpleRaster({
            ownedPoint: [beginWithX, beginWithY],
            height: canvas.height,
            width: canvas.width,
            coordinates: searchedData[0],
            borderCoordinates: searchedData[1],
            color: color
        });
    };
}(APP);