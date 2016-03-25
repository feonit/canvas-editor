!function(APP){
    /** @namespace APP.views */
    APP.namespace('APP.views');

    /**
     * @class CanvasSnapShotView
     * @memberof APP.views
     * */
    APP.views.CanvasSnapShotView = function(canvas){
        this.canvas = canvas;
        this.snapshot = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    };

    APP.views.CanvasSnapShotView.prototype.redrawWithLayer = function(layer){
        var ctx = this.canvas.getContext("2d");
        // очищение
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // старье
        ctx.putImageData(this.snapshot, 0, 0);

        ctx.drawImage(layer, 0, 0);
    };

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLCanvasElement} layer
     * @param {number[]} offset
     * @memberof APP.views.CanvasSnapShotView
     * @static
     * */
    APP.views.CanvasSnapShotView.drawLayer = function(canvas, layer, offset){
        // кладем буфер региона на холст добавляя смещение
        canvas.getContext('2d').drawImage(layer, offset[0], offset[1]);
    };

}(APP);