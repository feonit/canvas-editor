!function(APP){
    APP.namespace('APP');

    APP.VectorLayer = function (attributes){
        APP.DraggingAbstract.apply(this, arguments);
        this.size = attributes.size;

        Object.defineProperty(this, 'coordinatesLine', {
            value: attributes.coordinatesLine,
            enumerable: false,
            writable: true
        });

        Object.defineProperty(this, 'coordinates', {
            value: null,
            enumerable: false,
            writable: true
        });

        Object.defineProperty(this, 'borderCoordinates', {
            value: null,
            enumerable: false,
            writable: true
        });
    };

    APP.VectorLayer.prototype = Object.create(APP.DraggingAbstract.prototype);
    APP.VectorLayer.prototype.constructor = APP.VectorLayer;


    // способ для вычисления координат пикселей
    APP.VectorLayer.prototype.calcCoordinates = function(){
        var beginWithX = this.coordinatesLine[0][0];
        var beginWithY = this.coordinatesLine[0][1];
        var fakeLayer = new APP.views.VectorLayerView({
            height: this.height,
            width: this.width,
            size: this.size,
            coordinatesLine: this.coordinatesLine,
            color: this.color
        });
        var searchedData = APP.algorithms.SearchPixelsAlgorithm(beginWithX, beginWithY, fakeLayer.layer);
        this.coordinates = searchedData[0];
        this.borderCoordinates = searchedData[1];
    };

}(APP);