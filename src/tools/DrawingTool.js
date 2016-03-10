!function(CanvasEditor, Math, document, Object){

    CanvasEditor.namespace('CanvasEditor.Tool').DrawingTool = DrawingTool;

    var Point = CanvasEditor.Point;
    var Curve = CanvasEditor.Curve;
    var MathFn = CanvasEditor.MathFn;

    function DrawingTool(appInstance, canvas){

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
         * Публикуемое изображение
         * */
        this.lastLayout = null;

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
    }

    DrawingTool.prototype.setOptions = function(options){
        options = options || {};
        options.type && (this.type = options.type);
        options.size && (this.size = options.size);
        options.color && (this.color = options.color);
    };

    /**
     * Начало рисования
     * */
    DrawingTool.prototype.drawingStart = function(x, y){ if ( this._lastPhase !== this._END_PHASE ) return; this._lastPhase = this._START_PHASE;
        // начальная позиция
        this.currentPoint = this.startPoint = [x, y];

        // снимок
        this.snapshot = this.canvas.getContext("2d").getImageData(0, 0, this.canvas.width, this.canvas.height);

        if (this.type == this.CURVE_TYPE){
            this._bufferPoints = [new Point(x, y)];
        }

        this._bufferCanvas = this._createCopyOfCanvas(canvas);

        this.draw();
    };

    /**
     * Продолжение рисования
     * */
    DrawingTool.prototype.drawingContinue = function(x, y){ if ( this._lastPhase === this._END_PHASE ) return; this._lastPhase = this._CONTINUE_PHASE;
        this.currentPoint = [x, y];
        if (this.type == this.CURVE_TYPE){
            this._bufferPoints.push(new Point(x, y));
        }
        this.draw();
    };

    /**
     * Конец рисования
     * */
    DrawingTool.prototype.drawingEnd = function(x, y){ if ( this._lastPhase === this._END_PHASE ) return; this._lastPhase = this._END_PHASE;
        if (this.type == this.CURVE_TYPE){
            this._bufferPoints.push(new Point(x, y));
        }
        this.draw();
        this._publicNewLayout();

        this.startPoint = null;
        this.currentPoint = null;
        this.snapshot = null;
        this._bufferPoints = null;
        this.coordinatesLine = null;
    };

    DrawingTool.prototype.draw = function(){
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
        var coordinates = [];

        switch (this.type){
            case this.CURVE_TYPE:
                coordinates = CanvasEditor.MathFn.drawBezierCurve(new Curve(this._bufferPoints, Math.round(this.size/2))); break;

            case this.RECTANGLE_TYPE:
                coordinates = CanvasEditor.MathFn.rectangle(x0, y0, x1, y1); break;

            case this.ELLIPSE_TYPE:
                coordinates = CanvasEditor.MathFn.plotEllipseRect(x0, y0, x1, y1); break;

            case this.LINE_TYPE:
                coordinates = CanvasEditor.MathFn.bline(x0, y0, x1, y1);
                break;

            case this.ARROW_TYPE:
                if (Math.abs(x1-x0)<2 && Math.abs(x1-x0)<2) return;

                var ARROW_RADIAN = Math.PI/6;
                var ARROW_LENGTH = 0.3;

                coordinates = CanvasEditor.MathFn.bline(x0, y0, x1, y1);

                var halfX = Math.round(x1 - (x1-x0)*ARROW_LENGTH);
                var halfY = Math.round(y1 - (y1-y0)*ARROW_LENGTH);
                var coorLine1 = MathFn.turn(halfX, halfY, x1, y1, -ARROW_RADIAN);
                var line1 = CanvasEditor.MathFn.bline(x1, y1, coorLine1[0], coorLine1[1]);

                var coorLine2 = MathFn.turn(halfX, halfY, x1, y1, ARROW_RADIAN);
                var line2 = CanvasEditor.MathFn.bline(x1, y1, coorLine2[0], coorLine2[1]);

                coordinates = coordinates.concat(line1);
                coordinates = coordinates.concat(line2);

                break;
        }

        this.coordinatesLine = coordinates;

        if (coordinates.length){
            this.renderCircles(this.canvas, coordinates);
            this.renderCircles(this._bufferCanvas, coordinates);
            //this.drawPixelsAtCanvas(this.canvas, coordinates);
            //this.drawPixelsAtCanvas(this._bufferCanvas, coordinates);
        }
    };

    /**
     * Создает новое изображение нарисованной линии и сохраняет
     * */
    DrawingTool.prototype._publicNewLayout = function(){
        // todo почему канвы обычной не достаточно?
        var image = new Image();
        image.height = this._bufferCanvas.height;
        image.width = this._bufferCanvas.width;
        image.src = this._bufferCanvas.toDataURL('image/png');
        this.lastLayout = image;

        //todo
        if (this.coordinatesLine && this.coordinatesLine.length){
            this.appInstance.newEvent('CREATED_REGION', [
                this._bufferCanvas,
                this.coordinatesLine
            ]);
        }
    };

    /**
     * Создает копию канваса по размеру и параметрам контекста
     * @param {HTMLCanvasElement} canvas
     * */
    DrawingTool.prototype._createCopyOfCanvas = function (canvas){
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

    /**
     * Для определенного холста установить по всем координатам свой цвет
     * @param {HTMLCanvasElement} canvas
     * @param {number[][]} [coordinates] — список координат
     * @param {Uint8ClampedArray} [color] — цвет
     * todo вызывает блокировку потока, поэтому нужно оптимизировать
     * */
    DrawingTool.prototype.drawPixelsAtCanvas = function(canvas, coordinates, color){
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
    };

    /**
     * Метод рисует кривые используя способ вставки изображений
     * */
    DrawingTool.prototype.renderCircle = (function(){
        var _canvas1px = document.createElement('canvas');
        _canvas1px.height = 1;
        _canvas1px.width = 1;

        var _canvas1pxCtx = _canvas1px.getContext('2d');
        var _imageData = _canvas1pxCtx.createImageData(1,1);

        var savedColor = [255, 0, 0 , 255];
        _imageData.data[0] = savedColor[0];
        _imageData.data[1] = savedColor[1];
        _imageData.data[2] = savedColor[2];
        _imageData.data[3] = 255;

        _canvas1pxCtx.putImageData(_imageData, 0, 0);

        var _stored = {};

        return function (ctx, x, y, radius, color){
            var colorHasChanged = color[0] !== savedColor[0]
                || color[1] !== savedColor[1]
                || color[2] !== savedColor[2];

            // если цвет изменился, сохраняем его
            if (colorHasChanged){
                savedColor = color;
            }

            var canvasRadius = _stored[radius];

            // подготовить новую картинку если новый радиус или новый цвет
            if (!canvasRadius || colorHasChanged){

                if (colorHasChanged){
                    _imageData.data[0] = color[0];
                    _imageData.data[1] = color[1];
                    _imageData.data[2] = color[2];
                    _imageData.data[3] = 255;

                    _canvas1px.height = 1;
                    _canvas1px.width = 1;

                    _canvas1pxCtx.putImageData(_imageData, 0, 0);
                }

                var canvasR = document.createElement('canvas');
                var powRadius = radius*2;
                // так как циркуль в 1пиксель радиуса имеет 3 пикселя в диаметре по алгоритму
                // а когда радиус 0 то диаметр 1пиксель
                canvasR.height = powRadius + 1;
                canvasR.width = powRadius + 1;
                var coordinates = MathFn.getCircleCoordinates(radius);
                var len = coordinates.length;
                var canvasRCtx = canvasR.getContext('2d');

                var coorX, coorY;
                while(len > 0){
                    len--;
                    var coordinate;
                    coordinate = coordinates[len];
                    coorX = coordinate[0] + radius;
                    coorY = coordinate[1] + radius;
                    canvasRCtx.drawImage(_canvas1px, coorX, coorY);
                }

                _stored[radius] = canvasRadius = canvasR;
            }

            // поместить картинку
            ctx.drawImage(canvasRadius, x - radius, y - radius);
        }
    })();

    /**
     *
     * */
    DrawingTool.prototype.renderCircles = function(canvas, coordinates){
        var color = this.color;
        var ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        var radius = Math.floor(this.size/2);
        coordinates.forEach((function(coor){
            this.renderCircle(ctx, coor[0], coor[1], radius, color);
        }).bind(this));
    };

    return DrawingTool;
}(CanvasEditor, Math, document, Object);