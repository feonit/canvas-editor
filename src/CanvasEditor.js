!function(global, HTMLCanvasElement){

    global.CanvasEditor = CanvasEditor;

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
    function CanvasEditor(canvas, options){

        var defaultOptions = {
            drawingColor: '000000',
            drawingSize: 10,
            drawingType: 'CURVE_TYPE'
        };

        if ( !canvas instanceof HTMLCanvasElement )
            throw 'Lost canvas element';

        this.canvas = canvas;

        canvas.setAttribute('oncontextmenu', 'return false;');
        var ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        this.options = options || {};

        this.options.drawingSize = options.drawingSize || defaultOptions.drawingSize;
        this.options.drawingType = options.figureType || defaultOptions.figureType;
        this.options.drawingColor = options.drawingColor || defaultOptions.drawingColor;

        this.toolsDriver = new CanvasEditor.ToolsDriver(this, canvas);
        this.layersManager = new CanvasEditor.LayersManager(this, canvas);

        this.toolsDriver.plug(CanvasEditor.ToolController.DrawingToolController);
        this.toolsDriver.plug(CanvasEditor.ToolController.EraserToolController);
        this.toolsDriver.plug(CanvasEditor.ToolController.DraggingToolController);
    }

    CanvasEditor.prototype.CREATED_REGION = 'CREATED_REGION';

    CanvasEditor.prototype.newEvent = function(eventName, data){
        if (eventName === this.CREATED_REGION){
            var regionObject = this.layersManager.createRegion(data[0], data[1]);
            regionObject.layout = this.lastLayout;
            this.layersManager.addRegion(regionObject);
        }
    };

    // todo save and restore param-canvas after destroy

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