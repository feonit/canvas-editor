!function(App){

    App.namespace('App.controllers').DrawingToolController = DrawingToolController;

    function DrawingToolController(appInstance, canvas){

        var tool = new App.tools.DrawingTool(appInstance, canvas);


        function mousedown(event){
            var ctx = canvas.getContext("2d");
            ctx = canvas.getContext("2d");
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            tool.drawingStart(event.layerX, event.layerY, App.MathFn.hexToRgb(appInstance.options.lineColor), appInstance.options.lineWidth);
        }

        function mousemove(event){
            tool.drawingContinue(event.layerX, event.layerY);
        }

        function mouseup(event){
            tool.drawingEnd(event.layerX, event.layerY);
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
        }
    }

    DrawingToolController.prototype = Object.create(App.ToolController);
    DrawingToolController.prototype.constructor = DrawingToolController;

}(App);