var RegionObject = (function(){

    /**
     * @class RegionObject
     * @param options
     * */
    function RegionObject(options){
        options = options || {};

        /**
         * Регион имеет один цвет
         * @type {ImageData.data}
         * */
        this.etalonPointImageData = options.etalonPointImageData;

        /**
         * Смещение слоя на главноем холсте после транспортировки
         * Первая запись гласит о нулевом смещении
         * @arg {number[][]}
         * */
        this.recordsOffset = [[0,0]];

        this.offsetX = 0;

        this.offsetY = 0;

        this.canvas = options.canvas;

        this._width = options.width;

        this._height = options.height;

        /**
         * Массив координат пикселей объекта на холсте
         * @type {number[][]}
         * */
        this._originalCoordinates = options.coordinates;

        /**
         * Картинка с регионом размером с сам холст
         * @type {HTMLCanvasElement}
         * */
        this._layout = (function(){
            var layoutCanvas = document.createElement('canvas');
            layoutCanvas.height = this._height;
            layoutCanvas.width = this._width;
            this._drawLayout(layoutCanvas);
            return layoutCanvas;
        }.call(this));

        /** */
        this.borderCoordinates = options.borderCoordinates;

    }

    RegionObject.prototype.getLayout = function(){
        return this._layout;
    };

    RegionObject.prototype.setLayout = function(layout){
        this._layout = layout;
    };

    RegionObject.prototype.saveRecordOffset = function(){
        this.recordsOffset.push([this.offsetX, this.offsetY])
    };

    RegionObject.prototype.getOriginalCoordinates = function(){
        return this._originalCoordinates;
    };

    /**
     * Для определенного холста установить по всем координатам свой цвет
     * @param {HTMLCanvasElement} canvas
     * @param {number[][]} [coordinates] — список координат
     * @param {ImageData} [etalonPointImageData] — данные по цвету
     * todo вызывает блокировку потока, поэтому нужно оптимизировать
     * */
    RegionObject.prototype.drawPixelsAtCanvas = function(canvas, coordinates, etalonPointImageData){
        // проверено drawImage в этом случае работает раза в 4 быстрее чем putImageData, создаю картинку размером в 1 пиксел
        // нужен оптимизирующий алгаритм для работы drawImage, чтобы избежать попиксельную обработку, основанный на том факте, что цвета соседних пикселей одинаковы
        var ctx = canvas.getContext('2d');
        this.__canvas1px = this.__canvas1px || document.createElement('canvas');
        this.__imageData = this.__imageData || ctx.createImageData(1,1);
        var data = this.__imageData.data;
        var etalon = etalonPointImageData || this.etalonPointImageData;
        data[0] = etalon[0];
        data[1] = etalon[1];
        data[2] = etalon[2];
        data[3] = 255;// etalon[3]; !!!!!!!!!

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

    RegionObject.prototype._drawLayout = function(layout){
        var relationCoordinate = this.getRelationCoordinate();
        this.drawPixelsAtCanvas(layout, relationCoordinate, this.etalonPointImageData);
    };

    /**
     * Сгенерировать новый набор оригинальных координат с применением актуального отступа
     * */
    RegionObject.prototype.getRelationCoordinate = function(coordinates, offsetX, offsetY){
        var relation = [];
        var offsetX = offsetX || this.offsetX;
        var offsetY = offsetY || this.offsetY;
        var coordinates = coordinates || this._originalCoordinates;

        for (var i = 0, len = coordinates.length; i < len; i+=1 ) {
            relation[i] = [];
            relation[i][0] = coordinates[i][0];
            relation[i][1] = coordinates[i][1];
        }

        this._addOffsetToCoordinate(relation, offsetX, offsetY);

        return relation;
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
        //var ctx = this.canvas.getContext('2d');
        //this.canvasBeforeActivate = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        //this._originalCoordinates.forEach((function(arr){
        //    ctx.fillStyle = 'yellow';
        //    ctx.fillRect( arr[0], arr[1]-1 , 1, 1 ); // -1 смещение
        //}).bind(this));


        // обновить переносимую картинку
        //var canvas = document.createElement('canvas');
        //canvas.width = this.canvas.width;
        //canvas.height = this.canvas.height;
        //var ctx = canvas.getContext('2d');
        //ctx.drawImage(this._layout, 0, 0);
        //this.borderCoordinates.forEach((function(arr){
        //    ctx.fillStyle = 'yellow';
        //    ctx.fillRect( arr[0], arr[1]-1 , 1, 1 ); // -1 смещение
        //}).bind(this));
        //var image = new Image();
        //image.height = canvas.height;
        //image.width = canvas.width;
        //this._layout = image;
    };

    /**
     * Метод удаления подцветки
     * */
    RegionObject.prototype.deactivate = function(){};

    return RegionObject;
}());