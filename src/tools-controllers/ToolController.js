!function(APP){
    APP.namespace('APP');
    /**
     * @class ToolController
     * */
    APP.ToolController = function (){};
    /**
     * Включение инструмента
     * */
    APP.ToolController.prototype.start = function(){
        throw "method must be implemented";
    };
    /**
     * Отключение инструмента
     * */
    APP.ToolController.prototype.stop = function(){
        throw "method must be implemented";
    };
}(APP);