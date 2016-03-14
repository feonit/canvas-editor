!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').RegionManager = RegionManager;

    /**
     * @class RegionManager
     * @memberof CanvasEditor
     * @param appInstance
     * @param {HTMLCanvasElement} canvas
     * */
    function RegionManager(appInstance, canvas, options){
        options = options || {};

        Object.defineProperty(this, 'canvas', {value: canvas});

        this.pixelsMap = new CanvasEditor.PixelsMap(options['PixelsMap']);
        this.objectsOrder = new CanvasEditor.ObjectsOrder(options['ObjectsOrder']);

        /** @lends RegionManager */
        this.reset();
    }

    RegionManager.prototype = {
        constructor: RegionManager,

        /**
         * Индекс первого слоя
         * */
        BACKGROUND_INDEX : 0,

        /**
         * Сбросить состояние
         * */
        reset: function(){
            this.pixelsMap = new CanvasEditor.PixelsMap();
            this.objectsOrder = new CanvasEditor.ObjectsOrder();

            function createBackgroundRaster(canvas){
                return new CanvasEditor.BackgroundRaster({
                    dataUrl: canvas.toDataURL(),
                    height: canvas.height,
                    width: canvas.width,
                });
            }

            this.addRegion(createBackgroundRaster(this.canvas));
        },

        /**
         * Метод для записи региона в карту пикселей
         * так как это новый регион, то индекс его становится выше всех, и его соответственно видно поверх всех
         * @param {RegionObject} regionObject
         * */
        addRegion: function (regionObject){
            addRecordsAboutRegion(this.pixelsMap, regionObject);
            this.objectsOrder.addObject(regionObject);
        },

        /**
         * Удаляет регион с холста
         * @param {RegionObject} regionObject
         * */
        removeRegion : function(regionObject){
            removeRecordsAboutRegion(this.pixelsMap, regionObject);
            this.objectsOrder.removeObject(regionObject);
            this.redrawLayers();
        },

        /**
         * Запускается после изменения смещения, происходит перерегистрация координат на карте
         * @param {RegionObject} regionObject
         * */
        applyOtherOffset : function(regionObject){
            regionObject.saveRecordOffset();

            // удалить в по координатам из предыдущей позиции
            // todo можно оптимизировать, переписав не всю карту а только часть
            var record = regionObject.getPrevRecord();
            removeRecordsAboutRegion(this.pixelsMap, regionObject, record[0], record[1]);
            addRecordsAboutRegion(this.pixelsMap, regionObject);
        },

        /**
         * Метод заполняет пикселы холста определенным цветом
         * @param {HTMLCanvasElement} canvas
         * @param {number[][]} coordinates
         * @param {number[]} color
         * */
        putPixelsAtCanvas : function(canvas, coordinates, color){
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
        },

        /**
         * Этот способ просто перерисосывает все слои
         * */
        redrawLayers : function(){
            var i, len;
            var region;
            var canvas = this.canvas;

            this._cleanCanvas();

            var objects = this.objectsOrder.getObjects();
            for (i = 0, len = objects.length; i < len; i++){
                region = objects[i];

                region.drawAtCanvas(canvas);
            }
        },

        /**
         * Активизирует объект на холсте
         * @param {RegionObject} regionObject
         * */
        drawActivateRegion : function(regionObject){
            regionObject.activate();
            this.redrawLayers();
        },

        /**
         * Деактивизирует объект на холсте
         * @param {RegionObject} regionObject
         * */
        drawDeactivateRegion : function(regionObject){
            regionObject.deactivate();
            this.redrawLayers();
        },

        /**
         * Перебрасывает объект в самый верх
         * @param {RegionObject} regionObject
         * */
        drawToTopRegion : function(regionObject){
            var orderIsChanged = this.objectsOrder.moveToTop(regionObject);

            if (orderIsChanged){
                removeRecordsAboutRegion(this.pixelsMap, regionObject);
                addRecordsAboutRegion(this.pixelsMap, regionObject);
            }
            this.redrawLayers();
        },

        /**
         * Поиск объекта по заданной координате
         * @param {number} x — координата X
         * @param {number} y — координата Y
         * @return {boolean|RegionObject} false - если объект не найден
         * */
        searchRegionByCoordinate : function(x, y){
            // возьмем за правило, что если выделяемый пиксель имеет цвет фона холста ( прозрачный по дефолту ) то сбрасываем событие
            if (this._pixelIsBackground(x, y))
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
                region = CanvasEditor.RasterRegion.createObject(this.canvas, [x, y]);

                // после того как выдрали с сырого слоя специальные координаты,
                // нужно стереть их из него!
                var CLEAN_COLOR = [0, 0, 0, 0];
                //todo нужно взять оригинальные координаты

                // заполнить дефолтовым цветом
                var raw = this.objectsOrder.getObject(this.BACKGROUND_INDEX);
                this.putPixelsAtCanvas(raw.getLayout(), region.getRelationCoordinate(), CLEAN_COLOR);

                this.addRegion(region);
            }

            // его и вправду нет
            if (!region){
                return false;
            }

            return region;
        },

        /**
         * Проверяет, пустой ли пиксел по заданной координате
         * @param {number} x — координата X
         * @param {number} y — координата Y
         * @return {boolean} true если пустой
         * */
        _pixelIsBackground : function(x, y){
            var ctx = this.canvas.getContext('2d'),
                data = ctx.getImageData(x, y, 1, 1).data,
                BGR_COLOR = [0,0,0,0];
            return data[0] == BGR_COLOR[0]
                && data[1] == BGR_COLOR[1]
                && data[2] == BGR_COLOR[2]
                && data[3] == BGR_COLOR[3];
        },

        /**
         * Очистить холст полностью
         * */
        _cleanCanvas : function(){
            this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    function removeRecordsAboutRegion(pixelsMap, regionObject, offset){
        // не забыть про смещение

        offset = offset || regionObject.offset;

        var coordinates = regionObject.getRelationCoordinate(null, offset);
        var coordinate;
        var coordinateX;
        var coordinateY;

        if (coordinates.length){
            for (var i = 0, len = coordinates.length; i < len; i += 1){
                coordinate = coordinates[i];
                coordinateX = coordinates[i][0];
                coordinateY = coordinates[i][1];

                pixelsMap.deleteRecord(coordinateX, coordinateY, regionObject);
            }
        }
    }

    function addRecordsAboutRegion(pixelsMap, regionObject){
        // не забыть про смещение
        var coordinates = regionObject.getRelationCoordinate();
        var coordinate;
        var coordinateX;
        var coordinateY;
        if (coordinates.length){
            for (var i = 0, len = coordinates.length; i < len; i += 1){
                coordinate = coordinates[i];
                coordinateX = coordinates[i][0];
                coordinateY = coordinates[i][1];

                pixelsMap.addRecord(coordinateX, coordinateY, regionObject);
            }
        }
    }

    return RegionManager;

}(CanvasEditor);