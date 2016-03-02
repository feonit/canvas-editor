!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor.ToolController').SelectToolController = SelectToolController;

    function SelectToolController(appInstance, canvas){

        var tool = new CanvasEditor.Tool.SelectTool(appInstance, canvas);

        function mousedown(event){
            tool.selectObjectByCoordinate(event.layerX, event.layerY);
            event.preventDefault();// double select text around
        }

        function keydown(event){
            if (event.code == "Delete"){
                tool.deleteSelectedObjects();
            }
        }

        this.start = function(){
            document.addEventListener('keydown', keydown, false);
            canvas.addEventListener('mousedown', mousedown, false);
        };

        this.stop = function(){
            document.removeEventListener('keydown', keydown);
            canvas.removeEventListener('mousedown', mousedown);

            tool.reset();
        }
    }

    SelectToolController.prototype = Object.create(CanvasEditor.ToolController);
    SelectToolController.prototype.constructor = SelectToolController;

}(CanvasEditor);