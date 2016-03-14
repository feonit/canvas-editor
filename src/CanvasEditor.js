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
        this.regionManager = new CanvasEditor.RegionManager(this, canvas, options['RegionManager']);
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
                that.regionManager.reset();
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
            var object = data[0];
            this.regionManager.addRegion(object);
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

        var data = {};
        var exclusion = {
            "ToolsDriver": true,
            "Mediator": true,
            "PixelsMap": true,
        };

        function searchObjectOptions(obj, link){
            var currentProperty;
            var constructorName;

            for (var propName in obj){
                if (obj.hasOwnProperty(propName)) {
                    currentProperty = obj[propName];

                    if (typeof currentProperty === "undefined")
                        continue;

                    if (currentProperty === null)
                        continue;

                    constructorName = currentProperty.constructor.name;

                    function processArray(arr, selfArrLink, itemOfArrName){
                        selfArrLink[itemOfArrName] = [];

                        // если пустой выходим
                        if (!arr.length)
                            return;

                        // если не объекты, присваиваем
                        if (typeof (arr[0]) !== "object"){
                            selfArrLink[itemOfArrName] = arr;
                            return;
                        }

                        // если опять массив
                        if (Array.isArray(arr[0])){
                            arr.forEach(function(itemOfArr, index){
                                //var newarr = [];
                                //selfArrLink[itemOfArrName].push(newarr);
                                processArray(itemOfArr, selfArrLink[itemOfArrName], index);
                            });
                            return;
                        }

                        // если все объекты
                        arr.forEach(function(itemOfArr){
                            var optionsOfObject = {};
                            searchObjectOptions(itemOfArr, optionsOfObject);
                            var item = {};
                            item[itemOfArr.constructor.name] = optionsOfObject;
                            selfArrLink[propName].push(item);
                        });
                    }

                    // свойство массив
                    if ( Array.isArray(currentProperty)){
                        processArray(currentProperty, link, propName);
                    } else
                    // свойство объект не массив
                    if (typeof currentProperty === "object" ){

                        if (exclusion[constructorName])
                            continue;

                        if (constructorName !== "Object"){
                            var newLink = link[currentProperty.constructor.name] = {};
                            searchObjectOptions(currentProperty, newLink);
                        } else {
                            link[propName] = currentProperty;
                        }
                    } else {
                        link[propName] = currentProperty;
                    }
                }
            }
        }

        searchObjectOptions(this, data);

        return data;
    }

}(window, HTMLCanvasElement);