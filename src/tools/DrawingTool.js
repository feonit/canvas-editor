!function(APP, Math, document, Object){
    APP.namespace('APP.tools');
    var Point = APP.Point;
    var CurveComplexVector = APP.objects.CurveComplexVector;
    var RectangleComplexVector = APP.objects.RectangleComplexVector;
    var EllipseComplexVector = APP.objects.EllipseComplexVector;
    var LineComplexVector = APP.objects.LineComplexVector;
    var ArrowComplexVector = APP.objects.ArrowComplexVector;

    APP.tools.DrawingTool = function (appInstance, canvas){

        this.appInstance = appInstance;

        /** @type {HTMLCanvasElement}*/
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        /** @type {number[][]|null} координата */
        this.startPoint = null;

        /** @type {number[][]|null} координата */
        this.currentPoint = null;

        // снимок до начала
        this.snapshot = null;

        /**
         * Координаты нарисованной фигуры
         * */
        this.coordinatesLine = [];

        /**
         * types
         * */
        this.CURVE_TYPE = 'CURVE_TYPE';
        this.RECTANGLE_TYPE = 'RECTANGLE_TYPE';
        this.ELLIPSE_TYPE = 'ELLIPSE_TYPE';
        this.ARROW_TYPE = 'ARROW_TYPE';
        this.LINE_TYPE = 'LINE_TYPE';
        this.BROKEN_TYPE = 'BROKEN_TYPE';

        this.type = this.CURVE_TYPE;
        this.size = 10;
        this.color = [0,0,0,255];

        // буфер для работы с кривой
        this._bufferCanvas = null;
        this._bufferPoints = null;

        // отслеживаение строгой последовательности вызовов
        this._START_PHASE = 'START_PHASE';
        this._CONTINUE_PHASE = 'CONTINUE_PHASE';
        this._END_PHASE = 'END_PHASE';
        this._lastPhase = this._END_PHASE;
    };

    APP.tools.DrawingTool.prototype = {
        constructor: APP.tools.DrawingTool,

        setOptions : function(options){
            options = options || {};
            options.type && (this.type = options.type);
            options.size && (this.size = options.size);
            options.color && (this.color = options.color);
        },

        /**
         * Начало рисования
         * */
        drawingStart : function(x, y){ if (
            this._lastPhase !== this._END_PHASE )
            return;
            this._lastPhase = this._START_PHASE;

            // начальная позиция
            this.currentPoint = this.startPoint = [x, y];

            // снимок
            this.snapshot = this.canvas.getContext("2d").getImageData(0, 0, this.canvas.width, this.canvas.height);

            if (this.type == this.CURVE_TYPE){
                this._bufferPoints = [new Point(x, y)];
            }

            /**
             * Создает копию канваса по размеру и параметрам контекста
             * @param {HTMLCanvasElement} canvas
             * */
            var _createCopyOfCanvas = function (canvas){
                var context = canvas.getContext('2d');
                var copy = document.createElement('canvas');
                copy.height = canvas.height;
                copy.width = canvas.width;
                var copyCtx =  copy.getContext('2d');
                var propsToCopy = Object.getOwnPropertyNames(CanvasRenderingContext2D.prototype).filter(function(prop){
                    return typeof context[prop] === 'string'
                });

                propsToCopy.forEach(function(name){
                    copyCtx[name] = context[name];
                });

                return copy;
            };

            this._bufferCanvas = _createCopyOfCanvas(this.canvas);

            this.draw();
        },

        /**
         * Продолжение рисования
         * */
        drawingContinue : function(x, y){
            if ( this._lastPhase === this._END_PHASE )
                return;
            this._lastPhase = this._CONTINUE_PHASE;

            this.currentPoint = [x, y];
            if (this.type == this.CURVE_TYPE){
                this._bufferPoints.push(new Point(x, y));
            }
            this.draw();
        },

        /**
         * Конец рисования
         * */
        drawingEnd : function(x, y){ if (
            this._lastPhase === this._END_PHASE )
            return;
            this._lastPhase = this._END_PHASE;


            if (this.type == this.CURVE_TYPE){
                this._bufferPoints.push(new Point(x, y));
            }

            this.draw();

            // часть 2 оптимизация отрисовки кривой линии без создания объектов
            if (this.type == this.CURVE_TYPE){
                var object = new CurveComplexVector({
                    points: this._bufferPoints,
                    size: Math.round(this.size),
                    color: this.color,
                    width: this.canvas.width,
                    height: this.canvas.height
                });
                APP.views.VectorLayerView.renderCircles(this.canvas, object.coordinatesLine, object.color, Math.floor(object.size/2));

                this.object = object;
            }

            this._publicNewLayout();

            this.startPoint = null;
            this.currentPoint = null;
            this.snapshot = null;
            this._bufferPoints = null;
            this.object = null;
        },

        draw : function(){
            var ctx = this.canvas.getContext("2d");
            // очищение
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // старье
            ctx.putImageData(this.snapshot, 0, 0);

            // новье
            if (this.type == this.CURVE_TYPE){
                ctx.drawImage(this._bufferCanvas, 0, 0);
            } else {
                var ctxBuf = this._bufferCanvas.getContext('2d');
                ctxBuf.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }

            var x0 = this.startPoint[0];
            var y0 = this.startPoint[1];
            var x1 = this.currentPoint[0];
            var y1 = this.currentPoint[1];

            switch (this.type){
                case this.CURVE_TYPE:
                    // часть 1 оптимизация отрисовки кривой линии без создания объектов
                    // это хак, для ускорения отрисовки
                    this.object = null;
                    var coordinates = APP.MathFn.drawBezierCurve(new APP.Curve(this._bufferPoints));
                    APP.views.VectorLayerView.renderCircles(this._bufferCanvas, coordinates, this.color, Math.floor(this.size/2));
                    break;

                case this.RECTANGLE_TYPE:
                    this.object = new RectangleComplexVector({
                        x0:x0,
                        y0:y0,
                        x1:x1,
                        y1:y1,
                        size: Math.round(this.size),
                        color: this.color,
                        width: this.canvas.width,
                        height: this.canvas.height
                    });
                    break;

                case this.ELLIPSE_TYPE:
                    this.object = new EllipseComplexVector({
                        x0:x0,
                        y0:y0,
                        x1:x1,
                        y1:y1,
                        size: Math.round(this.size),
                        color: this.color,
                        width: this.canvas.width,
                        height: this.canvas.height
                    });
                    break;

                case this.LINE_TYPE:
                    this.object = new LineComplexVector({
                        x0:x0,
                        y0:y0,
                        x1:x1,
                        y1:y1,
                        size: Math.round(this.size),
                        color: this.color,
                        width: this.canvas.width,
                        height: this.canvas.height
                    });
                    break;

                case this.ARROW_TYPE:
                    if ( Math.abs(x1-x0) < 2 && Math.abs(x1-x0) < 2 )
                        return;

                    this.object = new ArrowComplexVector({
                        x0:x0,
                        y0:y0,
                        x1:x1,
                        y1:y1,
                        size: Math.round(this.size),
                        color: this.color,
                        width: this.canvas.width,
                        height: this.canvas.height
                    });
                    break;
            }

            if (this.object){
                APP.views.VectorLayerView.renderCircles(this.canvas, this.object.coordinatesLine, this.object.color, Math.floor(this.object.size/2));
                APP.views.VectorLayerView.renderCircles(this._bufferCanvas, this.object.coordinatesLine, this.object.color, Math.floor(this.object.size/2));
            }
        },

        /**
         * Создает новое изображение нарисованной линии и сохраняет
         * */
        _publicNewLayout : function(){
            if (this.object){
                this.appInstance.newEvent('CREATED_REGION', [
                    this.object
                ]);
            }
        }
    };
}(APP, Math, document, Object);