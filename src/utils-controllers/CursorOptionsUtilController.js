!function(APP, Math){
    APP.namespace('APP.controllers');
    var ToolController = APP.ToolController;

    APP.controllers.CursorOptionsUtilController = function (appInstance, canvas){

        var cursor = "";
        var strokeStyle;
        var strokeStyleOriginal;
        var prevent;

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

        function mousedown(){
            disable();
        }

        function mouseup(){
            enable();
        }

        function disable(){
            canvas.removeEventListener('mousemove', mousemove);
            canvas.removeEventListener('mouseout', mouseout);
            canvas.style.cursor = cursor;
            var ctx=canvas.getContext("2d");
            ctx.strokeStyle = strokeStyleOriginal;

            //todo
            if (appInstance.toolsDriver._instanceTool.tool && appInstance.toolsDriver._instanceTool.tool._lastPhase){
                Object.defineProperty(appInstance.toolsDriver._instanceTool.tool, '_lastPhase',
                    {value: phase, writable: true, enumerable: true, configurable: true});
            }
        }

        function enable(){
            prevent = false;

            canvas.addEventListener('mousemove', mousemove, false);
            canvas.addEventListener('mouseout', mouseout, false);
            cursor = canvas.style.cursor;
            var ctx=canvas.getContext("2d");
            strokeStyleOriginal = ctx.strokeStyle;
            canvas.style.cursor = "none";

            phase = appInstance.toolsDriver._instanceTool.tool._lastPhase;

            //todo
            if (appInstance.toolsDriver._instanceTool.tool && appInstance.toolsDriver._instanceTool.tool._lastPhase){
                Object.defineProperty(appInstance.toolsDriver._instanceTool.tool, '_lastPhase', {
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
            }
        }

        var phase;

        this.start = function(){
            enable();

            canvas.addEventListener('mousedown', mousedown, false);
            canvas.addEventListener('mouseup', mouseup, false);
        };

        this.stop = function(){
            disable();

            canvas.removeEventListener('mousedown', mousedown);
            canvas.removeEventListener('mouseup', mouseup);

        };
    };
    APP.controllers.CursorOptionsUtilController.prototype = Object.create(ToolController);
    APP.controllers.CursorOptionsUtilController.prototype.constructor = APP.controllers.CursorOptionsUtilController;
}(APP, Math);