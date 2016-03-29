!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.controllers.ToolController;
    var DraggingTool = APP.tools.DraggingTool;

    APP.controllers.DraggingToolController = function (appInstance, canvas){

        var tool = new DraggingTool(appInstance, canvas);
        var cursorView = new APP.views.CursorView({canvas, canvas});
        var mouseIsPressed = false;

        function mousedown(event){
            if (event.which == 1){ // выделяем объект левой
                tool.draggingStart(event.clientX, event.clientY);
                mouseIsPressed = true;
                cursorView.setGrabbing();

            } else if (event.which == 2 || event.which == 3){ // снимаем выделение средней и правой кнопкой
                tool.removeSelection();
            }
        }

        function mousemove(event){
            tool.draggingContinue(event.clientX, event.clientY);
            if (!mouseIsPressed){
                checkIfGrab(event.clientX, event.clientY);
            }
        }

        function checkIfGrab(x, y){
            var search = appInstance.regionManager.searchRegionByCoordinate(x, y);
            if (search){
                cursorView.setGrab();
            } else {
                cursorView.deleteGrab();
            }
        }

        function mouseup(event){
            mouseIsPressed = false;
            tool.draggingEnd(event.clientX, event.clientY);
            cursorView.deleteGrabbing();
            appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
        }

        this.start = function(){
            canvas.addEventListener('mousedown', mousedown, false);
            canvas.addEventListener('mousemove', mousemove, false);
            canvas.addEventListener('mouseup', mouseup, false);
        };
        this.stop = function(){
            canvas.removeEventListener('mousedown', mousedown);
            canvas.removeEventListener('mousemove', mousemove);
            canvas.removeEventListener('mouseup', mouseup);
        };
    };
    APP.controllers.DraggingToolController.prototype = Object.create(ToolController);
    APP.controllers.DraggingToolController.prototype.constructor = APP.controllers.DraggingToolController;
}(APP);