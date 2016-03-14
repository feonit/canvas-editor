!function(){

    CanvasEditor.namespace('CanvasEditor').RasterRegion = RasterRegion;
    var RegionObject = CanvasEditor.RegionObject;

    function RasterRegion(options){
        RegionObject.apply(this, arguments);
        options = options || {};

        this.imageBase64 = options.imageBase64 || null;
    }

    /**
     * @param {HTMLCanvasElement} canvas — холст
     * @param {number[]} coordinate — координата точки на холсте, откуда начнется поиск объекта
     * @return {RegionObject} объект фигуры
     * */
    RasterRegion.createObject = function(canvas, coordinate){
        var beginWithX = coordinate[0];
        var beginWithY = coordinate[1];
        var color = canvas.getContext('2d').getImageData(beginWithX, beginWithY, 1, 1).data;
        var searchedData = RegionObject._searchPixels(beginWithX, beginWithY, canvas);
        var coordinates = searchedData[0];
        var borderCoordinates = searchedData[1];

        return new RegionObject({
            height: canvas.height,
            width: canvas.width,
            coordinates: coordinates,
            color: color,
            borderCoordinates: borderCoordinates
        });
    };

    RasterRegion.prototype = Object.create(RegionObject.prototype);
    RasterRegion.prototype.constructor = RasterRegion;
}();