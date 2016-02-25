!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor.ToolController').DrawingToolController = DrawingToolController;

    function DrawingToolController(appInstance, canvas){

        var tool = new CanvasEditor.Tool.DrawingTool(appInstance, canvas);


        function mousedown(event){
            var ctx = canvas.getContext("2d");
            ctx = canvas.getContext("2d");
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            tool.setOptions({
                color: CanvasEditor.MathFn.hexToRgb(appInstance.options.drawingColor),
                size: appInstance.options.drawingSize,
                type: appInstance.options.drawingType
            });

            tool.drawingStart(event.layerX, event.layerY);
        }

        function mousemove(event){
            tool.drawingContinue(event.layerX, event.layerY);
        }

        function mouseup(event){
            tool.drawingEnd(event.layerX, event.layerY);
        }

        this.start = function(){
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

    DrawingToolController.prototype = Object.create(CanvasEditor.ToolController);
    DrawingToolController.prototype.constructor = DrawingToolController;

}(CanvasEditor);