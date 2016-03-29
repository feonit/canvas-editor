!function(APP){
    APP.namespace('APP.objects');

    /**
     * Векторный слой
     * @class
     * @memberof APP.objects
     * */
    APP.objects.VectorLayerAbstract = function (attributes){
        APP.objects.LayerObject.apply(this, arguments);
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

    APP.objects.VectorLayerAbstract.prototype = Object.create(APP.objects.LayerObject.prototype);
    APP.objects.VectorLayerAbstract.prototype.constructor = APP.objects.VectorLayerAbstract;


    // способ для вычисления координат пикселей
    APP.objects.VectorLayerAbstract.prototype.calcCoordinates = function(){
        var beginWithX = this.coordinatesLine[0][0];
        var beginWithY = this.coordinatesLine[0][1];
        var fakeLayer = new APP.views.VectorLayerAbstractView({
            height: this.height,
            width: this.width,
            size: this.size,
            coordinatesLine: this.coordinatesLine,
            color: this.color
        });
        var searchedData = APP.algorithms.searchPixelsAlgorithm(beginWithX, beginWithY, fakeLayer.layer);
        this.coordinates = searchedData[0];
        this.borderCoordinates = searchedData[1];
    };

}(APP);