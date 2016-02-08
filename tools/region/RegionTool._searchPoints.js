/**
 * Алгоритм поиска области фигуры по координате в режиме поиска по цвету
 * Последовательный поиск всех похожих прилегающих точек, как непосредственно,
 * так и посредством аналогичных по цвету точек
 * @param {number} startX — координата X
 * @param {number} startY — координата Y
 * @param {HTMLCanvasElement} canvas — анализируемый холст
 * */
RegionTool.prototype._searchPoints = function (startX, startY, canvas){
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