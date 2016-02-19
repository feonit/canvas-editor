!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor.Tool').EraserTool = EraserTool;

    var MathFn = CanvasEditor.MathFn;

    /**
     * Ластик, позволяет стирать область холста, относительно переданной координаты
     * @class EraserTool Ластик
     *
     * @arg {String} shape — форма ластика: круг/квадрат (Circle, Squire)
     * @arg {Number} shapeLength — параметры формы ластика: длинна стороны/диагонали
     * @arg {HTMLCanvasElement} canvas — холст, над которым происходит затирание
     * */
    function EraserTool(appInstance, canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.points = null;
        this.widthLine = 0;
    }

    EraserTool.prototype.eraserStart = function(x, y, width){
        if (width){
            this.widthLine = width;
        }
        if (!this.points) {
            this.points = [];
            this.points.push(new CanvasEditor.Point(x, y));
            this._render();
        }
    };

    EraserTool.prototype.eraserContinue = function(x, y){
        if (this.points){
            this.points.push(new CanvasEditor.Point(x, y));
            this._render();
        }
    };

    EraserTool.prototype.eraserEnd = function(x, y){
        this.points.push(new CanvasEditor.Point(x, y));

        this._render();
        this.points = null;
    };

    EraserTool.prototype._render = function(){
        var flow = MathFn.drawBezierCurve(new CanvasEditor.Curve(this.points));
        flow.forEach((function(coor){
            this.cleanAtPoint(coor[0], coor[1]);
        }).bind(this));
    };

    EraserTool.prototype.cleanAtPoint = function(){
        return EraserTool.prototype.cleanSquareAtPoint.apply(this, arguments);
        //return EraserTool.prototype.cleanCircleAtPoint.apply(this, arguments);
    };
    /**
     * Метод стирания области относительно полученной координаты
     * @method
     * @lends EraserTool.prototype
     *
     * @param {Number} x — координата X
     * @param {Number} y — координата Y
     * */
    EraserTool.prototype.cleanSquareAtPoint = function(x, y){
        /**
         * Функция проверки того, что точка принадлежит холсту и является корректной
         * */

        /**
         * Функия получения массива всех точек стираемой области, относительно полученной координаты
         * */

        var length = this.widthLine;

        this.ctx.clearRect(x - length/2, y - length/2, length, length);
    };

    EraserTool.prototype.cleanCircleAtPoint =  function (x, y){

        var RADIUS = this.widthLine;
        var coordinates = this._getCircleCoordinatesWithOffset(x, y, RADIUS);
        var len = coordinates.length - 1;

        while(len > 0){
            len--;
            var coordinate;
            coordinate = coordinates[len];
            this.ctx.clearRect(coordinate[0], coordinate[1], 1, 1);
        }
    };

    /**
     * Получить координаты всех точек принадлежащих окружности с заданными координатой и радиусом
     * */
    EraserTool.prototype._getCircleCoordinatesWithOffset = function(x0, y0, radius){
        var coordinates = MathFn.getCircleCoordinates(radius);
        coordinates = CanvasEditor.RegionObject.prototype.getRelationCoordinate(coordinates, x0, y0);
        return coordinates;
    };

    return EraserTool;
}(CanvasEditor);