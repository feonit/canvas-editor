!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').RegionObject = (function(){
        /**
         * @class RegionObject
         * @memberof CanvasEditor
         * @param {HTMLCanvasElement} layout
         * @param {number[][]} coordinates
         * @param {number[]} color
         * @param {number[][]} borderCoordinates
         * @param {number[][]} coordinateLine — исходные координаты 1-но пиксельной фигуры
         * */
        var RegionObject = (function(){

            /**
             * Номер последнего слоя
             * @type {number}
             * */
            var incId = 0;

            return function RegionObject(options){

                options = options || {};

                /** @lends RegionObject */
                this.id = incId++;

                /**
                 * Картинка с регионом размером с сам холст
                 * @type {HTMLCanvasElement}
                 * */
                var layoutCanvas = document.createElement('canvas');
                layoutCanvas.height = options.height;
                layoutCanvas.width = options.width;

                // вместо генерации можно было бы получить сразу используя вторую канву
                 function drawPixelsAtCanvas(canvas, coordinates, etalonPointImageData){
                    var canvasCtx = canvas.getContext('2d');
                    var imageData = canvasCtx.createImageData(1,1);
                    var data = imageData.data;
                    data[0] = etalonPointImageData[0];
                    data[1] = etalonPointImageData[1];
                    data[2] = etalonPointImageData[2];
                    data[3] = etalonPointImageData[3];
                    var canvas1px = document.createElement('canvas');
                    canvas1px.height = 1;
                    canvas1px.width = 1;
                    var canvas1pxCtx = canvas1px.getContext('2d');
                    canvas1pxCtx.putImageData(imageData, 0, 0);
                    var coordinate, i, len;
                    for (i = 0, len = coordinates.length; i < len; i++){
                        coordinate = coordinates[i];
                        canvasCtx.drawImage(canvas1px, coordinate[0], coordinate[1]);
                    }
                };

                if (options.imageData){
                    this.imageData = options.imageData;
                    layoutCanvas.getContext('2d').putImageData(options.imageData, 0, 0);
                } else {
                    drawPixelsAtCanvas(layoutCanvas, options.coordinates, options.color);
                }

                Object.defineProperty(this, '_layout', {value: layoutCanvas});


                /**
                 * Регион имеет один цвет
                 * @type {ImageData.data}
                 * */
                this.etalonPointImageData = options.color;

                /**
                 * Массив координат пикселей объекта на холсте
                 * @type {number[][]}
                 * */
                this.coordinates = options.coordinates;

                /**
                 *
                 * */
                this.borderCoordinates = options.borderCoordinates;

                this.coordinateLine = options.coordinateLine;

                /**
                 * Смещение слоя на главноем холсте после транспортировки
                 * Первая запись гласит о нулевом смещении
                 * @arg {number[][]}
                 * */
                this.recordsOffset = [[0,0]];

                this.offsetX = 0;

                this.offsetY = 0;

                this.isActived = false;
            };
        }());

        RegionObject.prototype.getLayout = function(){
            return this._layout;
        };

        RegionObject.prototype.getEtalonPointImageData = function(){
            return this.etalonPointImageData;
        };

        RegionObject.prototype.setLayout = function(layout){
            this._layout = layout;
        };

        RegionObject.prototype.saveRecordOffset = function(){
            this.recordsOffset.push([this.offsetX, this.offsetY])
        };

        RegionObject.prototype.getOriginalCoordinates = function(){
            return this.coordinates;
        };

        /**
         * Сгенерировать новый набор оригинальных координат с применением актуального отступа
         * */
        RegionObject.prototype.getRelationCoordinate = function(coordinates, offsetX, offsetY){
            var relation = [];
            var offsetX = typeof offsetX === 'undefined' ? this.offsetX : offsetX;
            var offsetY = typeof offsetY === 'undefined' ? this.offsetY : offsetY;
            var coordinates = coordinates || this.coordinates;

            for (var i = 0, len = coordinates.length; i < len; i+=1 ) {
                relation[i] = [];
                relation[i][0] = coordinates[i][0];
                relation[i][1] = coordinates[i][1];
            }

            this._addOffsetToCoordinate(relation, offsetX, offsetY);

            return relation;
        };

        RegionObject.prototype.getPrevRecord = function(){
            var record = this.recordsOffset[this.recordsOffset.length - 2];
            return record;
        };

        /**
         * Добавить отступ набору координат
         * @param {number[][]} coordinates
         * @param {number} offsetX
         * @param {number} offsetY
         * */
        RegionObject.prototype._addOffsetToCoordinate = function(coordinates, offsetX, offsetY){
            for (var i = 0, len = coordinates.length; i < len; i+=1 ){
                coordinates[i][0] += offsetX;
                coordinates[i][1] += offsetY;
            }
            return coordinates;
        };

        /**
         * Метод создания подцветки
         * */
        RegionObject.prototype.activate = function(){
            if (this.isActived) return;
            this.isActived = true;
            if (this.borderCoordinates && this.borderCoordinates.length){
                var layout = this.getLayout();

                if (this.__storedBorderImageData){
                    layout.getContext('2d').putImageData(this.__storedBorderImageData, 0, 0);
                    return;
                }

                var coordinates = this.borderCoordinates;
                Object.defineProperty(this, '__originalLayoutImageData', {value: layout.getContext('2d').getImageData(0, 0, layout.width, layout.height)});

                // отрисовать бордер
                var imageData = layout.getContext('2d').createImageData(1, 1);
                for (var i=0, len=coordinates.length; i < len; i++){
                    var colorData = CanvasEditor.MathFn.getRandomColorData();

                    imageData.data[0] = colorData[0];
                    imageData.data[1] = colorData[1];
                    imageData.data[2] = colorData[2];
                    imageData.data[3] = colorData[3];

                    layout.getContext('2d').putImageData(imageData, coordinates[i][0], coordinates[i][1]);
                }

                // сохраненная версия обводки для объекта
                Object.defineProperty(this, '__storedBorderImageData', {value: layout.getContext('2d').getImageData(0, 0, layout.width, layout.height)});

            }
        };

        /**
         * Метод удаления подцветки, путем восстановление ранее сохраненной копии оригинального лейаута
         * */
        RegionObject.prototype.deactivate = function(){
            if (!this.isActived) return;
            this.isActived = false;
            var layout = this.getLayout();
            layout.getContext('2d').clearRect(0, 0, layout.width, layout.height);
            layout.getContext('2d').putImageData(this.__originalLayoutImageData, 0, 0);
        };

        RegionObject.prototype.drawAtCanvas = function(canvas){
            // кладем буфер региона на холст добавляя смещение
            canvas.getContext('2d').drawImage(this.getLayout(), this.offsetX, this.offsetY);
        };

        return RegionObject;
    }());

}(CanvasEditor);