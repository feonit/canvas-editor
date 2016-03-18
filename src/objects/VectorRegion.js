!function(APP){
    APP.namespace('APP');
    var RegionObject = APP.RegionObject;
    var MathFn = APP.MathFn;

    APP.VectorRegion = function (attributes){
        RegionObject.apply(this, arguments);
        this.size = attributes.size;

        Object.defineProperty(this, 'coordinatesLine', {
            value: null,
            enumerable: false,
            writable: true
        });
    };

    APP.VectorRegion.prototype = Object.create(RegionObject.prototype);
    APP.VectorRegion.prototype.constructor = APP.VectorRegion;

    APP.VectorRegion.prototype.getCoordinatesLine = function(){
        alert('must be implemented')
    };

    APP.VectorRegion.prototype.getCoordinates = function(){
        var coordinatesLine = this.getCoordinatesLine();
        if (!coordinatesLine.length){
            throw 'нет сырых точек';
        }

        if (!this.coordinates){
            var beginWithX = this.coordinatesLine[0][0];
            var beginWithY = this.coordinatesLine[0][1];
            var searchedData = RegionObject._searchPixels(beginWithX, beginWithY, this.getLayout());
            this.coordinates = searchedData[0];
            this.borderCoordinates = searchedData[1];
        }

        return this.coordinates;
    };

    APP.VectorRegion.prototype.getLayout = function(){
        if (!this._layout){
            var layoutCanvas = document.createElement('canvas');
            layoutCanvas.height = this.height;
            layoutCanvas.width = this.width;

            this.renderCircles(layoutCanvas, this.getCoordinatesLine(), this.color);
            this._layout = layoutCanvas;
        }

        return this._layout;
    };
    /**
     * Функция отрисовывает окружности по заданным координатам с заданным цветом
     * @public
     * */
    APP.VectorRegion.prototype.renderCircles = function(canvas){
         var coordinates = this.getCoordinatesLine();
         var color = this.color;
        var ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        var radius = Math.floor(this.size/2);
        coordinates.forEach((function(coor){
            renderCircle(ctx, coor[0], coor[1], radius, color);
        }).bind(this));
    };

    /**
     * Функция отрисовывает окружность по заданной координате с заданным цветом
     * @private
     * */
    var renderCircle = (function(){
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

}(APP);