App = {
    namespace: function (nsString) {
        var parts = nsString.split('.'),
            parent = window.App = window.App || {},
            i;
        // отбросить начальный префикс – имя глобального объекта
        if (parts[0] === 'App') {
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
    },

    newEvent : function(eventName, data){
        if (eventName === this.CREATED_REGION){
            var regionObject = App.RegionObject.createRegion.apply(null, data);
            regionObject.layout = this.lastLayout;
            this.layersManager.addRegion(regionObject);
        }
    }
};

!function(App, HTMLCanvasElement){

    window.CanvasEditor = CanvasEditor;

    function CanvasEditor(options){

        var defaultOptions = {
            lineColor: '440000',
            lineWidth: 10,
            figureType: 'CIRCLE_TYPE'
        };

        this.toolsDriver = new App.ToolsDriver(this, canvas);
        this.layersManager = new App.LayersManager(this, canvas);
        this.CREATED_REGION = 'CREATED_REGION';

        this.toolsDriver.plug(App.controllers.DrawingToolController);
        this.toolsDriver.plug(App.controllers.EraserToolController);
        this.toolsDriver.plug(App.controllers.DraggingToolController);
        this.toolsDriver.plug(App.controllers.FigureToolController);

        this.options = {};

        /** @public */
        this.options.lineColor = options.lineColor || defaultOptions.lineColor;
        /** @public */
        this.options.lineWidth = options.lineWidth || defaultOptions.lineWidth;

        this.options.figureType = options.figureType || defaultOptions.figureType;
    }

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

}(App, HTMLCanvasElement);