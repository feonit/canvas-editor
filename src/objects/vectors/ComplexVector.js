!function(APP){
    APP.namespace('APP.objects');

    /**
     * Класс определяет массив контрольных точек
     * */
    APP.objects.ComplexVector = function(attributes){
        APP.VectorRegion.apply(this, arguments);

        /** @type {number[][]} */
        this.points = attributes.points;
    };

    APP.objects.ComplexVector.prototype = Object.create(APP.VectorRegion.prototype);
    APP.objects.ComplexVector.prototype.constructor = APP.objects.ComplexVector;

}(APP);