!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor.ToolController').CursorOptionsUtilController = CursorOptionsUtilController;

    function CursorOptionsUtilController(appInstance, canvas){

        var cursor = "";
        var strokeStyle;
        var strokeStyleOriginal;
        var prevent = false;

        function mousemove(event){
            appInstance.regionManager.redrawLayers();

            if (prevent) return;

            var ctx=canvas.getContext("2d");
            ctx.beginPath();

            strokeStyle = '#' + appInstance.settings.drawingColor;
            ctx.strokeStyle=strokeStyle;

            ctx.arc(event.layerX, event.layerY, Math.round(appInstance.settings.drawingSize/2), 0, 2*Math.PI);
            ctx.stroke();
        }

        function mouseout(){
            appInstance.regionManager.redrawLayers();
        }

        var phase;

        this.start = function(){
            cursor = canvas.style.cursor;
            var ctx=canvas.getContext("2d");
            strokeStyleOriginal = ctx.strokeStyle;
            canvas.style.cursor = "none";
            canvas.addEventListener('mousemove', mousemove, false);
            canvas.addEventListener('mouseout', mouseout, false);

            phase = appInstance.toolsDriver._register.DrawingToolController.tool._lastPhase;

            Object.defineProperty(appInstance.toolsDriver._register.DrawingToolController.tool, '_lastPhase', {
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
        this.stop = function(){
            canvas.style.cursor = cursor;
            canvas.removeEventListener('mousemove', mousemove);
            canvas.removeEventListener('mouseout', mouseout);
            var ctx=canvas.getContext("2d");
            ctx.strokeStyle = strokeStyleOriginal;

            Object.defineProperty(appInstance.toolsDriver._register.DrawingToolController.tool, '_lastPhase',
                {value: phase, writable: true, enumerable: true, configurable: true});

        };
    }

    CursorOptionsUtilController.prototype = Object.create(CanvasEditor.ToolController);
    CursorOptionsUtilController.prototype.constructor = CursorOptionsUtilController;

}(CanvasEditor);