!function(APP){
    APP.namespace('APP.core');

    /**
     * @memberof APP.core
     * */
    APP.core.MathFn = {
        /**
         * Получить список координат для всех точек принадлежащих к окружности с заданным радиусом
         * Функция кеширует результат по радиусу
         * */
        getCircleCoordinates : function(radius){

            if (this.getCircleCoordinates[radius]){
                return this.getCircleCoordinates[radius]
            }

            if (!radius){
                return [[0,0]];
            }

            if (radius === 1){
                return [[0,0],[-1,0],[0,-1],[-1,-1]];
            }

            var x,
                y,
                y1 = -radius,
                y2 = +radius,
                coordinates = [];

            for (y = y1; y <= y2; y++){
                var absPart = Math.round(Math.sqrt(Math.pow(radius, 2) - Math.pow((y), 2)));
                // here may be -0
                var x1 = parseInt(-absPart, 10);
                var x2 = absPart;

                for (x = x1; x <= x2; x++){
                    coordinates.push([x, y]);
                }
            }

            this.getCircleCoordinates[radius] = coordinates;

            return coordinates;
        },

        /**
         * Переводит цвет в нужный формат
         * */
        hexToRgb : function (hex) {
            var bigint = parseInt(hex, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;

            return [r,g,b,255];
        },

        bline: function (x0, y0, x1, y1) {
            var px = [];
            function setPixel(x,y){px.push([x,y])}

            var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
            var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
            var err = (dx>dy ? dx : -dy)/2;

            while (true) {
                setPixel(x0,y0);

                if (x0 === x1 && y0 === y1) break;
                var e2 = err;
                if (e2 > -dx) {
                    err -= dy;
                    x0 += sx;
                }
                if (e2 < dy) {
                    err += dx;
                    y0 += sy;
                }
            }
            return px;
        },

        /**
         * Переводит цвет в нужный формат
         * */
        hexToRgba : function (hex) {
            var bigint = parseInt(hex, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;

            return  'rgba(' + r + ',' + g + ', ' + b + ',' + 255 + ')';
        },

        dataToRgb : function(data){
            return  'rgb(' + data[0]+','+data[1]+','+ data[2]+')';
        },

        randomHex : function(){
            return Math.floor(Math.random()*16777215).toString(16);
        },

        getRandomColorData : function(){
            return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255), 255];
        },

        // Генерирует координаты точек основываясь на информации о кривой
        drawBezierCurve : function (curve){
            var l = curve.x.length;

            var arr = [];

            if (l === 1){
                return [[curve.x[l-1], curve.y[l-1]]]
            }

            if (l === 2){
                arr[0] = [curve.x[l-1], curve.y[l-1]];
                arr[1] = [curve.x[l-2], curve.y[l-2]];
            }

            if (l > 2){
                arr[0] = [(curve.x[l-3] + curve.x[l-2]) * 0.5, (curve.y[l-3] + curve.y[l-2]) * 0.5];
                arr[1] = [curve.x[l-2], curve.y[l-2]];
                arr[2] = [(curve.x[l-2] + curve.x[l-1]) * 0.5, (curve.y[l-2] + curve.y[l-1]) * 0.5];
            }

            var flow = getBezierCurve(arr, 0.01);

            for (var i = 0, len = flow.length; i < len; i ++){
                flow[i][0] = Math.round(flow[i][0]);
                flow[i][1] = Math.round(flow[i][1]);
            }

            return flow;
        },
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // arr - массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1])
    // step - шаг при расчете кривой (0 < step < 1), по умолчанию 0.01
    function getBezierCurve(arr, step) {
        if (step == undefined) {
            step = 0.01;
        }
        var res = [];
        for (var t = 0; t < 1 + step; t += step) {
            if (t > 1) {
                t = 1;
            }
            var ind = res.length;
            res[ind] = [0, 0];
            for (var i = 0; i < arr.length; i++) {
                var b = getBezierBasis(i, arr.length - 1, t);
                res[ind][0] += arr[i][0] * b;
                res[ind][1] += arr[i][1] * b;
            }
        }

        return res;
    }

    // i - номер вершины, n - количество вершин, t - положение кривой (от 0 до 1)
    function getBezierBasis(i, n, t) {
        // Факториал
        function f(n) {
            return (n <= 1) ? 1 : n * f(n - 1);
        }
        // считаем i-й элемент полинома Берштейна
        return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
    }
}(APP);
