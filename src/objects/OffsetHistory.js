!function(APP){
    APP.namespace('APP');

    /**
     * История перемещений
     * @class OffsetHistory
     * @memberof APP
     * */
    APP.OffsetHistory = function(options){
        options = options || {};
        this.currentOffset = options.currentOffset || [0,0];
        /**
         * Смещение слоя на главноем холсте после транспортировки.
         * @arg {number[][]}
         * */
        this.recordsOffset = options.recordsOffset || [[0,0]];
    };

    APP.OffsetHistory.prototype.saveRecordOffset = function(){
        this.recordsOffset.push([this.currentOffset[0], this.currentOffset[1]])
    };

    APP.OffsetHistory.prototype.getPrevRecord = function(){
        return this.recordsOffset[this.recordsOffset.length - 2];
    };

}(APP);