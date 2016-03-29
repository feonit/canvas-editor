!function(APP){
    APP.namespace('APP.tools');
    var MathFn = APP.core.MathFn;
    var Point = APP.core.Point;
    var Curve = APP.core.Curve;
    var LayerObject = APP.objects.LayerObject;
    /**
     * Ластик, позволяет стирать область холста, относительно переданной координаты
     * @class
     * @memberof APP.tools
     * @arg {String} shape — форма ластика: круг/квадрат (Circle, Squire)
     * @arg {Number} shapeLength — параметры формы ластика: длинна стороны/диагонали
     * @arg {HTMLCanvasElement} canvas — холст, над которым происходит затирание
     * */
    APP.tools.EraserTool = function (appInstance, canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.points = null;
        this.size = 0;
    };

    APP.tools.EraserTool.prototype = {
        constructor: APP.tools.EraserTool,

        setOptions : function(options){
            options = options || {};
            options.size && (this.size = options.size);
        },

        eraserStart : function(x, y, width){
            if (width){
                this.size = width;
            }
            if (!this.points) {
                this.points = [];
                this.points.push(new Point(x, y));
                this._render();
            }
        },

        eraserContinue : function(x, y){
            if (this.points){
                this.points.push(new Point(x, y));
                this._render();
            }
        },

        eraserEnd : function(x, y){
            this.points.push(new Point(x, y));

            this._render();
            this.points = null;
            appInstance.mediator.publish(appInstance.UPDATE_CANVAS_EVENT);
        },

        _render : function(){
            var flow = MathFn.drawBezierCurve(new Curve(this.points));
            flow.forEach((function(coor){
                this.cleanAtPoint(coor[0], coor[1]);
            }).bind(this));
        },

        cleanAtPoint : function(){
            return this.cleanSquareAtPoint.apply(this, arguments);
            //return this.cleanCircleAtPoint.apply(this, arguments);
        },
        /**
         * Метод стирания области относительно полученной координаты
         * @method
         * @lends EraserTool.prototype
         *
         * @param {Number} x — координата X
         * @param {Number} y — координата Y
         * */
        cleanSquareAtPoint : function(x, y){
            /**
             * Функция проверки того, что точка принадлежит холсту и является корректной
             * */

            /**
             * Функия получения массива всех точек стираемой области, относительно полученной координаты
             * */

            var length = this.size;

            this.ctx.clearRect(x - length/2, y - length/2, length, length);
        },

        cleanCircleAtPoint :  function (x, y){

            var RADIUS = this.size;
            var coordinates = this._getCircleCoordinatesWithOffset(x, y, RADIUS);
            var len = coordinates.length - 1;

            while(len > 0){
                len--;
                var coordinate;
                coordinate = coordinates[len];
                this.ctx.clearRect(coordinate[0], coordinate[1], 1, 1);
            }
        },

        /**
         * Получить координаты всех точек принадлежащих окружности с заданными координатой и радиусом
         * */
        _getCircleCoordinatesWithOffset : function(x0, y0, radius){
            var coordinates = MathFn.getCircleCoordinates(radius);

            //todo
            coordinates = LayerObject.prototype.getRelationCoordinate(coordinates, x0, y0);
            return coordinates;
        }
    };
}(APP);