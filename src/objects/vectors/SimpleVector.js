!function(APP){
    APP.namespace('APP.objects');

    /**
     * Класс определяет две контрольные точки
     * @class SimpleVector
     * @memberof APP.objects
     * */
    APP.objects.SimpleVector = function(attributes){
        APP.VectorLayer.apply(this, arguments);
        /** type {number} */
        this.x0 = attributes.x0;
        /** type {number} */
        this.y0 = attributes.y0;
        /** type {number} */
        this.x1 = attributes.x1;
        /** type {number} */
        this.y1 = attributes.y1;
    };

    APP.objects.SimpleVector.prototype = Object.create(APP.VectorLayer.prototype);
    APP.objects.SimpleVector.prototype.constructor = APP.objects.SimpleVector;

}(APP);