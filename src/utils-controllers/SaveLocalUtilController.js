!function(APP){
    APP.namespace('APP.utils');

    /**
     * Автоматическое сохранение состояния приложения локально
     * @class
     * @memberof APP.utils
     * */
    APP.utils.SaveLocalUtilController = function (appInstance){

        this._saveToLocalSorage = function (){
            var state = appInstance.getTotalState();
            appInstance.storageManager.setItem(appInstance.TOTAL_STATE_NAME, state);
        };

        this.start = function(){
            appInstance.mediator.subscribe(appInstance.UPDATE_CANVAS_EVENT, this._saveToLocalSorage);
        };

        this.stop = function(){
            appInstance.mediator.unsubscribe(appInstance.UPDATE_CANVAS_EVENT, this._saveToLocalSorage);
        }
    };
    APP.utils.SaveLocalUtilController.prototype = Object.create(APP.core.ToolController);
    APP.utils.SaveLocalUtilController.prototype.constructor = APP.utils.SaveLocalUtilController;
}(APP);