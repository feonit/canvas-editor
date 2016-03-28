!function(APP){
    APP.namespace('APP');
    var MathFn = APP.core.MathFn;

    /** @namespace APP.objects */
    APP.namespace('APP.objects');

    /**
     * Объект слоя
     * @class LayerObject
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
    APP.objects.LayerObject.prototype.constructor = APP.DraggingAbstract;


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
