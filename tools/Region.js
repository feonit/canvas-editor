/**
 * @class Region
 * @param {HTMLCanvasElement} canvas — канвас
 * @arg searchMode — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo
 * */
function Region(canvas){

    this.canvas = canvas;
    this.start = function(){
        var that = this;
        canvas.addEventListener('click', function(event){

            that.createRegionByPoint(event.layerX, event.layerY);

        });
    };
    this.stop = function(){

    };
}

Region.prototype = Object.create(Tool);
Region.prototype.constructor = Region;

/**
 * Метод поиска фигуры по координате (Поиск осуществляется либо по цвету, либо по слоям)
 * @lends Region.prototype
 * @param {Number} x — Координата X
 * @param {Number} y — Координата Y
 * @return {Region} объект фигуры
 */
Region.prototype.createRegionByPoint = function(x, y){

    /**
     * @function Способ поиска области фигуры по координате в режиме поиска по цвету
     * К области фигуры относится та соседняя точка относительно найденной по координате, которая имеет тот же цвет
     * @arg Координаты точки
     * @return
     * */

    /**
     * @function Способ поиска области фигуры по координате в режиме поиска по слоям
     * К области фигуры относится та соседняя точка относительно найденной по координате, которая имеет тот же индекс
     * @arg Координаты точки
     * @return
     * */
    var ctx = this.canvas.getContext('2d');
    var canvas = this.canvas;
    var refer = getPx(x,y);
    var totalCountOfPx = canvas.height*canvas.width;
    var register = {};

    addOne(x,y);

    var find = whilePoint(x, y, []);

    find.forEach(function(arr){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(arr[0],arr[1],1,1);
    });

    /**
     * Реурсивный поиск всех похожих прилегающих точек, как непосредственно,
     * так и посредством аналогичных по цвету точек
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * @param {number[][]} total — коллекция точек
     * */
    function reqursively(x, y, total){

        var arr = getClosestCoords(x, y);         // все 8
        arr = getClosestPoints(arr);              // убрать выходящие за границы координаты //todo добавить условие такого случая
        arr = filterPassed(arr);                  // оставить все новые
        addAll(arr);                              // зарегистрировать новые
        arr = filterEquivalent(arr);              // оставить только подходящие новые

        for (var i = 0, len = arr.length; i < len; i+=1){
            // поиск совпадений по хешу быстрее чем по массиву
            total.push([arr[i][0], arr[i][1]]);
            reqursively(arr[i][0], arr[i][1], total);
        }

        return total;
    }
    /**
     * Последовательный поиск всех похожих прилегающих точек, как непосредственно,
     * так и посредством аналогичных по цвету точек
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * @param {number[][]} total — коллекция точек
     * */
    function whilePoint(x, y, total){

        var queue = [];
        var point;

        queue.push([x,y]);

        while (queue.length){
            if (queue.length > canvas.height*canvas.width){
                throw 'error'
            }
            point = queue.splice(0, 1)[0];
            total.push(point);

            var arr = getClosestCoords(point[0], point[1]);         // все 8
            arr = getClosestPoints(arr);              // убрать выходящие за границы координаты //todo добавить условие такого случая
            arr = filterPassed(arr);                  // оставить все новые
            addAll(arr);                              // зарегистрировать новые
            arr = filterEquivalent(arr);              // оставить только подходящие новые

            Array.prototype.push.apply(queue, arr)
        }

        return total;
    }
    /**
     * Координаты непосредственных соседних точек
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * @return {number[][]}
     * */
    function getClosestCoords(x, y){
        return [
            [x-1, y-1],
            [x, y-1],
            [x+1, y-1],
            [x-1, y],

            [x+1, y],
            [x-1, y+1],
            [x, y+1],
            [x+1, y+1]
        ]
    }
    /**
     * Если одна из точек имеет координаты выходящие за пределы периметра канваса, то удаляем ее из набора
     * @param {number[][]} arr — набор точек
     * @return {number[][]}
     * */
    function getClosestPoints(arr){
        var res = [];
        for (var i = 0, len = arr.length; i < len; i+=1){
            if ( arr[i][0] < 0
                || arr[i][0] > canvas.width
                || arr[i][1] < 0
                || arr[i][1] > canvas.height){
                console.log('Minus-Maximus Coor')
            } else {
                res.push(arr[i]);
            }
        }
        return res;
    }
    /**
     * Выбрать из набора точки схожие по цвету
     * @param {number[][]} arr — набор точек
     * @return {number[][]}
     * */
    function filterEquivalent(arr){
        var res = [];
        for (var i = 0, len = arr.length; i < len; i+=1){
            if ( arrsIsEquivalent(getPx(arr[i][0], arr[i][1]) , refer) ){
                res.push(arr[i]);
            }
        }
        return res;
    }
    /**
     * Выбрать из набора точки, которые еще не проходили проверку
     * @param {number[][]} arr — набор точек
     * @return {number[][]}
     * */
    function filterPassed(arr){
        var res = [];
        for (var i = 0, len = arr.length; i < len; i+=1){
            if ( !getRecord(arr[i][0], arr[i][1]) ){
                res.push(arr[i]);
            }
        }
        return res;
    }
    /**
     * Способ именования точки для хеша
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * */
    function setRecord(x, y){
        return register[x + ':' + y] = true;
    }
    /**
     * Способ получения точки из хеша
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * */
    function getRecord(x, y){
        return register[x + ':' + y];
    }
    /**
     * Сравнить данные двух точек
     * @return {boolean} — true, если цветовые параметры точек равны
     * */
    function arrsIsEquivalent(arr1, arr2){
        return (arr1[0] === arr2[0] && arr1[1] === arr2[1] && arr1[2] === arr2[2] && arr1[3] === arr2[3]);
    }
    /**
     * Добавить точку в регистр
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * */
    function addOne(x, y){
        if (getRecord(x, y))
            throw 'it always been';
        if (Object.keys(register).length >= totalCountOfPx)
            throw 'Maximum';

        if (!addOne.ctx){
            var canvas = document.createElement('canvas');
            addOne.ctx = canvas.getContext('2d');
            var canv = document.getElementsByTagName('canvas')[0];
            canvas.height = canv.height;
            canvas.width = canv.width;
            canvas.style.position = 'absolute';
            canvas.style.top = 0;
            document.body.appendChild(canvas);
            addOne.ctx.fillStyle="#FF0000";
        }

        //if (Object.keys(register).length%550 === 0){
        //    console.log(1)
        //}

        //addOne.ctx.fillRect(x, y,1,1);
        setRecord(x, y);
    }
    /**
     * Добавить точки в регистр
     * @param {number[][]} arr — набор точек
     * */
    function addAll(arr){
        for (var i = 0, len = arr.length; i < len; i+=1) {
            addOne(arr[i][0], arr[i][1])
        }
    }
    /**
     * Получить данные по точке
     * @param {number} x — координата X
     * @param {number} y — координата Y
     * @return {CanvasPixelArray}
     * */
    function getPx(x, y){
        //optimise getImageData;
        if (!getPx.data){
            var height = canvas.height;
            var width = canvas.width;

            /**{Uint8ClampedArray}*/
            var data = ctx.getImageData(0, 0, width, height).data;

            /**{Array}*/
            getPx.data = Array.prototype.slice.call(data, 0, data.length);
        }

        var index = (y - 1)*canvas.width*4 + x*4;
        return getPx.data.slice(index, index + 4);
        //return ctx.getImageData(x, y, 1, 1).data;
    }
};

