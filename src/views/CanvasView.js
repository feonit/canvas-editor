!function(APP){
    APP.namespace('APP.views');

    var MathFn = APP.MathFn;

    APP.views.CanvasView = function(){
        //todo
        //this.canvas;
    };

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLCanvasElement} layer
     * @param {number[]} offset
     * */
    APP.views.CanvasView.drawLayer = function(canvas, layer, offset){
        // кладем буфер региона на холст добавляя смещение
        canvas.getContext('2d').drawImage(layer, offset[0], offset[1]);
    };

}(APP);