!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').RegionObject = RegionObject;

    /**
     * @class RegionObject
     * @memberof CanvasEditor
     * @param {HTMLCanvasElement} layout
     * @param {} color
     * @param {number[][]} coordinates
     * @param {number[][]} borderCoordinates
     * @param {number[][]} coordinateLine — исходные координаты 1-но пиксельной фигуры
     * */
    function RegionObject(layout, color, coordinates, borderCoordinates, coordinateLine){
        /**
         * Картинка с регионом размером с сам холст
         * @type {HTMLCanvasElement}
         * */
        this._layout = layout;

        /**
         * Регион имеет один цвет
         * @type {ImageData.data}
         * */
        this.etalonPointImageData = color;

        /**
         * Массив координат пикселей объекта на холсте
         * @type {number[][]}
         * */
        this._originalCoordinates = coordinates;

        /**
         *
         * */
        this.borderCoordinates = borderCoordinates;

        this.coordinateLine = coordinateLine;

        /**
         * Смещение слоя на главноем холсте после транспортировки
         * Первая запись гласит о нулевом смещении
         * @arg {number[][]}
         * */
        this.recordsOffset = [[0,0]];

        this.offsetX = 0;

        this.offsetY = 0;
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
    RegionObject.prototype.activate = function(canvasS){
        //var ctx = canvasS.getContext('2d');

         //обновить переносимую картинку
        //var canvas = document.createElement('canvas');
        //canvas.width = canvasS.width;
        //canvas.height = canvasS.height;
        //var ctx = canvas.getContext('2d');
        //ctx.drawImage(this._layout, 0, 0);

        //var ctx = this.getLayout().getContext('2d');
        //this.__canvasBeforeActivate = ctx.getImageData(0, 0, canvasS.width, canvasS.height);
        //
        //this.borderCoordinates.forEach((function(arr){
        //    ctx.fillStyle = 'yellow';
        //    ctx.fillRect( arr[0], arr[1] , 1, 1 ); // -1 смещение
        //}).bind(this));

        //var image = new Image();
        //image.height = canvas.height;
        //image.width = canvas.width;
        //this._layout = image;
    };

    /**
     * Метод удаления подцветки
     * */
    RegionObject.prototype.deactivate = function(){
        //if (this.__canvasBeforeActivate){
            //var layout = this.getLayout();
            //var ctx = layout.getContext('2d');
            //ctx.putImageData(this.__canvasBeforeActivate, 0, 0);
            //this.__canvasBeforeActivate = null;
        //}
    };

    return RegionObject;
}(CanvasEditor);