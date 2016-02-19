!function(global, HTMLCanvasElement){

    global.CanvasEditor = CanvasEditor;

    /**
     * Канвас редактор
     *
     * @class CanvasEditor
     *
     * @param {Object} options
     * @param {string} options.lineColor
     * @param {number} options.lineWidth
     * @param {string} options.figureType
     * */
    function CanvasEditor(options){

        var defaultOptions = {
            lineColor: '440000',
            lineWidth: 10,
            figureType: 'CIRCLE_TYPE'
        };

        this.toolsDriver = new CanvasEditor.ToolsDriver(this, canvas);
        this.layersManager = new CanvasEditor.LayersManager(this, canvas);

        this.toolsDriver.plug(CanvasEditor.ToolController.DrawingToolController);
        this.toolsDriver.plug(CanvasEditor.ToolController.EraserToolController);
        this.toolsDriver.plug(CanvasEditor.ToolController.DraggingToolController);
        this.toolsDriver.plug(CanvasEditor.ToolController.FigureToolController);

        this.options = {};

        this.options.lineColor = options.lineColor || defaultOptions.lineColor;

        this.options.lineWidth = options.lineWidth || defaultOptions.lineWidth;

        this.options.figureType = options.figureType || defaultOptions.figureType;
    }

    CanvasEditor.prototype.CREATED_REGION = 'CREATED_REGION';

    CanvasEditor.prototype.newEvent = function(eventName, data){
        if (eventName === this.CREATED_REGION){
            var regionObject = CanvasEditor.RegionObject.createRegion.apply(null, data);
            regionObject.layout = this.lastLayout;
            this.layersManager.addRegion(regionObject);
        }
    };

    CanvasEditor.create = function(canvas, options){
        if ( !canvas instanceof HTMLCanvasElement )
            throw 'Lost canvas element';

        canvas.setAttribute('oncontextmenu', 'return false;');
        var ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        // todo save and restore param-canvas after destroy

        return new CanvasEditor(canvas, options);
    };

    CanvasEditor.namespace = function (nsString) {
        var parts = nsString.split('.'),
            parent = window.CanvasEditor = window.CanvasEditor || {},
            i;
        // отбросить начальный префикс – имя глобального объекта
        if (parts[0] === 'CanvasEditor') {
            parts = parts.slice(1);
        }
        for (i = 0; i < parts.length; i += 1) {
            // создать свойство, если оно отсутствует
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    };

}(window, HTMLCanvasElement);