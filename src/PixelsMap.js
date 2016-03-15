!function(APP) {
    APP.namespace('APP');
    /**
     * Объект Карта отвечает за информацию по соотношению каждого пикселя из карты к группе слоев
     * накладываемых друг на друга в определенном порядке
     * @param {Object} options
     * @param {Object[]} options.map
     * */
    APP.PixelsMap = function (options){
        /**
         * Карта отображения координаты пикселя в порядок слоев расположенных на нем
         * @type {Object}
         * */
        this.map = {} || options.map;
    };
    /** @lends PixelsMap.prototype */
    APP.PixelsMap.prototype = {
        constructor: APP.PixelsMap,
        /**
         * Метод пополнения карты новыми записями
         * @param {number} x — Координата X
         * @param {number} y — Координата Y
         * @param {RegionObject} regionObject
         * */
        addRecord : function(x, y, regionObject){
            if (!this.map[x])
                this.map[x] = {};
            if (!this.map[x][y]){
                this.map[x][y] = []; // <- история индексов для пиксела
            }
            this.map[x][y].push(regionObject);
        },
        /**
         * Метод поиска записи по карте пикселей с определенной координатой
         * @param {number} x — Координата X
         * @param {number} y — Координата Y
         * @param {number} [offset=0] — Смещение по истории
         * */
        getRecord : function(x, y, offset){
            offset = offset || 0;
            if (this.map[x] && this.map[x][y] ){
                var history = this.map[x][y];
                var lastRecordIndex = history.length - 1 + offset;
                return history[lastRecordIndex];
            }
        },
        /**
         * Метод удаления записей из карты
         * @param {number} x — Координата X
         * @param {number} y — Координата Y
         * @param {RegionObject} regionObject
         * */
        deleteRecord : function(x, y, regionObject){
            if ( this.map[x] && this.map[x][y] ){
                var index = this.map[x][y].indexOf(regionObject);
                if (index !== -1){
                    var removedRecord = this.map[x][y].splice(index, 1)[0];
                }
            }
            return removedRecord;
        }
    };
}(APP);