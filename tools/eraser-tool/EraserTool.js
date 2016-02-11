var EraserTool = (function(global){

    var MathFn = global.MathFn;

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

        function mousedown(event){
            console.log(event.layerX, event.layerY)
            console.log(that.ctx.getImageData(event.layerX, event.layerY, 1,1).data)
            if (!points) {
                points = [];
                point = new Point(event.layerX, event.layerY, colorValue);
                points.push(point);
                render();
            }
        }

        function mousemove(event){
            if (points){
                point = new Point(event.layerX, event.layerY, colorValue);
                points.push(point);
                render();
            }
        }

        function mouseup(event){
            point = new Point(event.layerX, event.layerY, colorValue);
            points.push(point);

            render();
            points = null;

        }

        function render(){
            var curve = new Curve(points);

            drawEraser(curve);
        }


        function drawEraser(curve){
            var flow = MathFn.drawBezierCurve(curve);
            flow.forEach(function(coor){
                that.cleanAtPoint(coor[0], coor[1]);
            });
        }

        this.start = function(){
            canvas.addEventListener('mousedown', mousedown, false);
            canvas.addEventListener('mousemove', mousemove, false);
            canvas.addEventListener('mouseup', mouseup, false);
        };
        this.stop = function(){
            canvas.removeEventListener('mousedown', mousedown);
            canvas.removeEventListener('mousemove', mousemove);
            canvas.removeEventListener('mouseup', mouseup);
        };
    }

    EraserTool.prototype = Object.create(Tool);
    EraserTool.prototype.constructor = EraserTool;

    EraserTool.prototype.cleanAtPoint = function(){
        //return EraserTool.prototype.cleanSquareAtPoint.apply(this, arguments);
        return EraserTool.prototype.cleanCircleAtPoint.apply(this, arguments);
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

        var length = 20;

        this.ctx.clearRect(x - length/2, y - length/2, length, length);
    };

    EraserTool.prototype.cleanCircleAtPoint =  function (x, y, radius){

        var RADIUS = 5;
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
        coordinates = RegionObject.prototype.getRelationCoordinate(coordinates, x0, y0);
        return coordinates;
    };

    EraserTool.prototype.clearAll = function(){
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    };

    return EraserTool;
}(window));