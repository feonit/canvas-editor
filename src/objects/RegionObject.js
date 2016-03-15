!function(APP){
    APP.namespace('APP');
    var MathFn = APP.MathFn;
    /**
     * Номер последнего слоя
     * @type {number}
     * */
    var incId = 0;

    /**
     * @class RegionObject
     * @memberof APP
     * @param {Object} options
     * @param {HTMLCanvasElement} options.layout
     * @param {number[][]} options.coordinates
     * @param {number[]} options.color
     * @param {number[][]} options.borderCoordinates
     * @param {number[][]} options.coordinatesLine — исходные координаты 1-но пиксельной фигуры
     * */
    APP.RegionObject = function (options){

        options = options || {};

        /**
         * Уникальный идентификатор объекта
         * @type {number}
         * */
        this.id = incId++;

        /**
         * Регион имеет один цвет
         * @type {number[]}
         * */
        this.color = options.color;

        /**
         * Координаты обводки контура
         * @type {number[][]}
         * */
        Object.defineProperty(this, 'borderCoordinates', {
            value: options.borderCoordinates || null,
            enumerable: false,
            writable: true
        });

        /**
         * Координаты точек контура
         * @type {number[][]}
         * */
        Object.defineProperty(this, 'coordinates', {
            value: options.coordinates || null,
            enumerable: false,
            writable: true
        });

        /**
         * Лейоут
         * */
        Object.defineProperty(this, '_layout', {
            value: null,
            enumerable: false,
            writable: true
        });

        /**
         * Смещение слоя на главноем холсте после транспортировки.
         * @arg {number[][]}
         * */
        this.recordsOffset = [[0,0]];
        this.offset = [0,0];
        this.height = options.height;
        this.width = options.width;
        this.isActived = false;

        // Первая запись гласит о нулевом смещении
        /** @lends RegionObject */
        this.saveRecordOffset();
    };

    APP.RegionObject.prototype = {
        constructor: APP.RegionObject,

        getCoordinates : function(){

            if (!this.coordinates){
                var beginWithX = this.coordinatesLine[0][0];
                var beginWithY = this.coordinatesLine[0][1];
                var searchedData = RegionObject._searchPixels(beginWithX, beginWithY, this.getLayout());
                this.coordinates = searchedData[0];
                this.borderCoordinates = searchedData[1];
            }

            return this.coordinates;
        },

        getLayout : function(){
            if (!this._layout){
                var layoutCanvas = document.createElement('canvas');
                layoutCanvas.height = this.height;
                layoutCanvas.width = this.width;

                // вместо генерации можно было бы получить сразу используя вторую канву
                function drawPixelsAtCanvas(canvas, coordinates, etalonPointImageData){
                    var canvasCtx = canvas.getContext('2d');
                    var imageData = canvasCtx.createImageData(1,1);
                    var data = imageData.data;
                    data[0] = etalonPointImageData[0];
                    data[1] = etalonPointImageData[1];
                    data[2] = etalonPointImageData[2];
                    data[3] = etalonPointImageData[3];
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
                }

                drawPixelsAtCanvas(layoutCanvas, this.getCoordinates(), this.color);

                this._layout = layoutCanvas;
            }

            return this._layout;
        },

        saveRecordOffset : function(){
            this.recordsOffset.push([this.offset[0], this.offset[1]])
        },

        /**
         * Сгенерировать новый набор оригинальных координат с применением актуального отступа
         * @param {number[][]} coordinates
         * @param {number[]} offset
         * */
        getRelationCoordinate : function(coordinates, offset){
            var relation = [];

            coordinates = coordinates || this.getCoordinates();

            for (var i = 0, len = coordinates.length; i < len; i+=1 ) {
                relation[i] = [];
                relation[i][0] = coordinates[i][0];
                relation[i][1] = coordinates[i][1];
            }

            offset = offset || this.offset;

            this._addOffsetToCoordinate(relation, offset);

            return relation;
        },

        getPrevRecord : function(){
            return this.recordsOffset[this.recordsOffset.length - 2];
        },

        /**
         * Добавить отступ набору координат
         * @param {number[][]} coordinates
         * @param {number[]} offset
         * */
        _addOffsetToCoordinate : function(coordinates, offset){
            for (var i = 0, len = coordinates.length; i < len; i+=1 ){
                coordinates[i][0] += offset[0];
                coordinates[i][1] += offset[1];
            }
            return coordinates;
        },

        /**
         * Метод создания подцветки
         * */
        activate : function(){
            if (this.isActived) return;
            this.isActived = true;
            if (this.borderCoordinates && this.borderCoordinates.length){
                var layout = this.getLayout();

                if (this.__storedBorderImageData){
                    layout.getContext('2d').putImageData(this.__storedBorderImageData, 0, 0);
                    return;
                }

                var coordinates = this.borderCoordinates;
                Object.defineProperty(this, '__originalLayoutImageData', {value: layout.getContext('2d').getImageData(0, 0, layout.width, layout.height)});

                // отрисовать бордер
                var imageData = layout.getContext('2d').createImageData(1, 1);
                for (var i=0, len=coordinates.length; i < len; i++){
                    var colorData = MathFn.getRandomColorData();

                    imageData.data[0] = colorData[0];
                    imageData.data[1] = colorData[1];
                    imageData.data[2] = colorData[2];
                    imageData.data[3] = colorData[3];

                    layout.getContext('2d').putImageData(imageData, coordinates[i][0], coordinates[i][1]);
                }

                // сохраненная версия обводки для объекта
                Object.defineProperty(this, '__storedBorderImageData', {value: layout.getContext('2d').getImageData(0, 0, layout.width, layout.height)});

            }
        },

        /**
         * Метод удаления подцветки, путем восстановление ранее сохраненной копии оригинального лейаута
         * */
        deactivate : function(){
            if (!this.isActived) return;
            this.isActived = false;
            var layout = this.getLayout();
            layout.getContext('2d').clearRect(0, 0, layout.width, layout.height);
            layout.getContext('2d').putImageData(this.__originalLayoutImageData, 0, 0);
        },

        drawAtCanvas : function(canvas){
            // кладем буфер региона на холст добавляя смещение
            canvas.getContext('2d').drawImage(this.getLayout(), this.offset[0], this.offset[1]);
        }
    };

    /**
     * Алгоритм поиска области фигуры по координате в режиме поиска по цвету
     * Последовательный поиск всех похожих прилегающих точек, как непосредственно,
     * так и посредством аналогичных по цвету точек
     * @param {number} startX — координата X с которой начинается поиск
     * @param {number} startY — координата Y с которой начинается поиск
     * @param {HTMLCanvasElement} canvas — анализируемый холст
     * */
    APP.RegionObject._searchPixels = function (startX, startY, canvas){
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
}(APP);