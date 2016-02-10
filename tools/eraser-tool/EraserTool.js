/**
 * Ластик, позволяет стирать область холста, относительно переданной координаты
 * @class EraserTool Ластик
 *
 * @arg {String} shape — форма ластика: круг/квадрат (Circle, Squire)
 * @arg {Number} shapeLength — параметры формы ластика: длинна стороны/диагонали
 * @arg {HTMLCanvasElement} canvas — холст, над которым происходит затирание
 * */
function EraserTool(canvas){

    var points = null;
    var point;
    var colorValue = 0;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    var that = this;

    function onMousedown(event){
        if (!points) {
            points = [];
            point = new Point(event.layerX, event.layerY, colorValue);
            points.push(point);
            render();
        }
    }

    function onMousemove(event){
        if (points){
            point = new Point(event.layerX, event.layerY, colorValue);
            points.push(point);
            render();
        }
    }

    function onMouseup(event){
        point = new Point(event.layerX, event.layerY, colorValue);
        points.push(point);

        render();
        points = null;

    }

    function Point(x, y, color){
        this.x = x;
        this.y = y;
    }

    function render(){
        var curve = new Curve(points);

        drawEraser(curve);
    }

    function Curve(points){
        this.x = [];
        this.y = [];

        var i = points.length, n;

        // для первой точки или прямой (соответственно для 1 или 2х точек)
        if ( i <= 2 ) {
            for ( n = i; n > 0; n -=1 ) {
                this.x.push(points[n - 1].x);
                this.y.push(points[n - 1].y);
            }
            // последующие идут как кривые, берём последние 3 точки
        } else {
            for ( n = 0; n < 3 ; n += 1 ) {
                this.x.push(points[i - n - 1].x);
                this.y.push(points[i - n - 1].y);
            }
        }
    }

    function drawEraser(curve){
        var l = curve.x.length;

        var arr = [];

        if (l === 1){
            that.cleanAtPoint(curve.x[l-1], curve.y[l-1]);
            return;
        }

        if (l > 1){
            arr[0] = [(curve.x[l-3] + curve.x[l-2]) * 0.5, (curve.y[l-3] + curve.y[l-2]) * 0.5];
            arr[1] = [curve.x[l-2], curve.y[l-2]];
        }

        if (l > 2){
            arr[2] = [(curve.x[l-2] + curve.x[l-1]) * 0.5, (curve.y[l-2] + curve.y[l-1]) * 0.5];
        }

        var flow = getBezierCurve(arr, 0.01);

        flow.forEach(function(coor){
            that.cleanAtPoint(coor[0], coor[1]);
        });
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

    this.start = function(){
        canvas.addEventListener('mousedown', onMousedown, false);
        canvas.addEventListener('mousemove', onMousemove, false);
        canvas.addEventListener('mouseup', onMouseup, false);
    };
    this.stop = function(){
        canvas.removeEventListener('mousedown', onMousedown);
        canvas.removeEventListener('mousemove', onMousemove);
        canvas.removeEventListener('mouseup', onMouseup);
    };
}

EraserTool.prototype = Object.create(Tool);
EraserTool.prototype.constructor = EraserTool;

/**
 * Метод стирания области относительно полученной координаты
 * @method
 * @lends EraserTool.prototype
 *
 * @param {Number} x — координата X
 * @param {Number} y — координата Y
 * */
EraserTool.prototype.cleanAtPoint = function(x, y){
    /**
     * Функция проверки того, что точка принадлежит холсту и является корректной
     * */

    /**
     * Функия получения массива всех точек стираемой области, относительно полученной координаты
     * */

    var length = 20;

    this.ctx.clearRect(x - length/2, y - length/2, length, length);

};


EraserTool.prototype.clearAll = function(){
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
};