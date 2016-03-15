!function(APP, HTMLCanvasElement){
    APP.namespace('APP');
    var ToolsDriver = APP.ToolsDriver;
    var RegionManager = APP.RegionManager;
    var Mediator = APP.Mediator;
    var DrawingToolController = APP.controllers.DrawingToolController;
    var EraserToolController = APP.controllers.EraserToolController;
    var DraggingToolController = APP.controllers.DraggingToolController;
    var SelectToolController = APP.controllers.SelectToolController;
    var DrawingTool = APP.tools.DrawingTool;
    var DraggingTool = APP.tools.DraggingTool;
    var EraserTool = APP.tools.EraserTool;
    var SelectTool = APP.tools.SelectTool;

    /**
     * Канвас редактор
     *
     * @class CanvasEditor
     *
     * @param {HTMLCanvasElement} canvas
     * @param {Object} options
     * @param {string} options.lineColor
     * @param {number} options.lineWidth
     * @param {string} options.figureType
     * */
    APP.CanvasEditor = function (canvas, options){

        var defaultOptions = {
            drawingColor: '000000',
            drawingSize: 10,
            eraserSize: 10,
            drawingType: 'CURVE_TYPE'
        };

        if ( !canvas instanceof HTMLCanvasElement )
            throw 'Lost canvas element';

        Object.defineProperty(this, 'canvas', {value: canvas});

        canvas.setAttribute('oncontextmenu', 'return false;');
        var ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        this.settings = options.settings || {};

        this.settings.drawingSize = options.settings.drawingSize || defaultOptions.drawingSize;
        this.settings.eraserSize = options.settings.eraserSize || defaultOptions.eraserSize;
        this.settings.drawingType = options.settings.figureType || defaultOptions.figureType;
        this.settings.drawingColor = options.settings.drawingColor || defaultOptions.drawingColor;

        this.toolsDriver = new ToolsDriver(this, canvas);
        this.regionManager = new RegionManager(this, canvas, options.regionManager);
        this.mediator = new Mediator();

        this.toolsDriver.plug(DrawingToolController);
        this.toolsDriver.plug(EraserToolController);
        this.toolsDriver.plug(DraggingToolController);
        this.toolsDriver.plug(SelectToolController);

        var appInstance = this;

        !function(){
            var original = DrawingTool.prototype.drawingEnd;

            DrawingTool.prototype.drawingEnd = function _fn(){
                original.apply(this, arguments);
                appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
            };
        }();


        !function(){
            var original = DraggingTool.prototype.draggingEnd;

            DraggingTool.prototype.draggingEnd = function _fn(){
                original.apply(this, arguments);
                appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
            };
        }();


        var that = this;
        !function(){
            var original = EraserTool.prototype.eraserEnd;

            EraserTool.prototype.eraserEnd = function _fn(){
                original.apply(this, arguments);
                appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
                that.regionManager.reset();
            };
        }();


        !function(){
            var original = SelectTool.prototype.deleteSelectedObjects;

            SelectTool.prototype.deleteSelectedObjects = function _fn(){
                original.apply(this, arguments);
                appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
            };
        }();
    };

    APP.CanvasEditor.prototype.CREATED_REGION = 'CREATED_REGION';
    APP.CanvasEditor.prototype.UPDATE_CANVAS = 'UPDATE_CANVAS';

    APP.CanvasEditor.prototype.newEvent = function(eventName, data){
        if (eventName === this.CREATED_REGION){
            var object = data[0];
            this.regionManager.addRegion(object);
        }
    };
}(APP, HTMLCanvasElement);