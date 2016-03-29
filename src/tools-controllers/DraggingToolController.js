!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.core.ToolController;
    var DraggingTool = APP.tools.DraggingTool;

    /**
     * Контроллер для переноса объектов
     * @class
     * @memberof APP.controllers
     * */
    APP.controllers.DraggingToolController = function (appInstance, canvas){

        var tool = new DraggingTool(appInstance, canvas);
        var cursorView = new APP.views.CursorView({canvas, canvas});
        var mouseIsPressed = false;
        var cursorOverObject = false;

        function mousedown(event){
            if (event.which == 1){ // выделяем объект левой
                tool.draggingStart(event.offsetX, event.offsetY);
                mouseIsPressed = true;

                if (cursorOverObject){
                    cursorView.setGrabbing();
                }

            } else if (event.which == 2 || event.which == 3){ // снимаем выделение средней и правой кнопкой
                tool.removeSelection();
            }
        }

        function mousemove(event){
            tool.draggingContinue(event.offsetX, event.offsetY);
            if (!mouseIsPressed){
                checkIfGrab(event.offsetX, event.offsetY);
            }
        }

        function checkIfGrab(x, y){
            var search = appInstance.regionManager.searchRegionByCoordinate(x, y);

            cursorOverObject = !!search;

            if (search){
                cursorView.setGrab();
            } else {
                cursorView.deleteGrab();
                cursorView.deleteGrabbing();
            }
        }

        function mouseup(event){
            mouseIsPressed = false;
            tool.draggingEnd(event.offsetX, event.offsetY);
            cursorView.deleteGrabbing();
            appInstance.mediator.publish(appInstance.UPDATE_CANVAS_EVENT);
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