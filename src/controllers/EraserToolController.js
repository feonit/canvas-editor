!function(App){

    App.namespace('App.controllers').EraserToolController = EraserToolController;

    function EraserToolController(appInstance, canvas){

        var tool = new App.tools.EraserTool(appInstance, canvas);

        function mousedown(event){
            tool.eraserStart(event.layerX, event.layerY, appInstance.options.lineWidth);
        }

        function mousemove(event){
            tool.eraserContinue(event.layerX, event.layerY);
        }

        function mouseup(event){
            tool.eraserEnd(event.layerX, event.layerY);
        }

        this.start = function(){
            document.addEventListener('mousedown', mousedown, false);
            document.addEventListener('mousemove', mousemove, false);
            document.addEventListener('mouseup', mouseup, false);
        };
        this.stop = function(){
            document.removeEventListener('mousedown', mousedown);
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        };
    }

    EraserToolController.prototype = Object.create(App.ToolController);
    EraserToolController.prototype.constructor = EraserToolController;

}(App);