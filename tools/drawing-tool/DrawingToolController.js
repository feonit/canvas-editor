function DrawingToolController(canvas){

    var tool = new DrawingTool(canvas);
    var ctx;

    ctx = canvas.getContext("2d");

    var optionsDraw = {
        lineWidth: 20,
        //lineCap: 'square',
        //lineJoin: 'square',
        lineCap: 'round',
        lineJoin: 'round',
    };

    function mousedown(event){
        tool.drawingStart(event.layerX, event.layerY);
    }

    function mousemove(event){
        tool.drawingContinue(event.layerX, event.layerY);
    }

    function mouseup(event){
        tool.drawingEnd(event.layerX, event.layerY);
    }

    this.start = function(){
        ctx = canvas.getContext("2d");
        ctx.lineCap = optionsDraw.lineCap;
        ctx.lineJoin = optionsDraw.lineJoin;
        ctx.lineWidth = optionsDraw.lineWidth;
        ctx.strokeStyle = 'blue';

        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        canvas.addEventListener('mousedown', mousedown, false);
        canvas.addEventListener('mousemove', mousemove, false);
        canvas.addEventListener('mouseup', mouseup, false);
    };

    this.stop = function(){
        canvas.removeEventListener('mousedown', mousedown);
        canvas.removeEventListener('mousemove', mousemove);
        canvas.removeEventListener('mouseup', mouseup);
    }
}

DrawingToolController.prototype = Object.create(ToolController);
DrawingToolController.prototype.constructor = DrawingToolController;