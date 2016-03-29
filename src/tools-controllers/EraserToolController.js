!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.controllers.ToolController;
    var EraserTool = APP.tools.EraserTool;
    APP.controllers.EraserToolController = function (appInstance, canvas){

        var tool = new EraserTool(appInstance, canvas);

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

        this.onMouseMoveMoveCircle = function(){
            if (!prevent){

                if (!snapshotView){
                    snapshotView = new APP.views.CanvasSnapShotView(canvas);
                }

                var circleView = new APP.views.CursorSquareView({
                    x: event.clientX,
                    y: event.clientY,
                    height: canvas.height,
                    width: canvas.width,
                    size: Math.round(appInstance.settings.drawingSize)
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

        function mousedown(event){
            tool.setOptions({ size:  appInstance.settings.eraserSize });
            tool.eraserStart(event.clientX, event.clientY);
        }

        function mousemove(event){
            tool.eraserContinue(event.clientX, event.clientY);
        }

        function mouseup(event){
            tool.eraserEnd(event.clientX, event.clientY);
            appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
            appInstance.regionManager.reset();
        }

        this.start = function(){
            this.saveCursor();
            canvas.addEventListener('mousedown', this.onMouseDownHideCircle, false);
            canvas.addEventListener('mousemove', this.onMouseMoveMoveCircle, false);
            canvas.addEventListener('mouseup', this.onMouseUpShowCircle, false);
            canvas.addEventListener('mouseout', this.onMouseOut, false);

            canvas.addEventListener('mousedown', mousedown, false);
            canvas.addEventListener('mousemove', mousemove, false);
            canvas.addEventListener('mouseup', mouseup, false);
        };
        this.stop = function(){
            this.restoreCursor();
            canvas.removeEventListener('mousedown', this.onMouseDownHideCircle);
            canvas.removeEventListener('mousemove', this.onMouseMoveMoveCircle);
            canvas.removeEventListener('mouseup', this.onMouseUpShowCircle);
            canvas.removeEventListener('mouseout', this.onMouseOut);

            canvas.removeEventListener('mousedown', mousedown);
            canvas.removeEventListener('mousemove', mousemove);
            canvas.removeEventListener('mouseup', mouseup);
        };
    };
    APP.controllers.EraserToolController.prototype = Object.create(ToolController);
    APP.controllers.EraserToolController.prototype.constructor = APP.controllers.EraserToolController;
}(APP);