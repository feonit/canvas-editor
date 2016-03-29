!function(APP, HTMLCanvasElement){
    APP.namespace('APP.core');

    /**
     * Канвас редактор
     * @class
     * @memberof APP.core
     * @param {HTMLCanvasElement} canvas
     * @param {Object} options
     * @param {string} options.lineColor
     * @param {number} options.lineWidth
     * @param {string} options.figureType
     * */
    APP.core.CanvasEditor = function (canvas, options){
        if (!canvas)
            throw 'Lost first parameter';
        if (!(HTMLCanvasElement && canvas.getContext))
            throw 'Not supported canvas element';
        if (!canvas instanceof HTMLCanvasElement )
            throw 'Lost canvas element';

        var extend = function (src, obj){
            for (var prop in src){
                if (src.hasOwnProperty(prop)){
                    if (!obj.hasOwnProperty(prop)){
                        obj[prop] = src[prop];
                    }
                }
            }
            return obj;
        };

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

        this.toolsDriver = new APP.core.ToolsDriver(this, canvas);

        this.mediator = new APP.core.Mediator();

        if (options.settings && options.settings.storageEnabled){

            this.storageManager = new APP.core.StorageManager({
                key: options.settings.storageKey,
                namespace: 'CanvasEditor'
            });

            // сохраненное состояние
            var stateOptions = this.storageManager.getProperty(this.TOTAL_STATE_NAME);

            if (stateOptions){
                // запоминаем предыдушие настройки
                var oldSettings = options.settings;
                // заменяем опции на сохраненное
                options = stateOptions;

                options.settings = options.settings || {};

                // восстанавливаем настройки, если каких то нет в сохраненном состоянии
                extend(oldSettings, options.settings);
            }

            var saveLocalUtilController = new APP.utils.SaveLocalUtilController(this);
            saveLocalUtilController.start();
        }

        this.regionManager = new APP.core.RegionManager(this, canvas, options.regionManager);

        canvas.setAttribute('oncontextmenu', 'return false;');
        var ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        options.settings = options.settings || {};

        extend(defaultSettings, options.settings);

        this.settings = options.settings;

        this.mediator.subscribe(this.CREATED_REGION_EVENT, (function(object){
            this.regionManager.addRegion(object);
        }).bind(this));

    };

    APP.core.CanvasEditor.prototype.CREATED_REGION_EVENT = 'CREATED_REGION_EVENT';
    APP.core.CanvasEditor.prototype.UPDATE_CANVAS_EVENT = 'UPDATE_CANVAS_EVENT';
    APP.core.CanvasEditor.prototype.TOTAL_STATE_NAME = 'TOTAL_STATE_NAME';

    /**
     * Метод считывает состояния определенных компонентов системы и подготоваливает
     * данные для последующей инициализации приложения
     * */
    APP.core.CanvasEditor.prototype.getTotalState = function () {
        var instanse = this;

        var data = {};
        var exclusion =[
            APP.core.ToolsDriver,
            APP.core.Mediator,
            APP.core.PixelsMap
        ];

        function searchObjectOptions(obj, link) {
            var propValue;
            var constructor;

            for (var propName in obj) {
                if (obj.hasOwnProperty(propName)) {
                    propValue = obj[propName];

                    if (typeof propValue === "undefined")
                        continue;

                    if (propValue === null)
                        continue;

                    constructor = propValue.constructor;

                    function processArray(arr, selfArrLink, itemOfArrName) {
                        selfArrLink[itemOfArrName] = [];

                        // если пустой выходим
                        if (!arr.length)
                            return;

                        // если не объекты, присваиваем
                        if (typeof (arr[0]) !== "object") {
                            selfArrLink[itemOfArrName] = arr;
                            return;
                        }

                        // если опять массив
                        if (Array.isArray(arr[0])) {
                            arr.forEach(function (itemOfArr, index) {
                                processArray(itemOfArr, selfArrLink[itemOfArrName], index);
                            });
                            return;
                        }

                        // если все объекты
                        arr.forEach(function (itemOfArr) {
                            var optionsOfObject = {};
                            searchObjectOptions(itemOfArr, optionsOfObject);
                            selfArrLink[propName].push(optionsOfObject);
                        });
                    }

                    // свойство массив
                    if (Array.isArray(propValue)) {
                        processArray(propValue, link, propName);
                    } else
                    // свойство объект не массив
                    if (typeof propValue === "object") {

                        if (exclusion.indexOf(constructor) > -1)
                            continue;

                        // если его прямой родитель Object
                        if (constructor.prototype !== Object.prototype) {
                            var newLink = link[propName] = {};
                            searchObjectOptions(propValue, newLink);
                        } else {
                            link[propName] = propValue;
                        }
                    } else {
                        link[propName] = propValue;
                    }
                }
            }
        }

        searchObjectOptions(instanse, data);

        return data;
    };

}(APP, HTMLCanvasElement);