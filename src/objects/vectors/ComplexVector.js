!function(APP){
    APP.namespace('APP.objects');

    /**
     * Класс определяет массив контрольных точек
     * */
    APP.objects.ComplexVector = function(attributes){
        APP.VectorLayer.apply(this, arguments);

        /** @type {number[][]} */
        this.points = attributes.points;
    };

    APP.objects.ComplexVector.prototype = Object.create(APP.VectorLayer.prototype);
    APP.objects.ComplexVector.prototype.constructor = APP.objects.ComplexVector;

}(APP);