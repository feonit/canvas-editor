!function(APP){
    APP.namespace('APP.core');

    /**
     * Интерфейс для контроллеров
     * @class
     * @memberof APP.core
     * */
    APP.core.ToolController = function (){};
    /**
     * Включение инструмента
     * */
    APP.core.ToolController.prototype.start = function(){
        throw "method must be implemented";
    };
    /**
     * Отключение инструмента
     * */
    APP.core.ToolController.prototype.stop = function(){
        throw "method must be implemented";
    };
}(APP);