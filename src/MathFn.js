!function(CanvasEditor){

    /** @memberof CanvasEditor */
    var MathFn = CanvasEditor.namespace('CanvasEditor.MathFn');

    /**
     * Получить список координат для всех точек принадлежащих к окружности с заданным радиусом
     * Функция кеширует результат по радиусу
     * */
    MathFn.getCircleCoordinates = function(radius){

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
    };

    MathFn.getLineCoordinates = function(x0, y0, alpha, length, width){

    };

    MathFn.getLineCoordinates = function(x0, y0, x1, y1, width){
        var x = (x1 - x0);
        var y = (y1 - y0);
        var length = Math.round( Math.sqrt( y*y + x*x ) );
        var catet0 = Math.abs(x);
        catet0/length
    };

    /**
     * Генерирует координаты точек основываясь на информации о кривой
     * */
    MathFn.drawBezierCurve = function(curve){
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
    };

    /**
     * Переводит цвет в нужный формат
     * */
    MathFn.hexToRgb = function (hex) {
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return [r,g,b,255];
    };

    /**
     * Переводит цвет в нужный формат
     * */
    MathFn.hexToRgba = function (hex) {
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return  'rgba(' + r + ',' + g + ', ' + b + ',' + 255 + ')';
    };

    MathFn.dataToRgb = function(data){
        return  'rgb(' + data[0]+','+data[1]+','+ data[2]+')';
    };

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

    MathFn.bline = function (x0, y0, x1, y1) {
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
    };

    MathFn.blineWidthHack = function(x0, y0, x1, y1){
        var px = [];
        function setPixel(x,y){px.push([x,y])}

        var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
        var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
        var err = (dx>dy ? dx : -dy)/2;

        while (true) {
            setPixel(x0,y0);

            //if (dx>dy){
            //    for (var i=0; i <= width; i++){
            //        var incDec = Math.round(i/2);
            //        var arrow = i%2;
            //        arrow ? setPixel(x0,y0-incDec) : setPixel(x0,y0+incDec)
            //
            //    }
            //} else {
            //    for (var i=0; i <= width; i++){
            //        var incDec = Math.round(i/2);
            //        var arrow = i%2;
            //        arrow ? setPixel(x0-incDec,y0) : setPixel(x0+incDec,y0)
            //    }
            //}

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
    };


    MathFn.plotEllipseRect = function(x0, y0, x1, y1){
        var px = [];
        function setPixel(x,y){px.push([x,y])}

        var a = Math.abs(x1-x0), b = Math.abs(y1-y0), b1 = b&1; /* values of diameter */
        var dx = 4*(1-a)*b*b, dy = 4*(b1+1)*a*a; /* error increment */
        var err = dx+dy+b1*a*a, e2; /* error of 1.step */

        if (x0 > x1) { x0 = x1; x1 += a; } /* if called with swapped points */
        if (y0 > y1) y0 = y1; /* .. exchange them */
        y0 += (b+1)/2; y1 = y0-b1;   /* starting pixel */
        a *= 8*a; b1 = 8*b*b;

        // возникают половинки
        y0 = Math.round(y0);

        do {
            setPixel(x1, y0); /*   I. Quadrant */
            setPixel(x0, y0); /*  II. Quadrant */
            setPixel(x0, y1); /* III. Quadrant */
            setPixel(x1, y1); /*  IV. Quadrant */
            e2 = 2*err;
            if (e2 <= dy) { y0++; y1--; err += dy += a; }  /* y step */
            if (e2 >= dx || 2*err > dy) { x0++; x1--; err += dx += b1; } /* x step */
        } while (x0 <= x1);

        while (y0-y1 < b) {  /* too early stop of flat ellipses a=1 */
            setPixel(x0-1, y0); /* -> finish tip of ellipse */
            setPixel(x1+1, y0++);
            setPixel(x0-1, y1);
            setPixel(x1+1, y1--);
        }

        return px;
    };

    MathFn.plotLineWidth = function(x0, y0, x1, y1, wd){
        var px = [];
        function setPixelColor(x,y){px.push([x,y])}

        var dx = Math.abs(x1-x0), sx = x0 < x1 ? 1 : -1;
        var dy = Math.abs(y1-y0), sy = y0 < y1 ? 1 : -1;
        var err = dx-dy, e2, x2, y2;                          /* error value e_xy */
        var ed = dx+dy == 0 ? 1 : Math.sqrt(dx*dx+dy*dy);

        for (wd = (wd+1)/2; ; ) {                                   /* pixel loop */
            setPixelColor(x0,y0, Math.max(0,255*(Math.abs(err-dx+dy)/ed-wd+1)));
            e2 = err; x2 = x0;
            if (2*e2 >= -dx) {                                           /* x step */
                for (e2 += dy, y2 = y0; e2 < ed*wd && (y1 != y2 || dx > dy); e2 += dx)
                    setPixelColor(x0, y2 += sy, Math.max(0,255*(Math.abs(e2)/ed-wd+1)));
                if (x0 == x1) break;
                e2 = err; err -= dy; x0 += sx;
            }
            if (2*e2 <= dy) {                                            /* y step */
                for (e2 = dx-e2; e2 < ed*wd && (x1 != x2 || dx < dy); e2 += dy)
                    setPixelColor(x2 += sx, y0, Math.max(0,255*(Math.abs(e2)/ed-wd+1)));
                if (y0 == y1) break;
                err += dx; y0 += sy;
            }
        }

        return px;
    };

    MathFn.rectangle = function(x0, y0, x1, y1){
        var px = [[x0, y0], [x0, y1], [x1, y0], [x1, y1]];
        var dx,dy,x,y,len,i;

        dx = x1>x0? 1 : -1;
        dy = y1>y0? 1 : -1;

        for (x = x0, i = 0, len = Math.abs(x1-x0) - 1; i < len; i++){
            x = x + dx;
            px.push([x, y0]);
            px.push([x, y1]);
        }

        for (y = y0, i = 0, len = Math.abs(y1-y0) - 1; i < len; i++){
            y = y + dy;
            px.push([x0, y]);
            px.push([x1, y]);
        }

        return px;
    };

    MathFn.arrow = function(x0, y0, x1, y1){
        var px = this.bline();

        this.bline( x1, y1);
    };


    /**
     * Повернуть точку относительно другой на заданный радиан
     * */
    MathFn.turn = function(x0, y0, relx, rely, rad){
        rad = rad || Math.PI/2;
        relx = relx || 0;
        rely = rely || 0;
        x0 = x0 - relx;
        y0 = y0 - rely;
        var x = x0 * parseFloat(Math.cos(rad).toFixed(10)) - y0 * parseFloat(Math.sin(rad).toFixed(10));
        var y = x0 * parseFloat(Math.sin(rad).toFixed(10)) + y0 * parseFloat(Math.cos(rad).toFixed(10));
        x = Math.round(x) + relx;
        y = Math.round(y) + rely;
        return [x, y];
    };

    MathFn.turnAll = function(coordinates, relx, rely, rad){
        for (var i=0, len=coordinates.length; i<len; i++){
            coordinates[i] = this.turn(coordinates[i][0], coordinates[i][1], relx, rely, rad);
        }
    };

    //function getRandomInt(min, max) {
    //    return Math.floor(Math.random() * (max - min + 1)) + min;
    //}

    MathFn.randomHex = function(){
        return Math.floor(Math.random()*16777215).toString(16);
    };

    //colorDrawing = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255), 255];


}(CanvasEditor);
