!function(global, document, Object){

    global.DrawingTool = DrawingTool;

    var Point = global.Point;
    var Curve = global.Curve;
    var Math = global.Math;
    var MathFn = global.MathFn;

    function DrawingTool(canvas){

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        /**
         * Публикуемое изображение
         * */
        this.lastLayout = null;

        /**
         * Публикуемая координата изображения
         * */
        this.lastLayoutExamplePoint = [];

        this.colorDrawing = [100, 15, 1, 255];
        this._bufferCanvas = null;
        this._bufferCanvasCtx = null;
        this._bufferPoints = null;
        this.START_PHASE = 'START_PHASE';
        this.CONTINUE_PHASE = 'CONTINUE_PHASE';
        this.END_PHASE = 'END_PHASE';
        this._lastPhase = this.END_PHASE;
    }

    /**
     * Начало рисования
     * */
    DrawingTool.prototype.drawingStart = function(x, y){
        if ( this._lastPhase !== this.END_PHASE ) return;

        this._lastPhase = this.START_PHASE;

        this._bufferPoints = [];

        //ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        this.colorDrawing = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255), 255];

        var point = new Point(x, y);
        this._bufferPoints.push(point);

        this.lastLayoutExamplePoint[0] = x;
        this.lastLayoutExamplePoint[1] = y;

        this.ctx.strokeStyle = point.color;

        this._bufferCanvas = this._createCopyOfCanvas(canvas);
        this._bufferCanvasCtx = this._bufferCanvas.getContext('2d');
        this._render(new Curve(this._bufferPoints), this.ctx);
        this._render(new Curve(this._bufferPoints), this._bufferCanvasCtx);
    };

    /**
     * Продолжение рисования
     * */
    DrawingTool.prototype.drawingContinue = function(x, y){
        // if not begin
        if ( this._lastPhase === this.END_PHASE ) return;
        this._lastPhase = this.CONTINUE_PHASE;

        var point = new Point(x, y);
        this._bufferPoints.push(point);
        this._render(new Curve(this._bufferPoints), this.ctx);
        this._render(new Curve(this._bufferPoints), this._bufferCanvasCtx);
    };

    /**
     * Конец рисования
     * */
    DrawingTool.prototype.drawingEnd = function(x, y){
        // if always have been
        if ( this._lastPhase === this.END_PHASE ) return;
        this._lastPhase = this.END_PHASE;

        var point = new Point(x, y);
        this._bufferPoints.push(point);
        this._render(new Curve(this._bufferPoints), ctx);
        this._render(new Curve(this._bufferPoints), this._bufferCanvasCtx);
        this._bufferPoints = null;
        this._publicNewLayout();
    };

    /**
     * Сбособ отрисовки кривой линии
     * @param {Curve} curve
     * @param {CanvasRenderingContext2D} ctx
     * */
    DrawingTool.prototype._render = function (curve, ctx){

        //1 способ
        var flow = MathFn.drawBezierCurve(curve);
        var that = this;

        flow.forEach(function(coor){
            that.renderLine(coor[0], coor[1], 10, ctx, curve.color, curve.raduis);
        });

        //2 способ хуже
        //that.drawCurve(curve, ctx);

    };

    /**
     * Создает новое изображение нарисованной линии и сохраняет
     * */
    DrawingTool.prototype._publicNewLayout = function(){
        var image = new Image();
        image.height = this._bufferCanvas.height;
        image.width = this._bufferCanvas.width;
        image.src = this._bufferCanvas.toDataURL('image/png');
        this.lastLayout = image;

        APP.newEvent('CREATED_REGION', [this.lastLayoutExamplePoint[0], this.lastLayoutExamplePoint[1], this.canvas]);
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
        var propsToCopy = Object.getOwnPropertyNames(CanvasRenderingContext2D.prototype).filter(function(prop){ return typeof ctx[prop] === 'string'});

        propsToCopy.forEach(function(name){
            copyCtx[name] = context[name];
        });

        return copy;
    };

    /**
     * Метод рисует кривые используя нативные для этого средства
     * @param {object} touches
     * @param {CanvasRenderingContext2D} ctx
     * @deprecated Старый метод, из за него вокруг линий добавляются тени
     * */
    DrawingTool.prototype.drawCurve = function (touches, ctx){
        if (!touches || !touches.x || typeof(touches.x[0])!=="number") {
            return false;
        }
        ctx.beginPath();
        ctx.moveTo(touches.x[0], touches.y[0]);

        if (touches.x.length < 2) {
            ctx.lineTo(touches.x[0] + 0.51, touches.y[0]);
        }
        else if (touches.x.length < 3) {
            ctx.lineTo(touches.x[1], touches.y[1]);
        }
        else {
            ctx.moveTo((touches.x[0] + touches.x[1]) * 0.5, (touches.y[0] + touches.y[1]) * 0.5);
            var i = 1;
            var abs1 = Math.abs(touches.x[i - 1] - touches.x[i]) + Math.abs(touches.y[i - 1] - touches.y[i])
                + Math.abs(touches.x[i] - touches.x[i + 1]) + Math.abs(touches.y[i] - touches.y[i + 1]);
            var abs2 = Math.abs(touches.x[i - 1] - touches.x[i + 1]) + Math.abs(touches.y[i - 1] - touches.y[i + 1]);
            if (abs1 > 10 && abs2 > abs1 * 0.8) {
                ctx.quadraticCurveTo(touches.x[i], touches.y[i], (touches.x[i] + touches.x[i + 1]) * 0.5, (touches.y[i] + touches.y[i + 1]) * 0.5);
            } else {
                ctx.lineTo((touches.x[i] + touches.x[i+1]) * 0.5, (touches.y[i] + touches.y[i+1]) * 0.5);
            }
        }
        ctx.stroke();
        return ctx.closePath();
    };

    /**
     * Метод рисует кривые используя способ вставки изображений
     * */
    DrawingTool.prototype.renderLine = (function(){
        var _canvas1px = document.createElement('canvas');
        var _canvas1pxCtx = _canvas1px.getContext('2d');
        var _imageData = _canvas1pxCtx.createImageData(1,1);

        var etalon = [255, 0, 0 , 255];
        _imageData.data[0] = etalon[0];
        _imageData.data[1] = etalon[1];
        _imageData.data[2] = etalon[2];
        _imageData.data[3] = 255;

        _canvas1px.height = 1;
        _canvas1px.width = 1;

        _canvas1pxCtx.putImageData(_imageData, 0, 0);

        return function _fn(x, y, radius, ctx){

            var colorHasChanged = this.colorDrawing[0] !== etalon[0]
                || this.colorDrawing[1] !== etalon[1]
                || this.colorDrawing[2] !== etalon[2];

            // если цвет изменился, сохраняем его
            if (colorHasChanged){
                etalon = this.colorDrawing;
            }

            ctx = this.canvas.getContext('2d');
            var canvasRadius = _fn[radius];

            // подготовить новую картинку если новый радиус или новый цвет
            if (!canvasRadius || colorHasChanged){

                if (colorHasChanged){
                    _imageData.data[0] = this.colorDrawing[0];
                    _imageData.data[1] = this.colorDrawing[1];
                    _imageData.data[2] = this.colorDrawing[2];
                    _imageData.data[3] = 255;

                    _canvas1px.height = 1;
                    _canvas1px.width = 1;

                    _canvas1pxCtx.putImageData(_imageData, 0, 0);
                }

                var canvasR = document.createElement('canvas');
                var powRadius = Math.pow(radius, 2);
                var coordinates = MathFn.getCircleCoordinates(radius);
                var len = coordinates.length - 1;
                var canvasRCtx = canvasR.getContext('2d');
                canvasR.height = powRadius;
                canvasR.width = powRadius;

                while(len > 0){
                    len--;
                    var coordinate;
                    coordinate = coordinates[len];
                    canvasRCtx.drawImage(_canvas1px, coordinate[0] + radius, coordinate[1] + radius);
                }

                _fn[radius] = canvasRadius = canvasR;
            }

            // поместить картинку
            ctx.drawImage(canvasRadius, x - radius, y - radius);
        }
    })();

    return DrawingTool;
}(window, document, Object);