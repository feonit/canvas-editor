!function(APP){
    APP.namespace('APP');

    /** @namespace APP.controllers */
    APP.namespace('APP.controllers');

    /**
     * @class ToolController
     * @memberof APP
     * */
    APP.controllers.ToolController = function (){};
    /**
     * Включение инструмента
     * */
    APP.controllers.ToolController.prototype.start = function(){
        throw "method must be implemented";
    };
    /**
     * Отключение инструмента
     * */
    APP.controllers.ToolController.prototype.stop = function(){
        throw "method must be implemented";
    };
}(APP);