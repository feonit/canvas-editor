!function(App){

    App.namespace('App.controllers').FigureToolController = FigureToolController;

    function FigureToolController(appInstance, canvas) {

        var tool = new App.tools.FigureTool(appInstance, canvas);

        var process = false;

        function mousedown(event) {
            if (process) return;
            process = true;
            tool.figureStart(
                event.layerX,
                event.layerY,
                App.MathFn.hexToRgba(appInstance.options.lineColor),
                appInstance.options.lineWidth,
                appInstance.options.figureType
            );
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
            document.addEventListener('mousedown', mousedown, false);
            document.addEventListener('mousemove', mousemove, false);
            document.addEventListener('mouseup', mouseup, false);
        };
        this.stop = function () {
            document.removeEventListener('mousedown', mousedown);
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        };
    }
}(App);