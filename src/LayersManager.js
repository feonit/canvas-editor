!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').LayersManager = LayersManager;

    /**
     * @class LayersManager
     * @memberof CanvasEditor
     * @param appInstance
     * @param {HTMLCanvasElement} canvas
     * */
    function LayersManager(appInstance, canvas, options){
        options = options || {};

        Object.defineProperty(this, 'canvas', {value: canvas});

        this.pixelsMap = new CanvasEditor.PixelsMap(options['PixelsMap']);

        this.objectsOrder = new CanvasEditor.ObjectsOrder(options['ObjectsOrder']);


        /** @lends LayersManager */
        this.reset();
    }

    /**
     * Индекс первого слоя
     * */
    LayersManager.prototype.BACKGROUND_INDEX = 0;

    /**
     * Сбросить состояние
     * */
    LayersManager.prototype.reset = function(){
        this.pixelsMap = new CanvasEditor.PixelsMap();
        this.objectsOrder = new CanvasEditor.ObjectsOrder();

        this.addRegion(this._createBackgroundRaster());
    };

    /**
     * @return {RegionObject} объект фигуры
     * */
    LayersManager.prototype._createBackgroundRaster = function(){
        return new CanvasEditor.BackgroundRaster({
            dataUrl: this.canvas.toDataURL(),
            height: this.canvas.height,
            width: this.canvas.width,
        });
    };

    /**
     * Метод для записи региона в карту пикселей
     * так как это новый регион, то индекс его становится выше всех, и его соответственно видно поверх всех
     * @param {RegionObject} regionObject
     * */
    LayersManager.prototype.addRegion = function(regionObject){
        this.addRecordsAboutRegion(regionObject);
        this.objectsOrder.addObject(regionObject);
    };

    /**
     * Удаляет регион с холста
     * Отрисовывает те слои которые распологаются под ним
     * @param {CanvasEditor.RegionObject} regionObject
     * */
    LayersManager.prototype.removeRegion = function(regionObject){
        this.removeRecordsAboutRegion(regionObject);

        // удалить из порядка
        this.objectsOrder.removeObject(regionObject);

        // этот способ просто перерисосывает все слои
        this.redrawLayers();
    };

    /**
     *
     * */
    LayersManager.prototype.removeRecordsAboutRegion = function(regionObject, offset){
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

                this.pixelsMap.deleteRecord(coordinateX, coordinateY, regionObject);
            }
        }
    };

    /**
     *
     * */
    LayersManager.prototype.addRecordsAboutRegion = function(regionObject){
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

                this.pixelsMap.addRecord(coordinateX, coordinateY, regionObject);
            }
        }
    };

    /**
     * Меняет подядок региона и Синхронизирует с _map
     * */
    LayersManager.prototype.moveRegionToTop = function(regionObject){
        var orderIsChanged = this.objectsOrder.moveToTop(regionObject);;

        if (orderIsChanged){
            // не забыть переписать карту
            //this._reWriteMap();
            // todo нужно переписать не полностью а только текущий объект
            this.removeRecordsAboutRegion(regionObject);
            this.addRecordsAboutRegion(regionObject);
        }
    };

    /**
     * todo можно оптимизировать, переписав не всю карту а только часть
     * */
    LayersManager.prototype.changePosition = function(regionObject){
        regionObject.saveRecordOffset();
        //this._reWriteMap();

        // удалить в по координатам из предыдущей позиции
        var record = regionObject.getPrevRecord();
        this.removeRecordsAboutRegion(regionObject, record[0], record[1]);

        this.addRecordsAboutRegion(regionObject);
    };

    /**
     * @deprecated
     * */
    LayersManager.prototype.putPixelsAtCanvas = function(canvas, coordinates, color){
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

    /**
     * Перерисовать слои, не изменяя данных
     * Не отрисовывает активные элементы
     * */
    LayersManager.prototype.redrawLayers = function(){
        var i, len;
        var region;
        var canvas = this.canvas;

        this._cleanCanvas();

        var objects = this.objectsOrder.getObjects();
        for (i = 0, len = objects.length; i < len; i++){
            region = objects[i];

            region.drawAtCanvas(canvas);
        }
    };

    /**
     *
     * */
    LayersManager.prototype.drawActivateRegion = function(objectRegion){
        objectRegion.activate();
        this.redrawLayers();
    };

    /**
     *
     * */
    LayersManager.prototype.drawDeactivateRegion = function(objectRegion){
        objectRegion.deactivate();
        this.redrawLayers();
    };

    /**
     *
     * */
    LayersManager.prototype.drawToTopRegion = function(objectRegion){
        this.moveRegionToTop(objectRegion);
        this.redrawLayers();
    };

    /**
     * Поиск объекта по заданной координате
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * @return {boolean|RegionObject} false - если объект не найден
     * */
    LayersManager.prototype.searchRegionByCoordinate = function(x, y){
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
    };

    /**
     * Проверяет, пустой ли пиксел по заданной координате
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * @return {boolean} true если пустой
     * */
    LayersManager.prototype._pixelIsBackground = function(x, y){
        var ctx = this.canvas.getContext('2d'),
            data = ctx.getImageData(x, y, 1, 1).data,
            BGR_COLOR = [0,0,0,0];
        return data[0] == BGR_COLOR[0]
            && data[1] == BGR_COLOR[1]
            && data[2] == BGR_COLOR[2]
            && data[3] == BGR_COLOR[3];
    };

    /**
     * Очистить холст полностью
     * */
    LayersManager.prototype._cleanCanvas = function(){
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    return LayersManager;

}(CanvasEditor);