!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').BackgroundRegion = BackgroundRegion;
    var RegionObject = CanvasEditor.RegionObject;

    function BackgroundRegion(options){
        options = options || {};
        RegionObject.apply(this, arguments);
        this.dataUrl = options.dataUrl;
    }

    BackgroundRegion.prototype = Object.create(RegionObject.prototype);
    BackgroundRegion.prototype.constructor = BackgroundRegion;

    BackgroundRegion.prototype.getLayout = function(){
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

    BackgroundRegion.prototype.getCoordinates = function(){
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
    }

}(CanvasEditor);