!function(App){

    App.namespace('App.controllers').DraggingToolController = DraggingToolController;

    function DraggingToolController(app, canvas){

        var tool = new App.tools.DraggingTool(app, canvas);

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
            document.addEventListener('mousedown', mousedown, false);
            document.addEventListener('mousemove', mousemove, false);
            document.addEventListener('mouseup', mouseup, false);
        };
        this.stop = function(){
            document.removeEventListener('mousedown', mousedown);
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        };
    }

    DraggingToolController.prototype = Object.create(App.ToolController);
    DraggingToolController.prototype.constructor = DraggingToolController;

}(App);