!function(APP){
    APP.namespace('APP.controllers');
    /**
     * @class DrawToolController
     * @memberof APP.controllers
     * */
    APP.controllers.DrawToolController = function (appInstance, canvas){
        APP.ToolController.apply(this, arguments);
        this.appInstance = appInstance;
        this.canvas = canvas;
        this.circleView = null;

        //if (appInstance.settings.drawingCursorEnabled){
        //
        //}

        var snapshotView;
        var prevent;
        var that = this;

        this.onMouseDownHideCursor = function(event){
            that.circleView.disable();
            prevent = true;
        };

        this.onMouseMoveMoveCursor = function(){
            if (!prevent){
                snapshotView = new APP.views.CanvasSnapShotView(canvas);

                that.circleView = new APP.CursorCircleView({
                    x: event.layerX,
                    y: event.layerY,
                    canvas: canvas,
                    size: Math.round(appInstance.settings.drawingSize/2),
                    color: '#' + appInstance.settings.drawingColor
                });

                that.circleView.enable();

                //snapshotView.redrawWithLayer(circleView.layer);
            }
        };

        this.onMouseUpShowCursor = function(){
            that.circleView.enable();
            prevent = false;
        };

    };

    APP.controllers.DrawToolController.prototype = Object.create(APP.ToolController.prototype);
    APP.controllers.DrawToolController.prototype.constructor = APP.controllers.DrawToolController;

    APP.controllers.DrawToolController.prototype.start = function(){
        //this.circleView.enable();
        this.canvas.addEventListener('mousedown', this.onMouseDownHideCursor, false);
        this.canvas.addEventListener('mousemove', this.onMouseMoveMoveCursor, false);
        this.canvas.addEventListener('mouseup', this.onMouseUpShowCursor, false);
    };
    APP.controllers.DrawToolController.prototype.stop = function(){
        this.circleView.disable();
        this.canvas.removeEventListener('mousedown', this.onMouseDownHideCursor);
        this.canvas.removeEventListener('mousemove', this.onMouseMoveMoveCursor);
        this.canvas.removeEventListener('mouseup', this.onMouseUpShowCursor);
    };

    /**
     * Создает новое изображение нарисованной линии и сохраняет
     * */
    APP.controllers.DrawToolController.prototype.publicNewObject = function(){
        if (this.object){
            this.appInstance.newEvent('CREATED_REGION', [
                this.object
            ]);
        }
    };

}(APP);