!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.core.ToolController;
    var SelectTool = APP.tools.SelectTool;
    APP.controllers.SelectToolController = function (appInstance, canvas){

        var tool = new SelectTool(appInstance, canvas);

        function mousedown(event){
            tool.selectObjectByCoordinate(event.offsetX, event.offsetY);
            event.preventDefault();// double select text around
        }

        function keydown(event){
            if (event.code == "Delete"){
                tool.deleteSelectedObjects();
                appInstance.mediator.publish(appInstance.UPDATE_CANVAS_EVENT);
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
    };
    APP.controllers.SelectToolController.prototype = Object.create(ToolController);
    APP.controllers.SelectToolController.prototype.constructor = APP.controllers.SelectToolController;
}(APP);