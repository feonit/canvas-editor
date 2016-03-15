!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.ToolController;

    APP.controllers.SaveLocalUtilController = function (appInstance){

        this._saveToLocalSorage = function (){
            var state = APP.getTotalState(appInstance);
            var stringData = JSON.stringify(state);
            window.storageManager.setItem('SAVED_STATE', stringData);
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