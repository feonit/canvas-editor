!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').LayersManager = LayersManager;

    /**
     * @class LayersManager
     * @memberof CanvasEditor
     * @param appInstance
     * @param {HTMLCanvasElement} canvas
     * */
    function LayersManager(appInstance, canvas){

        this.canvas = canvas;

        /**
         * Каждый новый слой имеет свой номер, который инкрементируется начиная с дефолтового значения
         * @type {number}
         * */
        this._INDEX_DEFAULT = 0;

        /**
         * Объект Карта отвечает за информацию по соотношению каждого пикселя из карты к группе слоев
         * накладываемых друг на друга в определенном порядке
         * Карта отображения координаты пикселя в порядок слоев расположенных на нем
         * @type {Object}
         * */
        this._map = {};

        /**
         * Номер последнего слоя
         * @type {number}
         * */
        this._currentIndex = this._INDEX_DEFAULT;

        /**
         * Список слоев по номерам
         * @type {Object}
         * */
        this._regions = {};
    }

    /**
     * Метод для записи региона в карту пикселей
     * так как это новый регион, то индекс его становится выше всех, и его соответственно видно поверх всех
     * @param {CanvasEditor.RegionObject} regionObject
     * */
    LayersManager.prototype.addRegion = function(regionObject){
        // не забыть про смещение
        var offsetX = regionObject.offsetX;
        var offsetY = regionObject.offsetY;

        var newIndex = ++this._currentIndex;
        var coordinates = regionObject.getOriginalCoordinates();
        var coordinate;
        var coordinateX;
        var coordinateY;
        if (coordinates.length){
            for (var i = 0, len = coordinates.length; i < len; i += 1){
                coordinate = coordinates[i];
                coordinateX = coordinates[i][0];
                coordinateY = coordinates[i][1];

                this._addRecord(coordinateX + offsetX, coordinateY + offsetY, newIndex);
            }
        }
        this._regions[newIndex] = regionObject;
    };

    /**
     * Удаляет регион с холста
     * Отрисовывает те слои которые распологаются под ним
     * @param {CanvasEditor.RegionObject} removedRegion
     * */
    LayersManager.prototype.removeRegion = function(removedRegion){
        var relationCoordinates = removedRegion.getRelationCoordinate();
        var removedRegionIndex = this._findIndexOfRegion(removedRegion);
        var coordinate;
        var coordinateX;
        var coordinateY;

        // отсортировать каждый пиксел области по индексу слоя
        var sort = {};

        var ctx = this.canvas.getContext('2d');

        // незабываем подчистить связь региона и индекса
        delete this._regions[removedRegionIndex];

        for (var i = 0, len = relationCoordinates.length; i < len; i++){
            coordinate = relationCoordinates[i];
            coordinateX = coordinate[0];
            coordinateY = coordinate[1];

            // для каждого пиксела удаляем запись об удаляемом регионе
            this._removeRecord(coordinateX, coordinateY, removedRegionIndex);

            // находим последний регион для этого пиксела
            var region = this._getRegionByPx(coordinateX, coordinateY);

            if (region){
                var index = this._findIndexOfRegion(region);

                if (!sort[index]) sort[index] = [];

                sort[index].push(coordinate);

                ctx.clearRect(coordinateX, coordinateY, 1, 1); // -1 смещение

            } else {
                ctx.clearRect(coordinateX, coordinateY, 1, 1); // -1 смещение
            }

        }

        for( var key in sort){
            region = this._regions[key];
            relationCoordinates = sort[key];
            this.drawPixelsAtCanvas(this.canvas, relationCoordinates, region.etalonPointImageData);
        }
    };

    LayersManager.prototype.drawPixelsAtCanvas = function(canvas, coordinates, etalonPointImageData){
        var canvasCtx = canvas.getContext('2d');
        var imageData = canvasCtx.createImageData(1,1);
        var data = imageData.data;
        data[0] = etalonPointImageData[0];
        data[1] = etalonPointImageData[1];
        data[2] = etalonPointImageData[2];
        data[3] = 255;// etalon[3]; !!!!!!!!!
        var canvas1px = document.createElement('canvas');
        canvas1px.height = 1;
        canvas1px.width = 1;
        var canvas1pxCtx = canvas1px.getContext('2d');
        canvas1pxCtx.putImageData(imageData, 0, 0);
        var coordinate, i, len;
        for (i = 0, len = coordinates.length; i < len; i++){
            coordinate = coordinates[i];
            canvasCtx.drawImage(canvas1px, coordinate[0], coordinate[1]);
        }
    };

    /**
     * Метод поиска региона по карте пикселей с определенной координатой
     * @param {number} x — Координата X
     * @param {number} y — Координата Y
     * @param {number} [offset=0] — Смещение по истории
     * */
    LayersManager.prototype._getRegionByPx = function(x, y, offset){
        offset = offset || 0;
        if (this._map[x] && this._map[x][y] ){
            var history = this._map[x][y];
            var lastRecordIndex = history.length - 1 + offset;

            return this._regions[history[lastRecordIndex]];
        }
    };

    /**
     * Определение номера региона
     * @param {CanvasEditor.RegionObject} regionObject
     * */
    LayersManager.prototype._findIndexOfRegion = function(regionObject){
        var index;

        for (var key in this._regions){
            if (this._regions[key] === regionObject){
                index = parseInt(key, 10);
            }
        }

        return index;
    };

    /**
     * Метод пополнения карты новыми данными
     * @param {number} x — Координата X
     * @param {number} y — Координата Y
     * @param {number} record — индекс
     * */
    LayersManager.prototype._addRecord = function(x, y, record){
        //console.log(coordinateX, coordinateY, record)
        if (!this._map[x])
            this._map[x] = {};

        if (!this._map[x][y]){
            this._map[x][y] = []; // <- история индексов для пиксела
        }

        this._map[x][y].push(record);
    };

    /**
     * Метод удаления данных из карты
     * */
    LayersManager.prototype._removeRecord = function(x, y, record){
        if ( this._map[x] && this._map[x][y] ){
            var index = this._map[x][y].indexOf(record);
            if (index !== -1){
                var removedRecord = this._map[x][y].splice(index, 1)[0];
            }
        }

        return removedRecord;
    };

    LayersManager.prototype.dropLayersData = function(){
        this._regions = {};
        this._map = {};
        this._currentIndex = this._INDEX_DEFAULT;
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
     * @param {} canvas
     * @param {number[][]} coordinateLine — исходные координаты 1-но пиксельной фигуры
     * @return {CanvasEditor.RegionObject} объект фигуры
     * */
    LayersManager.prototype.createRegion = function(canvas, coordinateLine){
        var beginWithX = coordinateLine[0][0];
        var beginWithY = coordinateLine[0][1];
        var etalonPointImageData = canvas.getContext('2d').getImageData(beginWithX, beginWithY, 1, 1).data;
        var searched = this._searchPixels(beginWithX, beginWithY, canvas);

        // вместо генерации можно было бы получить сразу используя вторую канву
        var layoutCanvas = document.createElement('canvas');
        layoutCanvas.height = canvas.height;
        layoutCanvas.width = canvas.width;

        this.drawPixelsAtCanvas(layoutCanvas, searched[0], etalonPointImageData);

        return new CanvasEditor.RegionObject(
            layoutCanvas,
            etalonPointImageData,
            searched[0],
            searched[1],
            coordinateLine
        );
    };

    LayersManager.prototype.redrawRegions = function(){
        var store = {};
        var region;
        var regionIndex;

        // clear all
        for (regionIndex in this._regions){
            region = this._regions[regionIndex];
            store[regionIndex] = region;
            this.removeRegion(region);
        }

        // clean borders
        this._cleanCanvas();

        // draw all
        for (regionIndex in store){
            region = store[regionIndex];
            store[regionIndex] = region;
            this.addRegion(region);
            this.drawRegion(region);
        }
    };

    LayersManager.prototype.drawRegion = function(region){
        // кладем буфер региона на холст добавляя смещение
        ctx.drawImage(region.getLayout(), region.offsetX, region.offsetY);
    };

    LayersManager.prototype._cleanCanvas = function(){
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    LayersManager.prototype.searchRegionByCoordinate = function(x, y){
        // возьмем за правило, что если выделяемый пиксель имеет цвет фона холста ( прозрачный по дефолту ) то сбрасываем событие
        if (this._pixelIsBackground(x, y)) return false;

        //пробуем найти регион по индексовой карте (поиск по слою)
        var region = this._getRegionByPx(x, y);

        if (!region){
            // пробуем найти регион волшебной палочкой (поиск по цвету)
            region = this.createRegion(canvas, [[x, y]]);
            this.addRegion(region);
        }

        return region;
    };

    /**
     * @param {number} x
     * @param {number} y
     * @return {boolean}
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

    return LayersManager;

}(CanvasEditor);