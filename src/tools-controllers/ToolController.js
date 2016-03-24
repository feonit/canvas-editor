!function(APP){
    APP.namespace('APP');

    /** @namespace APP.controllers */
    APP.namespace('APP.controllers');

    /**
     * @class ToolController
     * @memberof APP
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