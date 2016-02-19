!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor.ToolController').DraggingToolController = DraggingToolController;

    function DraggingToolController(appInstance, canvas){

        var tool = new CanvasEditor.Tool.DraggingTool(appInstance, canvas);

        function mousedown(event){
            if (event.which == 1){ // выделяем объект левой
                tool.draggingStart(event.layerX, event.layerY);

            } else if (event.which == 2 || event.which == 3){ // снимаем выделение средней и правой кнопкой
                tool.removeSelection();
            }
        }

        function mousemove(event){
            tool.draggingContinue(event.layerX, event.layerY);
        }

        function mouseup(event){
            tool.draggingEnd(event.layerX, event.layerY);
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
    }

    DraggingToolController.prototype = Object.create(CanvasEditor.ToolController);
    DraggingToolController.prototype.constructor = DraggingToolController;

}(CanvasEditor);