!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.ToolController;
    var DrawingTool = APP.tools.DrawingTool;
    var MathFn = APP.MathFn;

    APP.controllers.DrawingToolController = function (appInstance, canvas){

        var tool = new DrawingTool(appInstance, canvas);

        this.startDraw = function (event){
            var ctx = canvas.getContext("2d");
            ctx = canvas.getContext("2d");
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            tool.setOptions({
                color: MathFn.hexToRgb(appInstance.settings.drawingColor),
                size: appInstance.settings.drawingSize,
                type: appInstance.settings.drawingType
            });

            tool.drawingStart(event.layerX, event.layerY);
        };

        this.continueDraw = function (event){
            tool.drawingContinue(event.layerX, event.layerY);
        };

        this.endDraw = function (event){
            tool.drawingEnd(event.layerX, event.layerY);
            appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
        };

        if (appInstance.settings.drawingCursorEnabled){
            // стилевой параметр
            var cursor = "";

            // параметр контекста холста новый
            var strokeStyle;

            // параметр контекста холста первоначальный
            var strokeStyleOriginal;

            // помечается ситуация, в которой курсор не должен быть виден
            var prevent;

            // помечается ситуация, в которой курсор не должен быть виден
            var phase;

            var that = this;

            /**
             * Курсор становится видным
             * */
            this.enableCursor = function (){
                prevent = false;

                canvas.addEventListener('mousemove', that.cursorMove, false);
                canvas.addEventListener('mouseout', that.cursorOut, false);
                cursor = canvas.style.cursor;
                var ctx=canvas.getContext("2d");
                strokeStyleOriginal = ctx.strokeStyle;
                canvas.style.cursor = "none";

                phase = tool._lastPhase;

                Object.defineProperty(tool, '_lastPhase', {
                    set(value){
                        if (value !== "END_PHASE"){
                            prevent = true;
                        } else {
                            prevent = false;
                        }
                        phase = value;
                    },
                    get(){
                        return phase;
                    }
                });
            };

            /**
             * Курсор перемещается
             * */
            this.cursorMove = function (event){
                appInstance.regionManager.redrawLayers();

                if (prevent) return;

                var ctx=canvas.getContext("2d");
                ctx.beginPath();

                strokeStyle = '#' + appInstance.settings.drawingColor;
                ctx.strokeStyle=strokeStyle;

                ctx.arc(event.layerX, event.layerY, Math.round(appInstance.settings.drawingSize/2), 0, 2*Math.PI);
                ctx.stroke();
            };

            /**
             * Курсор скрывается за пределами холста
             * */
            this.cursorOut = function (){
                appInstance.regionManager.redrawLayers();
            };

            /**
             * Отключает функционал, восстанавливает состояние холста в прежнее
             * */
            this.disableCursor = function (){
                canvas.removeEventListener('mousemove', that.cursorMove);
                canvas.removeEventListener('mouseout', that.cursorOut);
                canvas.style.cursor = cursor;
                var ctx=canvas.getContext("2d");
                ctx.strokeStyle = strokeStyleOriginal;

                //todo
                if (appInstance.toolsDriver._instanceTool.tool && appInstance.toolsDriver._instanceTool.tool._lastPhase){
                    Object.defineProperty(appInstance.toolsDriver._instanceTool.tool, '_lastPhase',
                        {value: phase, writable: true, enumerable: true, configurable: true});
                }
            };
        }


        this.start = function(){
            canvas.addEventListener('mousedown', this.startDraw, false);
            canvas.addEventListener('mousemove', this.continueDraw, false);
            canvas.addEventListener('mouseup', this.endDraw, false);

            if (appInstance.settings.drawingCursorEnabled){
                this.enableCursor();
                canvas.addEventListener('mousedown', this.disableCursor, false);
                canvas.addEventListener('mouseup', this.enableCursor, false);
            }
        };

        this.stop = function(){
            canvas.removeEventListener('mousedown', this.startDraw);
            canvas.removeEventListener('mousemove', this.continueDraw);
            canvas.removeEventListener('mouseup', this.endDraw);

            if (appInstance.settings.drawingCursorEnabled){
                this.disableCursor();
                canvas.removeEventListener('mousedown', this.disableCursor);
                canvas.removeEventListener('mouseup', this.enableCursor);
            }
        }
    };
    APP.controllers.DrawingToolController.prototype = Object.create(ToolController);
    APP.controllers.DrawingToolController.prototype.constructor = APP.controllers.DrawingToolController;
}(APP);