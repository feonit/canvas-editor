!function(APP){
    APP.namespace('APP.core');
    /**
     * Базовое поведение для инструмента рисования
     * @class
     * @memberof APP.core
     * */
    APP.core.DrawToolController = function (appInstance, canvas){
        APP.core.ToolController.apply(this, arguments);
        this.appInstance = appInstance;
        this.canvas = canvas;

        // снимок
        var snapshotView;

        // отключен
        var prevent;

        // курсор
        var savedCursorStyle;

        var that = this;

        this.saveCursor = function(){
            if (savedCursorStyle === undefined){
                savedCursorStyle = canvas.style.cursor;
                canvas.style.cursor = 'none';
            }
        };

        this.restoreCursor = function(){
            if (savedCursorStyle !== undefined){
                canvas.style.cursor = savedCursorStyle;
                savedCursorStyle = undefined;
            }
        };

        this.onMouseMoveMoveCircle = function(event){
            if (!prevent){

                if (!snapshotView){
                    snapshotView = new APP.views.CanvasSnapShotView(canvas);
                }

                var circleView = new APP.views.CursorCircleView({
                    x: event.offsetX,
                    y: event.offsetY,
                    height: canvas.height,
                    width: canvas.width,
                    size: Math.round(appInstance.settings.drawingSize/2),
                    color: '#' + appInstance.settings.drawingColor
                });

                snapshotView.redrawWithLayer(circleView.layer);
            }
        };

        this.onMouseDownHideCircle = function(event){
            that.restoreCursor();
            if (snapshotView){//dblclick
                snapshotView.restore();
            }
            snapshotView = null;
            prevent = true;
        };

        this.onMouseUpShowCircle = function(){
            that.saveCursor();
            prevent = false;
        };

        this.onMouseOut = function(){
            if (snapshotView){
                snapshotView.restore();
            }
        }
    };

    APP.core.DrawToolController.prototype = Object.create(APP.core.ToolController.prototype);
    APP.core.DrawToolController.prototype.constructor = APP.core.DrawToolController;

    APP.core.DrawToolController.prototype.start = function(){
        if (this.appInstance.settings.drawingCursorEnabled){
            this.saveCursor();
            this.canvas.addEventListener('mousedown', this.onMouseDownHideCircle, false);
            this.canvas.addEventListener('mousemove', this.onMouseMoveMoveCircle, false);
            this.canvas.addEventListener('mouseup', this.onMouseUpShowCircle, false);
            this.canvas.addEventListener('mouseout', this.onMouseOut, false);
        }
    };
    APP.core.DrawToolController.prototype.stop = function(){
        if (this.appInstance.settings.drawingCursorEnabled){
            this.restoreCursor();
            this.canvas.removeEventListener('mousedown', this.onMouseDownHideCircle);
            this.canvas.removeEventListener('mousemove', this.onMouseMoveMoveCircle);
            this.canvas.removeEventListener('mouseup', this.onMouseUpShowCircle);
            this.canvas.removeEventListener('mouseout', this.onMouseOut);
        }
    };

    /**
     * Создает новое изображение нарисованной линии и сохраняет
     * */
    APP.core.DrawToolController.prototype.publicNewObject = function(object){
        if (object){
            this.appInstance.mediator.publish(appInstance.CREATED_REGION_EVENT, object);
            this.appInstance.mediator.publish(appInstance.UPDATE_CANVAS_EVENT);
        }
    };

}(APP);