!function(APP){
    APP.namespace('APP');
    var MathFn = APP.MathFn;
    /**
     * Номер последнего слоя
     * @type {number}
     * */
    var incId = 0;

    /**
     * @class LayerObject
     * @memberof APP
     * @param {Object} options
     * @param {number[][]} options.coordinates
     * @param {number[]} options.color
     * @param {number[][]} options.coordinatesLine — исходные координаты 1-но пиксельной фигуры
     * */
    APP.LayerAbstract = function (options){

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

    APP.LayerAbstract.prototype = {
        constructor: APP.LayerAbstract
    };
}(APP);
