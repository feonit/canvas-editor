!function(APP){
    APP.namespace('APP.objects');

    /**
     * Объект слоя
     * @class
     * @memberof APP.objects
     * @param {Object} options
     * @param {number[][]} options.coordinates
     * @param {number[]} options.color
     * @param {number[][]} options.coordinatesLine — исходные координаты 1-но пиксельной фигуры
     * */
    APP.objects.LayerObject = function (options){
        APP.objects.LayerAbstract.apply(this, arguments);
        options = options || {};

        /**
         * Регион имеет один цвет
         * @type {number[]}
         * */
        this.color = options.color;

        /**
         * Смещение слоя на главноем холсте после транспортировки.
         * @arg {number[][]}
         * */
        this.offsetHistory = new APP.core.OffsetHistory(options.offsetHistory);

        Object.defineProperties(this, {
            ///**
            // * Координаты точек контура
            // * @type {number[][]|null}
            // * */
            'coordinates': {
                value: options.coordinates || null,
                enumerable: false,
                writable: true
            },

            'borderCoordinates': {
                value: options.borderCoordinates || null,
                enumerable: false,
                writable: true
            },

            //todo тут этого быть не должно
            'isActived':{
                value: false,
                enumerable: false,
                writable: true
            }
        });
    };

    APP.objects.LayerObject.prototype = Object.create(APP.objects.LayerAbstract.prototype);
    APP.objects.LayerObject.prototype.constructor = APP.objects.LayerObject;

    /**
     * Сгенерировать новый набор оригинальных координат с применением актуального отступа
     * @param {number[][]} coordinates
     * @param {number[]} offset
     * */
    APP.objects.LayerObject.prototype.getRelationCoordinate = function(coordinates, offset){
        var relation = [];

        coordinates = coordinates || this.coordinates;

        for (var i = 0, len = coordinates.length; i < len; i+=1 ) {
            relation[i] = [];
            relation[i][0] = coordinates[i][0];
            relation[i][1] = coordinates[i][1];
        }

        offset = offset || this.offsetHistory.currentOffset;

        _addOffsetToCoordinate(relation, offset);

        function _addOffsetToCoordinate(coordinates, offset){
            for (var i = 0, len = coordinates.length; i < len; i+=1 ){
                coordinates[i][0] += offset[0];
                coordinates[i][1] += offset[1];
            }
            return coordinates;
        }

        return relation;
    }

    /**
     * Метод создания подцветки
     * */
    APP.objects.LayerObject.prototype.activate = function(){
        if (this.isActived) return;
        this.isActived = true;
        this.layerView.drawBorder();
    };

    /**
     * Метод удаления подцветки, путем восстановление ранее сохраненной копии оригинального лейаута
     * */
    APP.objects.LayerObject.prototype.deactivate = function(){
        if (!this.isActived) return;
        this.isActived = false;
        this.layerView.eraserBorder();
    };
}(APP);


!function(APP){
    APP.namespace('APP.core');

    /**
     * История перемещений
     * @class
     * @memberof APP.core
     * */
    APP.core.OffsetHistory = function(options){
        options = options || {};
        this.currentOffset = options.currentOffset || [0,0];
        /**
         * Смещение слоя на главноем холсте после транспортировки.
         * @arg {number[][]}
         * */
        this.recordsOffset = options.recordsOffset || [[0,0]];
    };

    APP.core.OffsetHistory.prototype.saveRecordOffset = function(){
        this.recordsOffset.push([this.currentOffset[0], this.currentOffset[1]])
    };

    APP.core.OffsetHistory.prototype.getPrevRecord = function(){
        return this.recordsOffset[this.recordsOffset.length - 2];
    };

}(APP);