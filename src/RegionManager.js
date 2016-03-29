!function(APP){
    APP.namespace('APP.core');
    var PixelsMap = APP.core.PixelsMap;
    var ObjectsOrder = APP.core.ObjectsOrder;
    var LayerBackground = APP.objects.LayerBackground;
    /**
     * Управление объектами на холсте
     * @class
     * @memberof APP.core
     * @param appInstance
     * @param {HTMLCanvasElement} canvas
     * */
    APP.core.RegionManager = function (appInstance, canvas, options){
        options = options || {};

        Object.defineProperty(this, 'canvas', {value: canvas});

        this.pixelsMap = new PixelsMap();

        this.objectsOrder = new ObjectsOrder(options.objectsOrder);

        if (!options.objectsOrder){// если нет автогенерации
            /** @lends RegionManager.prototype */
            this.addRegion(LayerBackground.createLayerBackground(this.canvas));
        } else {
            this.objectsOrder.getObjects().forEach((function(layerObject){
                this.addLayerView(layerObject);
                addRecordsAboutRegion(this.pixelsMap, layerObject);
            }).bind(this));
            this.redrawLayers();
        }
    };
    /** @lends RegionManager.prototype */
    APP.core.RegionManager.prototype = {
        constructor: APP.core.RegionManager,
        /**
         * Индекс первого слоя
         * */
        BACKGROUND_INDEX : 0,
        /**
         * Сбросить состояние
         * */
        reset: function(){
            this.pixelsMap = new PixelsMap();
            this.objectsOrder = new ObjectsOrder();
            this.addRegion(LayerBackground.createLayerBackground(this.canvas));
        },
        /**
         * Метод для записи региона в карту пикселей
         * так как это новый регион, то индекс его становится выше всех, и его соответственно видно поверх всех
         * @param {LayerObject} layerObject
         * */
        addRegion: function (layerObject){
            this.objectsOrder.addObject(layerObject);

            this.addLayerView(layerObject);

            addRecordsAboutRegion(this.pixelsMap, layerObject);
            this.redrawLayers();
        },

        addLayerView: function(layerObject){
            Object.defineProperties(layerObject, {
                'layerView':{
                    value: null,
                    enumerable: false,
                    writable: true
                }
            });

            if (layerObject instanceof APP.objects.VectorLayerAbstract){
                layerObject.layerView = new APP.views.VectorLayerAbstractView({
                    height: layerObject.height,
                    width: layerObject.width,
                    coordinatesLine: layerObject.coordinatesLine,
                    borderCoordinates: layerObject.borderCoordinates,
                    color: layerObject.color,
                    size: layerObject.size
                });
            }

            if (layerObject instanceof APP.objects.RasterLayer){
                layerObject.layerView = APP.views.RasterLayerView.createByCoordinates({
                    height: layerObject.height,
                    width: layerObject.width,
                    coordinates: layerObject.coordinates,
                    borderCoordinates: layerObject.borderCoordinates,
                    color: layerObject.color,
                    dataUrl: layerObject.dataUrl
                });
            }

            if (layerObject instanceof APP.objects.LayerBackground){
                layerObject.layerView = APP.views.RasterLayerView.createByDataUrl({
                    height: layerObject.height,
                    width: layerObject.width,
                    dataUrl: layerObject.dataUrl
                });
            }
        },

        /**
         * Удаляет регион с холста
         * @param {LayerObject} layerObject
         * */
        removeRegion : function(layerObject){
            removeRecordsAboutRegion(this.pixelsMap, layerObject);
            this.objectsOrder.removeObject(layerObject);
            this.redrawLayers();
        },
        /**
         * Запускается после изменения смещения, происходит перерегистрация координат на карте
         * @param {LayerObject} layerObject
         * */
        applyOtherOffset : function(layerObject){
            layerObject.offsetHistory.saveRecordOffset();

            // удалить в по координатам из предыдущей позиции
            // todo можно оптимизировать, переписав не всю карту а только часть
            var record = layerObject.offsetHistory.getPrevRecord();
            removeRecordsAboutRegion(this.pixelsMap, layerObject, record[0], record[1]);
            addRecordsAboutRegion(this.pixelsMap, layerObject);
        },
        /**
         * Этот способ просто перерисосывает все слои
         * */
        redrawLayers : function(){
            var i, len;
            var layerObject;
            var offset;
            var canvas = this.canvas;

            /* Очистить холст полностью */
            this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);

            var objects = this.objectsOrder.getObjects();
            for (i = 0, len = objects.length; i < len; i++){
                layerObject = objects[i];

                offset = layerObject instanceof APP.objects.LayerBackground
                    ? [0, 0]
                    : layerObject.offsetHistory.currentOffset;

                APP.views.CanvasSnapShotView.drawLayer(canvas, layerObject.layerView.layer, offset);
            }
        },
        /**
         * Активизирует объект на холсте
         * @param {LayerObject} layerObject
         * */
        drawActivateRegion : function(layerObject){
            layerObject.activate();
            this.redrawLayers();
        },
        /**
         * Деактивизирует объект на холсте
         * @param {LayerObject} layerObject
         * */
        drawDeactivateRegion : function(layerObject){
            layerObject.deactivate();
            this.redrawLayers();
        },
        /**
         * Перебрасывает объект в самый верх
         * @param {LayerObject} layerObject
         * */
        drawToTopRegion : function(layerObject){
            var orderIsChanged = this.objectsOrder.moveToTop(layerObject);

            if (orderIsChanged){
                removeRecordsAboutRegion(this.pixelsMap, layerObject);
                addRecordsAboutRegion(this.pixelsMap, layerObject);
            }
            this.redrawLayers();
        },
        /**
         * Поиск объекта по заданной координате
         * @param {number} x — координата X
         * @param {number} y — координата Y
         * @return {boolean|LayerObject} false - если объект не найден
         * */
        searchRegionByCoordinate : function(x, y){
            // возьмем за правило, что если выделяемый пиксель имеет цвет фона холста ( прозрачный по дефолту ) то сбрасываем событие

            /**
             * Проверяет, пустой ли пиксел по заданной координате
             * @param {HTMLCanvasElement} canvas — холст
             * @param {number} x — координата X
             * @param {number} y — координата Y
             * @return {boolean} true если пустой
             * */
            var pixelIsBackground = function(canvas, x, y){
                var ctx = canvas.getContext('2d'),
                    data = ctx.getImageData(x, y, 1, 1).data,
                    BGR_COLOR = [0,0,0,0];
                return data[0] == BGR_COLOR[0]
                    && data[1] == BGR_COLOR[1]
                    && data[2] == BGR_COLOR[2]
                    && data[3] == BGR_COLOR[3];
            };

            if (pixelIsBackground(this.canvas, x, y))
                return false;

            // пробуем найти регион по индексовой карте (поиск по слою)
            var region = this.pixelsMap.getRecord(x, y);

            // это сырой первичный слой
            // todo ссылка на объект

            var isRawRegion;

            if (region){
                isRawRegion = this.objectsOrder.getIndex(region) === this.BACKGROUND_INDEX;
            }

            // пробуем найти регион волшебной палочкой (поиск по цвету)
            if (!region || isRawRegion){
                region = APP.objects.SimpleRaster.createObject(this.canvas, [x, y]);

                // после того как выдрали с сырого слоя специальные координаты,
                // нужно стереть их из него!
                var CLEAN_COLOR = [0, 0, 0, 0];
                //todo нужно взять оригинальные координаты

                // заполнить дефолтовым цветом
                var raw = this.objectsOrder.getObjectByIndex(this.BACKGROUND_INDEX);

                /**
                 * Метод заполняет пикселы холста определенным цветом
                 * @param {HTMLCanvasElement} canvas
                 * @param {number[][]} coordinates
                 * @param {number[]} color
                 * */
                var putPixelsAtCanvas = function (canvas, coordinates, color){
                    var canvasCtx = canvas.getContext('2d');
                    var imageData = canvasCtx.createImageData(1,1);
                    var data = imageData.data;
                    data[0] = color[0];
                    data[1] = color[1];
                    data[2] = color[2];
                    data[3] = color[3];

                    var coordinate, i, len;
                    for (i = 0, len = coordinates.length; i < len; i++){
                        coordinate = coordinates[i];
                        canvasCtx.putImageData(imageData, coordinate[0], coordinate[1]);
                    }
                };

                putPixelsAtCanvas(raw.layerView.layer, region.getRelationCoordinate(), CLEAN_COLOR);

                this.addRegion(region);
            }

            // его и вправду нет
            if (!region){
                return false;
            }

            return region;
        }
    };
    function removeRecordsAboutRegion(pixelsMap, layerObject, offset){
        // не забыть про смещение

        offset = offset || layerObject.offsetHistory.currentOffset;

        var coordinates = layerObject.getRelationCoordinate(null, offset);
        var coordinate;
        var coordinateX;
        var coordinateY;

        if (coordinates.length){
            for (var i = 0, len = coordinates.length; i < len; i += 1){
                coordinate = coordinates[i];
                coordinateX = coordinates[i][0];
                coordinateY = coordinates[i][1];

                pixelsMap.deleteRecord(coordinateX, coordinateY, layerObject);
            }
        }
    }
    function addRecordsAboutRegion(pixelsMap, layerObject){
        // не забыть про смещение
        var coordinates = (layerObject.getRelationCoordinate && layerObject.getRelationCoordinate()) || layerObject.coordinates;
        var coordinate;
        var coordinateX;
        var coordinateY;
        if (coordinates.length){
            for (var i = 0, len = coordinates.length; i < len; i += 1){
                coordinate = coordinates[i];
                coordinateX = coordinates[i][0];
                coordinateY = coordinates[i][1];

                pixelsMap.addRecord(coordinateX, coordinateY, layerObject);
            }
        }
    }
}(APP);