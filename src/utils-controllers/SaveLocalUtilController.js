!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.controllers.ToolController;

    APP.controllers.SaveLocalUtilController = function (appInstance){

        this._saveToLocalSorage = function (){
            var state = APP.getTotalState(appInstance);
            appInstance.storageManager.setItem(appInstance.TOTAL_STATE_NAME, state);
        };

        this.start = function(){
            appInstance.mediator.subscribe(appInstance.UPDATE_CANVAS, this._saveToLocalSorage);
        };

        this.stop = function(){
            appInstance.mediator.unsubscribe(appInstance.UPDATE_CANVAS, this._saveToLocalSorage);
        }
    };
    APP.controllers.SaveLocalUtilController.prototype = Object.create(ToolController);
    APP.controllers.SaveLocalUtilController.prototype.constructor = APP.controllers.SaveLocalUtilController;
}(APP);