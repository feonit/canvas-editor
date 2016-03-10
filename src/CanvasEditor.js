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

        this.toolsDriver = new CanvasEditor.ToolsDriver(this, canvas);
        this.layersManager = new CanvasEditor.LayersManager(this, canvas, options['LayersManager']);
        this.mediator = new CanvasEditor.Mediator();

        this.toolsDriver.plug(CanvasEditor.ToolController.DrawingToolController);
        this.toolsDriver.plug(CanvasEditor.ToolController.EraserToolController);
        this.toolsDriver.plug(CanvasEditor.ToolController.DraggingToolController);
        this.toolsDriver.plug(CanvasEditor.ToolController.SelectToolController);

        var appInstance = this;

        !function(){
            var original = CanvasEditor.Tool.DrawingTool.prototype.drawingEnd;

            CanvasEditor.Tool.DrawingTool.prototype.drawingEnd = function _fn(){
                original.apply(this, arguments);
                appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
            };
        }();


        !function(){
            var original = CanvasEditor.Tool.DraggingTool.prototype.draggingEnd;

            CanvasEditor.Tool.DraggingTool.prototype.draggingEnd = function _fn(){
                original.apply(this, arguments);
                appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
            };
        }();


        var that = this;
        !function(){
            var original = CanvasEditor.Tool.EraserTool.prototype.eraserEnd;

            CanvasEditor.Tool.EraserTool.prototype.eraserEnd = function _fn(){
                original.apply(this, arguments);
                appInstance.mediator.publish(appInstance.UPDATE_CANVAS);

                // todo подумать над тем как это лучше организовать
                that.layersManager.reset();
            };
        }();


        !function(){
            var original = CanvasEditor.Tool.SelectTool.prototype.deleteSelectedObjects;

            CanvasEditor.Tool.SelectTool.prototype.deleteSelectedObjects = function _fn(){
                original.apply(this, arguments);
                appInstance.mediator.publish(appInstance.UPDATE_CANVAS);
            };
        }();
    }

    CanvasEditor.prototype.CREATED_REGION = 'CREATED_REGION';
    CanvasEditor.prototype.UPDATE_CANVAS = 'UPDATE_CANVAS';

    CanvasEditor.prototype.newEvent = function(eventName, data){
        if (eventName === this.CREATED_REGION){
            var regionObject = this.layersManager.createRegion(data[0], data[1]);
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

    CanvasEditor.prototype.getTotalState = function(){
        var mapping = {
            "ObjectsOrder": CanvasEditor.ObjectsOrder,
            "RegionObject": CanvasEditor.RegionObject,
            "CanvasEditor": CanvasEditor,
            "LayersManager": CanvasEditor.LayersManager,
        };

        var data = {};

        function search(obj, link){
            for (var k in obj){
                if (obj.hasOwnProperty(k)) {

                    if (   Array.isArray(obj[k])
                        && obj[k].length
                        && mapping[obj[k][0].constructor.name]){

                        link[k] = [];

                        obj[k].forEach(function(p){
                            var name = p.constructor.name;
                            var optionsItem = {};
                            search(p, optionsItem);
                            var item = {};
                            item[name] = optionsItem;
                            link[k].push(item);
                        });

                    } else if (typeof obj[k] === "object" ){
                        if (mapping[obj[k].constructor.name]){
                            var newLink = link[obj[k].constructor.name] = {};
                            search(obj[k], newLink);
                        } else {
                            // only simple hash data
                            if (obj[k].constructor.name === "Object"){
                                link[k] = obj[k];
                            }
                        }
                    } else {
                        link[k] = obj[k];
                    }
                }
            }
        }

        search(this, data);

        return data;
    }

}(window, HTMLCanvasElement);