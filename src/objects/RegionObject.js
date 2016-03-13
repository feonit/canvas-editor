!function(CanvasEditor){

    var MathFn = CanvasEditor.MathFn;

    CanvasEditor.namespace('CanvasEditor').RegionObject = (function(){
        /**
         * @class RegionObject
         * @memberof CanvasEditor
         * @param {HTMLCanvasElement} layout
         * @param {number[][]} coordinates
         * @param {number[]} color
         * @param {number[][]} borderCoordinates
         * @param {number[][]} coordinatesLine — исходные координаты 1-но пиксельной фигуры
         * */
        var RegionObject = (function(){

            /**
             * Номер последнего слоя
             * @type {number}
             * */
            var incId = 0;

            return function RegionObject(options){

                options = options || {};

                /** @lends RegionObject */
                this.id = incId++;

                /**
                 * Регион имеет один цвет
                 * @type {ImageData.data}
                 * */
                this.etalonPointImageData = options.color;

                /**
                 *
                 * */
                this.borderCoordinates = options.borderCoordinates;

                this.coordinatesLine = options.coordinatesLine;

                this.coordinates = options.coordinates || null;

                /**
                 * Смещение слоя на главноем холсте после транспортировки
                 * Первая запись гласит о нулевом смещении
                 * @arg {number[][]}
                 * */
                this.recordsOffset = [[0,0]];
                this.offsetX = 0;
                this.offsetY = 0;
                this.height = options.height;
                this.width = options.width;
                this.isActived = false;

            };
        }());

        /**
         * @param {HTMLCanvasElement} canvas — холст
         * @param {number[]} coordinate — координата точки на холсте, откуда начнется поиск объекта
         * @return {RegionObject} объект фигуры
         * */
        RegionObject.createRegion = function(canvas, coordinate){
            var beginWithX = coordinate[0];
            var beginWithY = coordinate[1];
            var etalonPointImageData = canvas.getContext('2d').getImageData(beginWithX, beginWithY, 1, 1).data;
            var searchedData = RegionObject._searchPixels(beginWithX, beginWithY, canvas);
            var coordinates = searchedData[0];
            var borderCoordinates = searchedData[1];

            return new RegionObject({
                height: canvas.height,
                width: canvas.width,
                coordinates: coordinates,
                color: etalonPointImageData,
                borderCoordinates: borderCoordinates
            });
        };

        /**
         * Алгоритм поиска области фигуры по координате в режиме поиска по цвету
         * Последовательный поиск всех похожих прилегающих точек, как непосредственно,
         * так и посредством аналогичных по цвету точек
         * @param {number} startX — координата X с которой начинается поиск
         * @param {number} startY — координата Y с которой начинается поиск
         * @param {HTMLCanvasElement} canvas — анализируемый холст
         * */
        RegionObject._searchPixels = function (startX, startY, canvas){
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

        RegionObject.prototype.getCoordinates = function(){
            var coordinatesLine = this.getCoordinatesLine();
            if (!coordinatesLine.length){
                throw 'нет сырых точек';
            }

            if (!this.coordinates){
                var beginWithX = this.coordinatesLine[0][0];
                var beginWithY = this.coordinatesLine[0][1];
                var searchedData = RegionObject._searchPixels(beginWithX, beginWithY, this.getLayout());
                this.coordinates = searchedData[0];
                this.borderCoordinates = searchedData[1];
            }

            return this.coordinates;
        };

        RegionObject.prototype.getCoordinatesLine = function(){
            alert('must be implemented')
        };

        /**
         *
         * */
        RegionObject.prototype.renderCircles = function(canvas){
            var coordinates = this.getCoordinatesLine();

            var color = this.color;
            var ctx = canvas.getContext('2d');
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;

            var radius = Math.floor(this.size/2);
            coordinates.forEach((function(coor){
                this.renderCircle(ctx, coor[0], coor[1], radius, color);
            }).bind(this));
        };

        /**
         * Метод рисует кривые используя способ вставки изображений
         * */
        RegionObject.prototype.renderCircle = (function(){
            var _canvas1px = document.createElement('canvas');
            _canvas1px.height = 1;
            _canvas1px.width = 1;

            var _canvas1pxCtx = _canvas1px.getContext('2d');
            var _imageData = _canvas1pxCtx.createImageData(1,1);

            var savedColor = [255, 0, 0 , 255];
            _imageData.data[0] = savedColor[0];
            _imageData.data[1] = savedColor[1];
            _imageData.data[2] = savedColor[2];
            _imageData.data[3] = 255;

            _canvas1pxCtx.putImageData(_imageData, 0, 0);

            var _stored = {};

            return function (ctx, x, y, radius, color){
                var colorHasChanged = color[0] !== savedColor[0]
                    || color[1] !== savedColor[1]
                    || color[2] !== savedColor[2];

                // если цвет изменился, сохраняем его
                if (colorHasChanged){
                    savedColor = color;
                }

                var canvasRadius = _stored[radius];

                // подготовить новую картинку если новый радиус или новый цвет
                if (!canvasRadius || colorHasChanged){

                    if (colorHasChanged){
                        _imageData.data[0] = color[0];
                        _imageData.data[1] = color[1];
                        _imageData.data[2] = color[2];
                        _imageData.data[3] = 255;

                        _canvas1px.height = 1;
                        _canvas1px.width = 1;

                        _canvas1pxCtx.putImageData(_imageData, 0, 0);
                    }

                    var canvasR = document.createElement('canvas');
                    var powRadius = radius*2;
                    // так как циркуль в 1пиксель радиуса имеет 3 пикселя в диаметре по алгоритму
                    // а когда радиус 0 то диаметр 1пиксель
                    canvasR.height = powRadius + 1;
                    canvasR.width = powRadius + 1;
                    var coordinates = MathFn.getCircleCoordinates(radius);
                    var len = coordinates.length;
                    var canvasRCtx = canvasR.getContext('2d');

                    var coorX, coorY;
                    while(len > 0){
                        len--;
                        var coordinate;
                        coordinate = coordinates[len];
                        coorX = coordinate[0] + radius;
                        coorY = coordinate[1] + radius;
                        canvasRCtx.drawImage(_canvas1px, coorX, coorY);
                    }

                    _stored[radius] = canvasRadius = canvasR;
                }

                // поместить картинку
                ctx.drawImage(canvasRadius, x - radius, y - radius);
            }
        })();

        RegionObject.prototype.getLayout = function(){
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
                };

                this.renderCircles(layoutCanvas);

                //drawPixelsAtCanvas(layoutCanvas, , this.color);

                Object.defineProperty(this, '_layout', {value: layoutCanvas});
            }

            return this._layout;
        };

        RegionObject.prototype.setLayout = function(layout){
            this._layout = layout;
        };

        RegionObject.prototype.saveRecordOffset = function(){
            this.recordsOffset.push([this.offsetX, this.offsetY])
        };

        /**
         * Сгенерировать новый набор оригинальных координат с применением актуального отступа
         * */
        RegionObject.prototype.getRelationCoordinate = function(coordinates, offsetX, offsetY){
            var relation = [];
            var offsetX = typeof offsetX === 'undefined' ? this.offsetX : offsetX;
            var offsetY = typeof offsetY === 'undefined' ? this.offsetY : offsetY;
            var coordinates = coordinates || this.getCoordinates();

            for (var i = 0, len = coordinates.length; i < len; i+=1 ) {
                relation[i] = [];
                relation[i][0] = coordinates[i][0];
                relation[i][1] = coordinates[i][1];
            }

            this._addOffsetToCoordinate(relation, offsetX, offsetY);

            return relation;
        };

        RegionObject.prototype.getPrevRecord = function(){
            var record = this.recordsOffset[this.recordsOffset.length - 2];
            return record;
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
        RegionObject.prototype.activate = function(){
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
                    var colorData = CanvasEditor.MathFn.getRandomColorData();

                    imageData.data[0] = colorData[0];
                    imageData.data[1] = colorData[1];
                    imageData.data[2] = colorData[2];
                    imageData.data[3] = colorData[3];

                    layout.getContext('2d').putImageData(imageData, coordinates[i][0], coordinates[i][1]);
                }

                // сохраненная версия обводки для объекта
                Object.defineProperty(this, '__storedBorderImageData', {value: layout.getContext('2d').getImageData(0, 0, layout.width, layout.height)});

            }
        };

        /**
         * Метод удаления подцветки, путем восстановление ранее сохраненной копии оригинального лейаута
         * */
        RegionObject.prototype.deactivate = function(){
            if (!this.isActived) return;
            this.isActived = false;
            var layout = this.getLayout();
            layout.getContext('2d').clearRect(0, 0, layout.width, layout.height);
            layout.getContext('2d').putImageData(this.__originalLayoutImageData, 0, 0);
        };

        RegionObject.prototype.drawAtCanvas = function(canvas){
            // кладем буфер региона на холст добавляя смещение
            canvas.getContext('2d').drawImage(this.getLayout(), this.offsetX, this.offsetY);
        };

        return RegionObject;
    }());

}(CanvasEditor);