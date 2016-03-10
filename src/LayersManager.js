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

        this.addRegion(this._createBackgroundRegion());
    };

    /**
     * @return {RegionObject} объект фигуры
     * */
    LayersManager.prototype._createBackgroundRegion = function(){
        var imageData = this.canvas.getContext('2d').getImageData(0,0,this.canvas.width, this.canvas.height);
        var coordinates = [];
        for (var x = 0, lenX = this.canvas.width; x < lenX; x++){
            //coordinates.length === this.canvas.height*this.canvas.width;
            for (var y = 0, lenY = this.canvas.height; y < lenY; y++){
                coordinates.push([x,y])
            }
        }
        return new CanvasEditor.RegionObject({
            imageData: imageData,
            coordinates: coordinates,
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
    LayersManager.prototype.removeRecordsAboutRegion = function(regionObject, offsetX, offsetY){
        // не забыть про смещение
        var offsetX = typeof offsetX === 'undefined' ? regionObject.offsetX : offsetX;
        var offsetY = typeof offsetY === 'undefined' ? regionObject.offsetY : offsetY;

        var coordinates = regionObject.getRelationCoordinate(null, offsetX, offsetY);
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
    LayersManager.prototype.putPixelsAtCanvas = function(canvas, coordinates, etalonPointImageData){
        var canvasCtx = canvas.getContext('2d');
        var imageData = canvasCtx.createImageData(1,1);
        var data = imageData.data;
        data[0] = etalonPointImageData[0];
        data[1] = etalonPointImageData[1];
        data[2] = etalonPointImageData[2];
        data[3] = etalonPointImageData[3];

        var coordinate, i, len;
        for (i = 0, len = coordinates.length; i < len; i++){
            coordinate = coordinates[i];
            canvasCtx.putImageData(imageData, coordinate[0], coordinate[1]);
        }
    };

    /**
     * @param {HTMLCanvasElement} canvas — холст
     * @param {number[][]} coordinateLine — исходные координаты (линия 1-но пиксельной фигуры)
     * @return {CanvasEditor.RegionObject} объект фигуры
     * */
    LayersManager.prototype.createRegion = function(canvas, coordinateLine){
        var beginWithX = coordinateLine[0][0];
        var beginWithY = coordinateLine[0][1];
        var etalonPointImageData = canvas.getContext('2d').getImageData(beginWithX, beginWithY, 1, 1).data;
        var searchedData = this._searchPixels(beginWithX, beginWithY, canvas);
        var coordinates = searchedData[0];
        var borderCoordinates = searchedData[1];

        return new CanvasEditor.RegionObject({
            height: canvas.height,
            width: canvas.width,
            coordinates: coordinates,
            color: etalonPointImageData,
            borderCoordinates: borderCoordinates,
            coordinateLine: coordinateLine,
        });
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
            region = this.createRegion(this.canvas, [[x, y]]);

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
     * Алгоритм поиска области фигуры по координате в режиме поиска по цвету
     * Последовательный поиск всех похожих прилегающих точек, как непосредственно,
     * так и посредством аналогичных по цвету точек
     * @param {number} startX — координата X с которой начинается поиск
     * @param {number} startY — координата Y с которой начинается поиск
     * @param {HTMLCanvasElement} canvas — анализируемый холст
     * */
    LayersManager.prototype._searchPixels = function (startX, startY, canvas){
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var imageData = canvas.getContext('2d').getImageData(0, 0, canvasWidth, canvasHeight);
        var searched = [];
        var etalonPointImageData = getPointImageData(startX, startY);
        var coordinate;
        var i;
        var len;
        var pointDataImage;
        var register = {};
        var etalonPointImageData0 = etalonPointImageData[0];
        var etalonPointImageData1 = etalonPointImageData[1];
        var etalonPointImageData2 = etalonPointImageData[2];
        var etalonPointImageData3 = etalonPointImageData[3];
        var x;
        var y;
        var arr;
        var item;
        var itemCoordinateX;
        var itemCoordinateY;
        var incX;
        var incY;
        var decX;
        var decY;
        var isZeroX;
        var isZeroY;
        var isMaxX;
        var isMaxY;
        var index = 0;
        var borderCoordinates = [];

        var mapCoordinateToPixel = {};

        function setRecord(x,y, data){
            if (!register[x])
                register[x] = {};

            register[x][y] = data;
            //register[x+y/10000] = 1;
        }

        function getRecord(x,y){
            return register[x] && register[x][y];
            //return register[x+y/10000];
        }

        function getPointImageData(x, y){
            var index = (y * canvasWidth + x) * 4;
            return imageData.data.slice(index, index + 4);
        }

        searched.push([startX,startY]);
        setRecord(startX,startY, etalonPointImageData);

        //var TOP = 1;
        //var RIGHT = 2;
        //var BOTTOM = 4;
        //var LEFT = 8;
        //
        //var TOP_LEFT = TOP | LEFT;
        //var TOP_RIGHT = TOP | RIGHT;
        //var BOTTOM_LEFT = BOTTOM | LEFT;
        //var BOTTOM_RIGHT = BOTTOM | RIGHT;


        // использование живой очереди вместо рекурсии, потому что
        // она обуславливает другую последовательность обработки пикселов
        // + стрек выполнения рекурсий имеет ограничение
        while ( searched.length > index ){
            coordinate = searched[index];

            index++;

            x = coordinate[0];
            y = coordinate[1];

            // Координаты непосредственных соседних точек
            // четырех связность быстрее чем восьмисвязность

            arr = [];

            incX = x + 1;
            incY = y + 1;
            decX = x - 1;
            decY = y - 1;

            isZeroX = (x === 0);
            isZeroY = (y === 0);

            isMaxX = (x === canvasWidth);
            isMaxY = (y === canvasHeight);

            if (isZeroX || isZeroY || isMaxX || isMaxY){

                if (decY > 0 && decY < canvasHeight){
                    arr[0] = [ x, decY ];
                }

                if (incX > 0 && incX < canvasWidth){
                    arr[arr.length] = [ incX, y ];
                }

                if (incY > 0 && incY < canvasHeight){
                    arr[arr.length] = [ x, incY ];
                }

                if (decX > 0 && decX < canvasWidth){
                    arr[arr.length] = [ decX, y ];
                }

            } else {
                arr = [ [ x, decY ], [ decX, y ], [ incX, y ], [ x, incY ] ];
                //arr.concat( [ x-1, decY ], [ decX, y+1 ], [ incX, y-1 ], [ x+1, incY ] );// восьмисвязный
            }

            //if (isZeroX || isZeroY || isMaxX || isMaxY){
            //    switch ((isZeroX && LEFT) | (isZeroY && TOP) | (isMaxX && RIGHT) | (isMaxY && BOTTOM)){
            //        case 1:  arr = [              [ decX, y ], [ incX, y ], [ x, incY ] ]; break;
            //        case 2:  arr = [ [ x, decY ], [ decX, y ],              [ x, incY ] ]; break;
            //        case 4:  arr = [ [ x, decY ], [ decX, y ], [ incX, y ]              ]; break;
            //        case 8:  arr = [ [ x, decY ],              [ incX, y ], [ x, incY ] ]; break;
            //        case 9:  arr = [                           [ incX, y ], [ x, incY ] ]; break;
            //        case 3:  arr = [              [ decX, y ]             , [ x, incY ] ]; break;
            //        case 12: arr = [ [ x, decY ],              [ incX, y ]              ]; break;
            //        case 6:  arr = [ [ x, decY ], [ decX, y ]                           ]; break;
            //        default:
            //            arr = [ [ x, decY ], [ decX, y ], [ incX, y ], [ x, incY ] ]; break;
            //    }
            //} else {
            //    arr = [ [ x, decY ], [ decX, y ], [ incX, y ], [ x, incY ] ];
            //}

            // 2 Выбрать из набора точки, которые еще не проходили проверку

            for (i = 0, len = arr.length; i < len; i += 1){

                item = arr[i];
                itemCoordinateX = item[0];
                itemCoordinateY = item[1];
                // если точка не зарегистрирована
                if ( ! getRecord(itemCoordinateX, itemCoordinateY) ){

                    // найти ее данные
                    pointDataImage = getPointImageData(itemCoordinateX, itemCoordinateY);

                    // если данные совпадают
                    if (
                        pointDataImage[0] === etalonPointImageData0
                        && pointDataImage[1] === etalonPointImageData1
                        && pointDataImage[2] === etalonPointImageData2
                    //&& pointDataImage[3] === etalonPointImageData3 // чтобы бордер с альфой оставить
                    ){

                        // не теряем информацию о пикселе
                        // добавить в коллекцию
                        searched.push(item);
                    } else {
                        borderCoordinates.push(item);
                    }

                    // а заодно добавить их в регистр (в регистр попадают все точки, прошедшие проверку на схожесть с эталонной)
                    setRecord(itemCoordinateX, itemCoordinateY, pointDataImage);
                }
            }

        }

        return [searched, borderCoordinates];
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