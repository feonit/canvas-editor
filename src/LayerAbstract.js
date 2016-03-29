!function(APP){
    APP.namespace('APP.objects');
    /**
     * Номер последнего слоя
     * @type {number}
     * */
    var incId = 0;

    /**
     * Базовый класс слоев
     * @class
     * @memberof APP.objects
     * @param {Object} options
     * @param {number[][]} options.coordinates
     * @param {number[]} options.color
     * @param {number[][]} options.coordinatesLine — исходные координаты 1-но пиксельной фигуры
     * */
    APP.objects.LayerAbstract = function (options){

        options = options || {};

        if (options.id){
            incId = incId > options.id ? incId : (options.id + 1);
        }

        /**
         * Уникальный идентификатор объекта
         * @type {number}
         * */
        this.id = options.id || incId++;
        this.height = options.height;
        this.width = options.width;
    };

    APP.objects.LayerAbstract.prototype = {
        constructor: APP.objects.LayerAbstract
    };
}(APP);
