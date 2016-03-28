!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.controllers.ToolController;
    var MathFn = APP.core.MathFn;

    APP.controllers.RandomOptionsController = function (appInstance, canvas){
        var drawingColor;
        var drawingSize;

        this.start = function(){
            drawingColor = appInstance.settings.drawingColor;
            drawingSize = appInstance.settings.drawingSize;

            Object.defineProperty(appInstance.settings, 'drawingColor', {
                get(){
                    return MathFn.randomHex();
                }
            });
            Object.defineProperty(appInstance.settings, 'drawingSize', {
                get(){
                    var min = 10, max = 20;
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
            });
        };

        this.stop = function(){

            Object.defineProperty(appInstance.settings, 'drawingColor', {value: drawingColor, writable: true, enumerable: true, configurable: true});
            Object.defineProperty(appInstance.settings, 'drawingSize', {value: drawingSize, writable: true, enumerable: true, configurable: true});
        };
    };
    APP.controllers.RandomOptionsController.prototype = Object.create(ToolController);
    APP.controllers.RandomOptionsController.prototype.constructor = APP.controllers.RandomOptionsController;
}(APP);