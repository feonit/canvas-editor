!function(APP){
    APP.namespace('APP.objects');

    /**
     * Прямая
     * @class
     * @memberof APP.objects
     * */
    APP.objects.LineSimpleVectorAbstract = function (attributes){
        APP.objects.SimpleVectorAbstract.apply(this, arguments);
        this.coordinatesLine = APP.core.MathFn.bline(this.x0, this.y0, this.x1, this.y1);
        this.calcCoordinates();
    };

    APP.objects.LineSimpleVectorAbstract.prototype = Object.create(APP.objects.SimpleVectorAbstract.prototype);
    APP.objects.LineSimpleVectorAbstract.prototype.constructor = APP.objects.LineSimpleVectorAbstract;

}(APP);