!function(App){

    App.namespace('App').ToolController = ToolController;

    /**
     * @class Tool
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

}(App);