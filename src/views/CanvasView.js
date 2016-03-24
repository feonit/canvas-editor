!function(APP){
    /** @namespace APP.views */
    APP.namespace('APP.views');

    /**
     * @class CanvasView
     * @memberof APP.views
     * */
    APP.views.CanvasView = function(){
        //todo
        //this.canvas;
    };

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLCanvasElement} layer
     * @param {number[]} offset
     * @memberof APP.views.CanvasView
     * @static
     * */
    APP.views.CanvasView.drawLayer = function(canvas, layer, offset){
        // кладем буфер региона на холст добавляя смещение
        canvas.getContext('2d').drawImage(layer, offset[0], offset[1]);
    };

}(APP);