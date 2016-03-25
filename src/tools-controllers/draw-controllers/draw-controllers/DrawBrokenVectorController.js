!function(APP){
    APP.namespace('APP.controllers');

    APP.controllers.DrawBrokenVectorController = function (appInstance, canvas){
        // снимок
        var snapshotView;
        // рисуемый объект
        var object;

        var isDrawStarted = false;
        var that = this;
        var points;
        var picked = false;
        //var doubleMouseDown = false;

        this.onMouseDown = function(event){
            if (!picked){
                points = [];
                snapshotView = new APP.views.CanvasSnapShotView(canvas);
                points.push([event.layerX, event.layerY]);
                isDrawStarted = true;
            }
        };

        this.onMouseMove = function(event){
            if (isDrawStarted){
                _change(points.concat([[event.layerX, event.layerY]]));
            }
        };

        this.onMouseUp = function(event){
            picked = true;
            points.push([event.layerX, event.layerY]);
            _change(points);
        };

        this.onMouseDoubleClick = function(){
            _change(points);
            isDrawStarted = false;
            picked = false;
            points = null;
            object = null;
            that.publicNewObject(object);
        };

        var _change = function(points){
            object = new APP.objects.BrokenComplexVectorAbstract({
                points: points,
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

        this.start = function(){
            canvas.addEventListener('mousedown', this.onMouseDown, false);
            canvas.addEventListener('mousemove', this.onMouseMove, false);
            canvas.addEventListener('mouseup', this.onMouseUp, false);
            canvas.addEventListener('dblclick', this.onMouseDoubleClick, false);
        };

        this.stop = function(){
            canvas.removeEventListener('mousedown', this.onMouseDown);
            canvas.removeEventListener('mousemove', this.onMouseMove);
            canvas.removeEventListener('mouseup', this.onMouseUp);
            canvas.removeEventListener('dblclick', this.onMouseDoubleClick);
        }
    };
    APP.controllers.DrawBrokenVectorController.prototype = Object.create(APP.controllers.DrawToolController.prototype);
    APP.controllers.DrawBrokenVectorController.prototype.constructor = APP.controllers.DrawBrokenVectorController;
}(APP);