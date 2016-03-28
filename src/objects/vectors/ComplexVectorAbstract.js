!function(APP){
    APP.namespace('APP.objects');

    /**
     * Класс определяет массив контрольных точек
     * @class ComplexVectorAbstract
     * @memberof APP.objects
     * */
    APP.objects.ComplexVectorAbstract = function(attributes){
        APP.objects.VectorLayerAbstract.apply(this, arguments);

        /** @type {number[][]} */
        this.points = attributes.points;
    };

    APP.objects.ComplexVectorAbstract.prototype = Object.create(APP.objects.VectorLayerAbstract.prototype);
    APP.objects.ComplexVectorAbstract.prototype.constructor = APP.objects.ComplexVectorAbstract;

}(APP);