/**
 * Метод стирающий регион с холста
 * @param {Region} region — регион
 * @param {HTMLCanvasElement} canvas — холст
 * */
Region.prototype.removeRegionFromCanvas = function(region, canvas){};

/**
 * Метод отрисовки региона на холсте
 * @param {Region} region — регион
 * @param {HTMLCanvasElement} canvas — холст
 * */
Region.prototype.renderRegionToCanvas = function(region, canvas){};

/**
 * @class Region Регион
 * @param {Number} coordinateX — Координата X определяет позицию опорной точки региона относительно холста
 * @param {Number} coordinateY — Координата Y определяет позицию опорной точки региона относительно холста
 * @param {Array} points Массив точек, относительно основной точки региона (Они должны полностью определять замкнутую фигуру)
 *
 * @arg {Boolean} isFocused — активный/не активный регион, подцвечен или нет
 * */

function RegionElement(coordinateX, coordinateY, points){
    /**
     * функция сканирования массива точек на предмет определения ими замкнутой фигуры региона
     * @lends Region.prototype
     *
     * Замкнутая фигура - замкнутый набор точек, та, которая не имеет независимых, свободных точек
     * */
}

/**
 * Метод перемещения региона на канвасе, меняет позицию опорной точки
 * @lends RegionElement.prototype
 *
 * @param {Number} y — смещение X
 * @param {Number} x — смещение Y
 * */
RegionElement.prototype.setCoordinates = function(x, y){};


/**
 * Метод создания подцветки для региона
 * @lends RegionElement.prototype
 *
 * @param Фигура или набор точек
 * @param Холст
 *
 * цвет выделения
 * другие параметры выделения/подцвечивания
 *
 * Метод удаления обводки с фигуры (самоудаление)
 *
 * 1/Алгоритм поиска всех точек находящихся на периметре фигуры
 * 2/Метод Окрашивание всех найденных точек в какой-либо цвет
 * 3/Метод получения всех точек периметра
 *
 * регистр точек
 * цвет
 *
 * @return объект Обводка
 * */

RegionElement.prototype.addStroke = function(){
    /**
     * Алгоритм поиска всех точек находящихся на периметре региона
     * @param Фигура[массив точек]
     * @return массив точек периметра
     *
     * Найти любую точку, не имеющую хотя бы с одной стороны соприкасающуюся точку
     * Найти соседнюю точку, также не имеющую соприкосающуюся
     * */
};

/**
 * Метод удаления подцветки
 * */
RegionElement.prototype.removeStroke = function(){};


/**
 * Метод перемещения
 * */