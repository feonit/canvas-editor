!function(App){

    App.namespace('App.controllers').FigureToolController = FigureToolController;

    function FigureToolController(appInstance, canvas) {

        var tool = new App.tools.FigureTool(appInstance, canvas);

        var process = false;

        function mousedown(event) {
            if (process) return;
            process = true;
            tool.figureStart(event.layerX, event.layerY, appInstance.options.lineColor, App.MathFn.hexToRgba(appInstance.options.lineWidth));
        }

        function mousemove(event) {
            if (!process) return;
            tool.figureContinue(event.layerX, event.layerY);
        }

        function mouseup(event) {
            if (!process) return;
            process= false;
            tool.figureEnd(event.layerX, event.layerY);
        }

        this.start = function () {
            canvas.addEventListener('mousedown', mousedown, false);
            canvas.addEventListener('mousemove', mousemove, false);
            canvas.addEventListener('mouseup', mouseup, false);
        };
        this.stop = function () {
            canvas.removeEventListener('mousedown', mousedown);
            canvas.removeEventListener('mousemove', mousemove);
            canvas.removeEventListener('mouseup', mouseup);
        };
    }
}(App);