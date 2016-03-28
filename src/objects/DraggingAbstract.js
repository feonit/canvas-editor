!function(APP){
    APP.namespace('APP');
    var MathFn = APP.core.MathFn;

    /**
     * Содержит историю перемещений
     * @class DraggingAbstract
     * @memberof APP
     * @param {Object} options
     * @param {number[][]} options.coordinates
     * @param {number[]} options.color
     * @param {number[][]} options.coordinatesLine — исходные координаты 1-но пиксельной фигуры
     * */
    APP.DraggingAbstract = function (options){
        APP.objects.LayerObject.apply(this, arguments);
        options = options || {};

        /**
         * Смещение слоя на главноем холсте после транспортировки.
         * @arg {number[][]}
         * */
        this.offsetHistory = new APP.OffsetHistory(options.offsetHistory);
    };

    APP.DraggingAbstract.prototype = Object.create(APP.objects.LayerObject.prototype);
    APP.DraggingAbstract.prototype.constructor = APP.DraggingAbstract;

    /**
     * Сгенерировать новый набор оригинальных координат с применением актуального отступа
     * @param {number[][]} coordinates
     * @param {number[]} offset
     * */
    APP.DraggingAbstract.prototype.getRelationCoordinate = function(coordinates, offset){
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

}(APP);
