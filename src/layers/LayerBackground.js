!function(APP){
    APP.namespace('APP.objects');

    /**
     * Задний главный слой
     * @class
     * @memberof APP.objects
     * */
    APP.objects.LayerBackground = function (options){
        APP.objects.LayerAbstract.apply(this, arguments);

        options = options || {};
        this.dataUrl = options.dataUrl || null;

        var generateCoordinatesMatrix = function(){
            var coordinates = [];
            for (var x = 0, lenX = this.width; x < lenX; x++){
                //coordinates.length === this.canvas.height*this.canvas.width;
                for (var y = 0, lenY = this.height; y < lenY; y++){
                    coordinates.push([x,y])
                }
            }
            return coordinates;
        };

        this.coordinates = generateCoordinatesMatrix();
    };

    APP.objects.LayerBackground.prototype = Object.create(APP.objects.LayerAbstract.prototype);
    APP.objects.LayerBackground.prototype.constructor = APP.objects.LayerBackground;

    /**
     * @function createLayerBackground
     * @memberof APP.objects.LayerBackground
     * @static
     */
    APP.objects.LayerBackground.createLayerBackground = function (canvas){
        return new APP.objects.LayerBackground({
            dataUrl: canvas.toDataURL(),
            height: canvas.height,
            width: canvas.width
        });
    }
}(APP);