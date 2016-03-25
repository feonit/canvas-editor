!function(APP){
    APP.namespace('APP.objects');

    /**
     * Класс определяет две контрольные точки
     * @class SimpleVectorAbstract
     * @memberof APP.objects
     * */
    APP.objects.SimpleVectorAbstract = function(attributes){
        APP.VectorLayerAbstract.apply(this, arguments);
        /** type {number} */
        this.x0 = attributes.x0;
        /** type {number} */
        this.y0 = attributes.y0;
        /** type {number} */
        this.x1 = attributes.x1;
        /** type {number} */
        this.y1 = attributes.y1;
    };

    APP.objects.SimpleVectorAbstract.prototype = Object.create(APP.VectorLayerAbstract.prototype);
    APP.objects.SimpleVectorAbstract.prototype.constructor = APP.objects.SimpleVectorAbstract;

}(APP);