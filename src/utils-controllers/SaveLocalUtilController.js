!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.controllers.ToolController;

    APP.controllers.SaveLocalUtilController = function (appInstance){

        this._saveToLocalSorage = function (){
            var state = APP.getTotalState(appInstance);
            appInstance.storageManager.setItem('SAVED_STATE', state);
        };

        this.start = function(){
            this._saveToLocalSorage();
            appInstance.mediator.subscribe(appInstance.UPDATE_CANVAS, this._saveToLocalSorage);
        };

        this.stop = function(){
            appInstance.mediator.unsubscribe(appInstance.UPDATE_CANVAS, this._saveToLocalSorage);
        }
    };
    APP.controllers.SaveLocalUtilController.prototype = Object.create(ToolController);
    APP.controllers.SaveLocalUtilController.prototype.constructor = APP.controllers.SaveLocalUtilController;
}(APP);