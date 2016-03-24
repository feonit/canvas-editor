!function(APP){
    APP.namespace('APP');
    var MathFn = APP.MathFn;

    /**
     * @class LayerObject
     * @memberof APP
     * @param {Object} options
     * @param {number[][]} options.coordinates
     * @param {number[]} options.color
     * @param {number[][]} options.coordinatesLine — исходные координаты 1-но пиксельной фигуры
     * */
    APP.LayerObject = function (options){
        APP.LayerAbstract.apply(this, arguments);
        options = options || {};

        /**
         * Регион имеет один цвет
         * @type {number[]}
         * */
        this.color = options.color;

        Object.defineProperties(this, {
            /**
             * Координаты точек контура
             * @type {number[][]|null}
             * */
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

    APP.LayerObject.prototype = Object.create(APP.LayerAbstract.prototype);
    APP.LayerObject.prototype.constructor = APP.DraggingAbstract;


    /**
     * Метод создания подцветки
     * */
    APP.LayerObject.prototype.activate = function(){
        if (this.isActived) return;
        this.isActived = true;
        this.layerView.drawBorder();
    };

    /**
     * Метод удаления подцветки, путем восстановление ранее сохраненной копии оригинального лейаута
     * */
    APP.LayerObject.prototype.deactivate = function(){
        if (!this.isActived) return;
        this.isActived = false;
        this.layerView.eraserBorder();
    };
}(APP);
