!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.ToolController;
    var EraserTool = APP.tools.EraserTool;
    APP.controllers.EraserToolController = function (appInstance, canvas){

        var tool = new EraserTool(appInstance, canvas);

        function mousedown(event){
            tool.setOptions({ size:  appInstance.settings.eraserSize });
            tool.eraserStart(event.layerX, event.layerY);
        }

        function mousemove(event){
            tool.eraserContinue(event.layerX, event.layerY);
        }

        function mouseup(event){
            tool.eraserEnd(event.layerX, event.layerY);
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
        };
    };
    APP.controllers.EraserToolController.prototype = Object.create(ToolController);
    APP.controllers.EraserToolController.prototype.constructor = APP.controllers.EraserToolController;
}(APP);