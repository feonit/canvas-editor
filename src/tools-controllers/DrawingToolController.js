!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.ToolController;
    var DrawingTool = APP.tools.DrawingTool;
    var MathFn = APP.MathFn;

    APP.controllers.DrawingToolController = function (appInstance, canvas){

        var tool = new DrawingTool(appInstance, canvas);

        //todo
        this.tool = tool;

        function mousedown(event){
            var ctx = canvas.getContext("2d");
            ctx = canvas.getContext("2d");
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            tool.setOptions({
                color: MathFn.hexToRgb(appInstance.settings.drawingColor),
                size: appInstance.settings.drawingSize,
                type: appInstance.settings.drawingType
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
    };
    APP.controllers.DrawingToolController.prototype = Object.create(ToolController);
    APP.controllers.DrawingToolController.prototype.constructor = APP.controllers.DrawingToolController;
}(APP);