/**
 * @class RegionTool
 * @param {HTMLCanvasElement} canvas — канвас
 * @arg searchMode — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo
 * */
function RegionTool(canvas){

    this.canvas = canvas;

    /**{Uint8ClampedArray}*/
    var beforeActivatingRegionCanvasImageData = null;
    
    var that = this;

    var ctx = canvas.getContext('2d');
    var dndStartPositionX;
    var dndStartPositionY;
    var offsetX;
    var offsetY;
    var imageData = null;

    /** @type {ImageData} */
    var beforeDndDataImage = null;
    var selectedRegionObject;
    var movedImage;

    // объявляет начало и конец переноса
    var processDnD = false;

    // символизирует знак готовности данных для процесса переноса
    var prepared = false;


    function mousedown(event){

        // выделяем объект левой
        if (event.which == 1){

            // возьмем за правило, что если выделяемый пиксель имеет цвет фона холста ( прозрачный по дефолту ) то сбрасываем событие
            var data = ctx.getImageData(event.layerX, event.layerY, 1, 1).data;
            if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 0){
                return false;
            }

            // если не выделен, выделяем
            if (!selectedRegionObject){
                beforeActivatingRegionCanvasImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                selectedRegionObject = that.createRegionByPoint(event.layerX, event.layerY);
                selectedRegionObject.activate();

                // считать с холста данные и подготовить прослойку для видимого переноса
                // !!! для ускорения переброса
                // !!! но последовательный код тормозит интерфейс, поэтому выполняем в следующем потоке
                // а замыкание чтобы регион не занулился после mouseout
                setTimeout((function(region){
                    movedImage = region.getCopyLayout();
                    console.log('READY');
                }).bind(this, selectedRegionObject), 0);
            }

            // начало процесса перемещения
            processDnD = true;

            // обнуляем смещения перед новым сдвигом
            offsetX = 0;
            offsetY = 0;

            // запоминаем исходную позицию
            dndStartPositionX = event.layerX;
            dndStartPositionY = event.layerY;

        // снимаем выделение средней и правой кнопкой
        } else if (event.which == 2 || event.which == 3){

            // если не пусто, значит какой то объект выделен
            if (selectedRegionObject){

                // убираем выделение путем восстанавления первоначального состояния
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.putImageData(beforeActivatingRegionCanvasImageData, 0, 0);
                beforeActivatingRegionCanvasImageData = null;
                selectedRegionObject = null;
            }
        }

        // по одиночному клику инициализацию данных не производим
        prepared = false;
    }

    function mousemove(event){
        if (processDnD){
            // если данные для переноса не подготовлены
            if (!prepared){

                // считать с холста данные и подготовить прослойку для видимого переноса
                movedImage = selectedRegionObject.getCopyLayout();

                // стереть объект
                selectedRegionObject.clean();

                // запомнить как выглядит канвас без объекта
                beforeDndDataImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

                prepared = true;
            }

            that._dragTo(event.layerX - dndStartPositionX, event.layerY - dndStartPositionY, selectedRegionObject.layout, beforeDndDataImage);
        }
    }

    function mouseup(event){
        if (processDnD){

            if (prepared){
                that._dragTo(event.layerX - dndStartPositionX, event.layerY - dndStartPositionY, selectedRegionObject.layout, beforeDndDataImage);
            }

            // заканчиваем процесс
            processDnD = false;

            // сброс данных
            prepared = false;

            selectedRegionObject = null;
            beforeDndDataImage = null;
            movedImage = null;
        }
    }

    this.start = function(){
        canvas.addEventListener('mousedown', mousedown, false);
        canvas.addEventListener('mousemove', mousemove, false);
        canvas.addEventListener('mouseup', mouseup, false);

        beforeActivatingRegionCanvasImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //var that = this;
        //function runTest(){
        //    var start;
        //    var find;
        //    var end;
        //    var diff = 0;
        //    var center = 0;
        //    var i = 1;
        //
        //    var id = setInterval(function(){
        //
        //        start = +new Date();
        //        find = that.searchPoints(100, 100, beforeActivatingRegionCanvasImageData, canvas.width, canvas.height);
        //        end =  +new Date();
        //        diff = end - start;
        //
        //        center += diff;
        //
        //        console.log('TIME: ', diff, 'CENTER: ', parseInt(center/i++, 10));
        //
        //        if (i == 30){
        //            clearInterval(id);
        //        }
        //    }, 500);
        //}
        //runTest();
        
    };
    this.stop = function(){
        canvas.removeEventListener('mousedown', mousedown);
        canvas.removeEventListener('mousemove', mousemove);
        canvas.removeEventListener('mouseup', mouseup);
    };
}

RegionTool.prototype = Object.create(Tool);
RegionTool.prototype.constructor = RegionTool;

/**
 * Метод поиска фигуры по координате (Поиск осуществляется либо по цвету, либо по слоям)
 * @param {number} x — Координата X
 * @param {number} y — Координата Y
 * @return {RegionObject} объект фигуры
 */
RegionTool.prototype.createRegionByPoint = function(x, y){
    var start = +new Date();
    var result = this._searchPoints(x, y);

    var find = result[0];
    var register = result[1];
    var borderCoordinates = result[2];

    var end =  +new Date();
    var diff = end - start;
    console.log('TIME: ', diff);
    return new RegionObject(this.canvas, find, register, borderCoordinates);
};

/**
 * Способ поиска области фигуры по координате в режиме поиска по цвету
 * Последовательный поиск всех похожих прилегающих точек, как непосредственно,
 * так и пососедству аналогичных по цвету точек
 * @param {number} startX — координата X
 * @param {number} startY — координата Y
 * */
RegionTool.prototype._searchPoints = function (startX, startY){
    var canvas = this.canvas;
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
        var index = (y - 1) * canvasWidth * 4 + x * 4;
        return imageData.data.slice(index, index + 4);
    }

    searched.push([startX,startY]);

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

    return [searched, etalonPointImageData, borderCoordinates];
};

/**
 * Имитация переноса.
 * Перерисовывает на холсте фейковое изображение на заданные отступы.
 * @param {number} x — смещение
 * @param {number} y — смещение
 * @param {Image} image — изображение переносимой композиции
 * @param {ImageData} imageData — данные холста без переносимой композиции
 * */
RegionTool.prototype._dragTo = function (x, y, image, imageData){
    var ctx = this.canvas.getContext('2d');
    // очищаем холст
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // возвращаем в исходное состояние до переноса но уже без самого региона
    ctx.putImageData(imageData, 0, 0);
    // кладем буфер региона на холст добавляя смещение
    ctx.drawImage(image, x, y);
};