!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.controllers.ToolController;

    APP.controllers.TransparentUtilController = function (appInstance, canvas){
        this.start = function(){
            canvas.classList.add("background-canvas");
        };

        this.stop = function(){
            canvas.classList.remove("background-canvas");
        };
    };
    APP.controllers.TransparentUtilController.prototype = Object.create(ToolController);
    APP.controllers.TransparentUtilController.prototype.constructor = APP.controllers.TransparentUtilController;
}(APP);