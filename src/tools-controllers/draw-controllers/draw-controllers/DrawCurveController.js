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
            bufferPoints = [new APP.Point(event.clientX, event.clientY)];
            isDrawStarted = true;
            bufferCanvas = document.createElement('canvas');
            bufferCanvas.width = canvas.width;
            bufferCanvas.height = canvas.height;
            _change();
        };

        this.onMouseMove = function(event){
            if (!isDrawStarted) return;
            bufferPoints.push(new APP.Point(event.clientX, event.clientY));
            _change();
        };

        this.onMouseUp = function(event){
            bufferPoints.push(new APP.Point(event.clientX, event.clientY));
            object = new APP.objects.CurveComplexVectorAbstract({
                points: bufferPoints,
                size: appInstance.settings.drawingSize,
                color: APP.core.MathFn.hexToRgb(appInstance.settings.drawingColor),
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
            var coordinates = APP.core.MathFn.drawBezierCurve(new APP.Curve(bufferPoints));
            APP.views.VectorLayerAbstractView.renderCircles(
                bufferCanvas,
                coordinates,
                APP.core.MathFn.hexToRgb(appInstance.settings.drawingColor),
                Math.floor(appInstance.settings.drawingSize/2)
            );

            snapshotView.redrawWithLayer(bufferCanvas);
        };

        this.start = function(){
            this.__super.start.apply(this, arguments);
            canvas.addEventListener('mousedown', this.onMouseDown, false);
            canvas.addEventListener('mousemove', this.onMouseMove, false);
            canvas.addEventListener('mouseup', this.onMouseUp, false);
        };

        this.stop = function(){
            this.__super.stop.apply(this, arguments);
            canvas.removeEventListener('mousedown', this.onMouseDown);
            canvas.removeEventListener('mousemove', this.onMouseMove);
            canvas.removeEventListener('mouseup', this.onMouseUp);
        }
    };
    APP.controllers.DrawCurveController.prototype = Object.create(APP.controllers.DrawToolController.prototype);
    APP.controllers.DrawCurveController.prototype.constructor = APP.controllers.DrawCurveController;
}(APP);