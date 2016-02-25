!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').RegionObject = RegionObject;

    /**
     * @class RegionObject
     * @memberof CanvasEditor
     * @param {Object} options
     * @param {HTMLCanvasElement} options.canvas
     * @param {number[][]} options.coordinates
     * @param {number[][]} options.borderCoordinates
     * */
    function RegionObject(options){
        options = options || {};

        /**
         * Регион имеет один цвет
         * @type {ImageData.data}
         * */
        this.etalonPointImageData = options.etalonPointImageData;

        /**
         * Смещение слоя на главноем холсте после транспортировки
         * Первая запись гласит о нулевом смещении
         * @arg {number[][]}
         * */
        this.recordsOffset = [[0,0]];

        this.offsetX = 0;

        this.offsetY = 0;

        this._width = options.width;

        this._height = options.height;

        this.canvas = options.canvas;

        /**
         * Массив координат пикселей объекта на холсте
         * @type {number[][]}
         * */
        this._originalCoordinates = options.coordinates;

        /**
         * Картинка с регионом размером с сам холст
         * @type {HTMLCanvasElement}
         * */
        this._layout = (function(){
            var layoutCanvas = document.createElement('canvas');
            layoutCanvas.height = this._height;
            layoutCanvas.width = this._width;
            this._drawLayout(layoutCanvas);
            return layoutCanvas;
        }.call(this));

        /** */
        this.borderCoordinates = options.borderCoordinates;

    }

    RegionObject.prototype.getLayout = function(){
        return this._layout;
    };

    RegionObject.prototype.setLayout = function(layout){
        this._layout = layout;
    };

    RegionObject.prototype.saveRecordOffset = function(){
        this.recordsOffset.push([this.offsetX, this.offsetY])
    };

    RegionObject.prototype.getOriginalCoordinates = function(){
        return this._originalCoordinates;
    };

    RegionObject.prototype._drawLayout = function(layout){
        var relationCoordinate = this.getRelationCoordinate();
        //todo
        CanvasEditor.Tool.DrawingTool.prototype.drawPixelsAtCanvas.call(null, layout, relationCoordinate, this.etalonPointImageData);
    };

    /**
     * Сгенерировать новый набор оригинальных координат с применением актуального отступа
     * */
    RegionObject.prototype.getRelationCoordinate = function(coordinates, offsetX, offsetY){
        var relation = [];
        var offsetX = offsetX || this.offsetX;
        var offsetY = offsetY || this.offsetY;
        var coordinates = coordinates || this._originalCoordinates;

        for (var i = 0, len = coordinates.length; i < len; i+=1 ) {
            relation[i] = [];
            relation[i][0] = coordinates[i][0];
            relation[i][1] = coordinates[i][1];
        }

        this._addOffsetToCoordinate(relation, offsetX, offsetY);

        return relation;
    };

    /**
     * Добавить отступ набору координат
     * @param {number[][]} coordinates
     * @param {number} offsetX
     * @param {number} offsetY
     * */
    RegionObject.prototype._addOffsetToCoordinate = function(coordinates, offsetX, offsetY){
        for (var i = 0, len = coordinates.length; i < len; i+=1 ){
            coordinates[i][0] += offsetX;
            coordinates[i][1] += offsetY;
        }
        return coordinates;
    };


    /**
     * Метод создания подцветки
     * */
    RegionObject.prototype.activate = function(canvasS){
        //var ctx = canvasS.getContext('2d');

         //обновить переносимую картинку
        //var canvas = document.createElement('canvas');
        //canvas.width = canvasS.width;
        //canvas.height = canvasS.height;
        //var ctx = canvas.getContext('2d');
        //ctx.drawImage(this._layout, 0, 0);

        //var ctx = this.getLayout().getContext('2d');
        //this.__canvasBeforeActivate = ctx.getImageData(0, 0, canvasS.width, canvasS.height);
        //
        //this.borderCoordinates.forEach((function(arr){
        //    ctx.fillStyle = 'yellow';
        //    ctx.fillRect( arr[0], arr[1] , 1, 1 ); // -1 смещение
        //}).bind(this));

        //var image = new Image();
        //image.height = canvas.height;
        //image.width = canvas.width;
        //this._layout = image;
    };

    /**
     * Метод удаления подцветки
     * */
    RegionObject.prototype.deactivate = function(){
        if (this.__canvasBeforeActivate){
            //var layout = this.getLayout();
            //var ctx = layout.getContext('2d');
            //ctx.putImageData(this.__canvasBeforeActivate, 0, 0);
            //this.__canvasBeforeActivate = null;
        }
    };

    /**
     * Алгоритм поиска области фигуры по координате в режиме поиска по цвету
     * Последовательный поиск всех похожих прилегающих точек, как непосредственно,
     * так и посредством аналогичных по цвету точек
     * @param {number} startX — координата X с которой начинается поиск
     * @param {number} startY — координата Y с которой начинается поиск
     * @param {HTMLCanvasElement} canvas — анализируемый холст
     * @return {CanvasEditor.RegionObject} объект фигуры
     * */
    RegionObject.createRegion = function (startX, startY, canvas){
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

        return new RegionObject({
            width: canvas.width,
            height: canvas.height,
            coordinates: searched,
            borderCoordinates: borderCoordinates,
            etalonPointImageData: etalonPointImageData
        });
    };

    return RegionObject;
}(CanvasEditor);