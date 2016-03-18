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
    var StorageManager = APP.StorageManager;

    function extend(src, obj){
        for (var prop in src){
            if (src.hasOwnProperty(prop)){
                if (!obj.hasOwnProperty(prop)){
                    obj[prop] = src[prop];
                }
            }
        }
        return obj;
    }

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
        if ( !canvas instanceof HTMLCanvasElement )
            throw 'Lost canvas element';

        Object.defineProperty(this, 'canvas', {value: canvas});

        options = options || {};

        var defaultSettings = {
            drawingColor: '000000',
            drawingSize: 10,
            eraserSize: 10,
            drawingType: 'CURVE_TYPE',
            storageEnabled: false,
            drawingCursorEnabled: false
        };

        this.toolsDriver = new ToolsDriver(this, canvas);
        this.mediator = new Mediator();

        if (options.settings && options.settings.storageEnabled){
            this.storageManager = new StorageManager('unic_namespace');

            // сохраненное состояние
            var stateOptions = this.storageManager.getProperty('SAVED_STATE');

            if (stateOptions){
                // запоминаем предыдушие настройки
                var oldSettings = options.settings;
                // заменяем опции на сохраненное
                options = stateOptions;

                options.settings = options.settings || {};

                // восстанавливаем настройки, если каких то нет в сохраненном состоянии
                extend(oldSettings, options.settings);
            }

            var saveLocalUtilController = new APP.controllers.SaveLocalUtilController(this);
            saveLocalUtilController.start();
        }

        this.regionManager = new RegionManager(this, canvas, options.regionManager);

        canvas.setAttribute('oncontextmenu', 'return false;');
        var ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        options.settings = options.settings || {};

        extend(defaultSettings, options.settings);

        this.settings = options.settings;

        this.toolsDriver.plug(DrawingToolController);
        this.toolsDriver.plug(EraserToolController);
        this.toolsDriver.plug(DraggingToolController);
        this.toolsDriver.plug(SelectToolController);
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