!function(APP){
    APP.namespace('APP.objects');
    var RasterRegion = APP.RasterRegion;

    APP.objects.BackgroundRaster = function (options){
        options = options || {};
        RasterRegion.apply(this, arguments);
        this.dataUrl = options.dataUrl;
    };

    APP.objects.BackgroundRaster.prototype = Object.create(RasterRegion.prototype);
    APP.objects.BackgroundRaster.prototype.constructor = APP.objects.BackgroundRaster;

    APP.objects.BackgroundRaster.prototype.getLayout = function(){
        if (!this._layout){
            var layoutCanvas = document.createElement('canvas');
            layoutCanvas.height = this.height;
            layoutCanvas.width = this.width;
            var image = new Image();
            image.height = this.height;
            image.width = this.width;
            image.src = this.dataUrl;

            layoutCanvas.getContext('2d').drawImage(image, 0, 0);
            Object.defineProperty(this, '_layout', {value: layoutCanvas});
            this._layout = layoutCanvas;
        }

        return this._layout;
    };

    APP.objects.BackgroundRaster.prototype.getCoordinates = function(){
        if (!this.coordinates){
            var coordinates = [];
            for (var x = 0, lenX = this.width; x < lenX; x++){
                //coordinates.length === this.canvas.height*this.canvas.width;
                for (var y = 0, lenY = this.height; y < lenY; y++){
                    coordinates.push([x,y])
                }
            }
            this.coordinates = coordinates;
        }
        return this.coordinates;
    };

    /**
     * @function createBackgroundRaster
     * @memberof APP.objects.BackgroundRaster
     * @static
     */
    APP.objects.BackgroundRaster.createBackgroundRaster = function (canvas){
        return new APP.objects.BackgroundRaster({
            dataUrl: canvas.toDataURL(),
            height: canvas.height,
            width: canvas.width
        });
    }
}(APP);