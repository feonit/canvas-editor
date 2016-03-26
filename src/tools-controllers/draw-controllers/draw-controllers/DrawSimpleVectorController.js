!function(APP){
    APP.namespace('APP.controllers');

    APP.controllers.DrawSimpleVectorController = function (appInstance, canvas){
        APP.controllers.DrawToolController.apply(this, arguments);
        this.__super = APP.controllers.DrawToolController.prototype;

        // начальная позиция
        var x0, y0;
        // снимок
        var snapshotView;
        // рисуемый объект
        var object;

        var isDrawStarted = false;
        var ObjectConstructor;
        var that = this;

        this.onMouseDown = function(event){
            snapshotView = new APP.views.CanvasSnapShotView(canvas);
            ObjectConstructor = map[appInstance.settings.drawingType];
            x0 = event.layerX;
            y0 = event.layerY;
            _change(x0, y0, x0, y0);
            isDrawStarted = true;
        };

        this.onMouseMove = function(event){
            if (!isDrawStarted) return;
            _change(x0, y0, event.layerX, event.layerY);
        };

        this.onMouseUp = function(event){
            _change(x0, y0, event.layerX, event.layerY);
            isDrawStarted = false;
            that.publicNewObject(object);
        };

        var map = {
            "ARROW_TYPE": APP.objects.ArrowSimpleVectorAbstract,
            "ELLIPSE_TYPE": APP.objects.EllipseSimpleVectorAbstract,
            "LINE_TYPE": APP.objects.LineSimpleVectorAbstract,
            "RECTANGLE_TYPE": APP.objects.RectangleSimpleVectorAbstract
        };

        var _change = function (x0, y0, x1, y1){
            object = new ObjectConstructor({
                x0: x0,
                y0: y0,
                x1: x1,
                y1: y1,
                width: canvas.width,
                height: canvas.height,
                size: appInstance.settings.drawingSize,
                color: APP.MathFn.hexToRgb(appInstance.settings.drawingColor)
            });
            var view = new APP.views.VectorLayerAbstractView({
                coordinatesLine: object.coordinatesLine,
                size: object.size,
                color: object.color,
                width: object.width,
                height: object.height
            });
            snapshotView.redrawWithLayer(view.layer);
        };
    };
    APP.controllers.DrawSimpleVectorController.prototype = Object.create(APP.controllers.DrawToolController.prototype);
    APP.controllers.DrawSimpleVectorController.prototype.constructor = APP.controllers.DrawSimpleVectorController;

    APP.controllers.DrawSimpleVectorController.prototype.start = function(){
        this.__super.start.apply(this, arguments);
        this.canvas.addEventListener('mousedown', this.onMouseDown, false);
        this.canvas.addEventListener('mousemove', this.onMouseMove, false);
        this.canvas.addEventListener('mouseup', this.onMouseUp, false);
    };
    APP.controllers.DrawSimpleVectorController.prototype.stop = function(){
        this.__super.stop.apply(this, arguments);
        this.canvas.removeEventListener('mousedown', this.onMouseDown);
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
        this.canvas.removeEventListener('mouseup', this.onMouseUp);
    };

}(APP);