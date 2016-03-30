!function(APP){
    APP.namespace('APP.controllers');

    /**
     * Контроллер для рисования ломанной линии
     * @class
     * @memberof APP.controllers
     * */
    APP.controllers.DrawBrokenVectorController = function (appInstance, canvas){
        APP.core.DrawToolController.apply(this, arguments);

        this.__super = APP.core.DrawToolController.prototype;

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
                points.push([event.offsetX, event.offsetY]);
                isDrawStarted = true;
            }
        };

        this.onMouseMove = function(event){
            if (isDrawStarted){
                _change(points.concat([[event.offsetX, event.offsetY]]));
            }
        };

        this.onMouseUp = function(event){
            picked = true;
            points.push([event.offsetX, event.offsetY]);
            _change(points);
        };

        this.onMouseDoubleClick = function(){
            _change(points);
            isDrawStarted = false;
            picked = false;
            points = null;
            that.publicNewObject(object);
            object = null;
        };

        var _change = function(points){
            object = new APP.objects.BrokenComplexVector({
                points: points,
                width: canvas.width,
                height: canvas.height,
                size: appInstance.settings.drawingSize,
                color: APP.core.MathFn.hexToRgb(appInstance.settings.drawingColor)
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
    APP.controllers.DrawBrokenVectorController.prototype = Object.create(APP.core.DrawToolController.prototype);
    APP.controllers.DrawBrokenVectorController.prototype.constructor = APP.controllers.DrawBrokenVectorController;

    APP.controllers.DrawBrokenVectorController.prototype.start = function(){
        this.__super.start.apply(this, arguments);
        this.canvas.addEventListener('mousedown', this.onMouseDown, false);
        this.canvas.addEventListener('mousemove', this.onMouseMove, false);
        this.canvas.addEventListener('mouseup', this.onMouseUp, false);
        this.canvas.addEventListener('dblclick', this.onMouseDoubleClick, false);
    };
    APP.controllers.DrawBrokenVectorController.prototype.stop = function(){
        this.__super.stop.apply(this, arguments);
        this.canvas.removeEventListener('mousedown', this.onMouseDown);
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
        this.canvas.removeEventListener('mouseup', this.onMouseUp);
        this.canvas.removeEventListener('dblclick', this.onMouseDoubleClick);
    };
}(APP);