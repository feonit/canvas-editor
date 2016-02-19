!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').ToolController = ToolController;

    /**
     * @class ToolController
     * @memberof CanvasEditor
     * */
    function ToolController(){}
    /**
     * Включение инструмента
     * */
    ToolController.prototype.start = function(){
        throw "method must be implemented";
    };
    /**
     * Отключение инструмента
     * */
    ToolController.prototype.stop = function(){
        throw "method must be implemented";
    };

}(CanvasEditor);