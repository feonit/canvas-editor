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

        this._isActived = false;
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
    RegionObject.prototype.activate = function(){
        if (this._isActived) return;
        this._isActived = true;
        if (this.borderCoordinates.length){
            var coordinates = this.getRelationCoordinate(this.borderCoordinates);
            var layout = this.getLayout();
            this.__originalLayoutImageData = layout.getContext('2d').getImageData(0, 0, layout.width, layout.height);
            var imageData = layout.getContext('2d').createImageData(1, 1);



            for (var i=0, len=coordinates.length; i < len; i++){

                var colorData = CanvasEditor.MathFn.getRandomColorData();

                imageData.data[0] = colorData[0];
                imageData.data[1] = colorData[1];
                imageData.data[2] = colorData[2];
                imageData.data[3] = colorData[3];

                layout.getContext('2d').putImageData(imageData, coordinates[i][0], coordinates[i][1]);
            }
        }
    };

    /**
     * Метод удаления подцветки
     * */
    RegionObject.prototype.deactivate = function(){
        if (!this._isActived) return;
        this._isActived = false;
        var layout = this.getLayout();
        layout.getContext('2d').clearRect(0, 0, layout.width, layout.height);
        layout.getContext('2d').putImageData(this.__originalLayoutImageData, 0, 0);
    };

    return RegionObject;
}(CanvasEditor);