!function(APP){
    APP.namespace('APP.controllers');

    APP.controllers.DrawCurveController = function (appInstance, canvas){
        APP.controllers.DrawToolController.apply(this, arguments);

        this.__super = APP.controllers.DrawToolController.prototype;

        var snapshotView;
        var isDrawStarted = false;
        var that = this;
        var object = null;

        // буфер для работы с кривой
        var bufferCanvas = null;
        var bufferPoints = null;

        this.onMouseDown = function(event){
            snapshotView = new APP.views.CanvasSnapShotView(canvas);
            bufferPoints = [new APP.Point(event.layerX, event.layerY)];
            isDrawStarted = true;
            bufferCanvas = document.createElement('canvas');
            bufferCanvas.width = canvas.width;
            bufferCanvas.height = canvas.height;
            _change();
        };

        this.onMouseMove = function(event){
            if (!isDrawStarted) return;
            bufferPoints.push(new APP.Point(event.layerX, event.layerY));
            _change();
        };

        this.onMouseUp = function(event){
            bufferPoints.push(new APP.Point(event.layerX, event.layerY));
            object = new APP.objects.CurveComplexVectorAbstract({
                points: bufferPoints,
                size: appInstance.settings.drawingSize,
                color: APP.MathFn.hexToRgb(appInstance.settings.drawingColor),
                width: canvas.width,
                height: canvas.height
            });
            _change();
            that.publicNewObject(object);

            isDrawStarted = false;
            bufferCanvas = null;
            bufferPoints = null;
            object = null;
        };

        var _change = function(){
            // способ ускоряет отрисовку, без создания промежуточных объектов
            var coordinates = APP.MathFn.drawBezierCurve(new APP.Curve(bufferPoints));
            APP.views.VectorLayerAbstractView.renderCircles(
                bufferCanvas,
                coordinates,
                APP.MathFn.hexToRgb(appInstance.settings.drawingColor),
                Math.floor(appInstance.settings.drawingSize/2)
            );

            snapshotView.redrawWithLayer(bufferCanvas);
        };
    };
    APP.controllers.DrawCurveController.prototype = Object.create(APP.controllers.DrawToolController.prototype);
    APP.controllers.DrawCurveController.prototype.constructor = APP.controllers.DrawCurveController;

    APP.controllers.DrawCurveController.prototype.start = function(){
        this.__super.start.apply(this, arguments);
        this.canvas.addEventListener('mousedown', this.onMouseDown, false);
        this.canvas.addEventListener('mousemove', this.onMouseMove, false);
        this.canvas.addEventListener('mouseup', this.onMouseUp, false);
    };
    APP.controllers.DrawCurveController.prototype.stop = function(){
        this.__super.stop.apply(this, arguments);
        this.canvas.removeEventListener('mousedown', this.onMouseDown);
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
        this.canvas.removeEventListener('mouseup', this.onMouseUp);
    };

}(APP);