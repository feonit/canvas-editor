!function(APP, Math, document, Object){
    APP.namespace('APP.tools');
    var Point = APP.Point;
    var CurveVector = APP.objects.CurveVector;
    var RectangleVector = APP.objects.RectangleVector;
    var EllipseVector = APP.objects.EllipseVector;
    var LineVector = APP.objects.LineVector;
    var ArrowVector = APP.objects.ArrowVector;

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

            this._bufferCanvas = this._createCopyOfCanvas(canvas);

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
                var object = new CurveVector({
                    points: this._bufferPoints,
                    size: Math.round(this.size),
                    color: this.color,
                    width: this.canvas.width,
                    height: this.canvas.height
                });
                object.renderCircles(this.canvas);
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
                    APP.VectorRegion.prototype.renderCircles.call({
                        getCoordinatesLine: function(){
                            return coordinates;
                        },
                        size: this.size,
                        color: this.color
                    }, this._bufferCanvas);
                    break;

                case this.RECTANGLE_TYPE:
                    this.object = new RectangleVector({
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
                    this.object = new EllipseVector({
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
                    this.object = new LineVector({
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

                    this.object = new ArrowVector({
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
                this.object.renderCircles(this.canvas);
                this.object.renderCircles(this._bufferCanvas);
            }

            //this.drawPixelsAtCanvas(this.canvas, object.getCoordinates());
            //this.drawPixelsAtCanvas(this._bufferCanvas, object.getCoordinates());
        },

        /**
         * Создает новое изображение нарисованной линии и сохраняет
         * */
        _publicNewLayout : function(){

            //todo
            if (this.object){
                this.appInstance.newEvent('CREATED_REGION', [
                    this.object
                ]);
            }
        },

        /**
         * Создает копию канваса по размеру и параметрам контекста
         * @param {HTMLCanvasElement} canvas
         * */
        _createCopyOfCanvas : function (canvas){
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
        },

        /**
         * Для определенного холста установить по всем координатам свой цвет
         * @param {HTMLCanvasElement} canvas
         * @param {number[][]} [coordinates] — список координат
         * @param {Uint8ClampedArray} [color] — цвет
         * todo вызывает блокировку потока, поэтому нужно оптимизировать
         * */
        drawPixelsAtCanvas : function(canvas, coordinates, color){
            // проверено drawImage в этом случае работает раза в 4 быстрее чем putImageData, создаю картинку размером в 1 пиксел
            // нужен оптимизирующий алгаритм для работы drawImage, чтобы избежать попиксельную обработку, основанный на том факте, что цвета соседних пикселей одинаковы
            var ctx = canvas.getContext('2d');
            this.__canvas1px = this.__canvas1px || document.createElement('canvas');
            this.__imageData = this.__imageData || ctx.createImageData(1,1);
            var data = this.__imageData.data;
            var etalon = color || this.color;
            data[0] = etalon[0];
            data[1] = etalon[1];
            data[2] = etalon[2];
            data[3] = etalon[3];

            this.__canvas1px.height = 1;
            this.__canvas1px.width = 1;

            var canvas1pxCtx = this.__canvas1px.getContext('2d');
            canvas1pxCtx.putImageData(this.__imageData, 0, 0);

            var coordinate;

            for (var i = 0, len = coordinates.length; i < len; i++){
                coordinate = coordinates[i];
                ctx.drawImage(this.__canvas1px, coordinate[0], coordinate[1]);
            }
        }
    };
}(APP, Math, document, Object);