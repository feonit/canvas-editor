!function(APP){
    APP.namespace('APP.objects');

    /**
     * Класс определяет по массиву контрольных точек
     * координаты кривых безье
     * @class
     * @memberof APP.objects
     * */
    APP.objects.CurveComplexVectorAbstract = function (attributes){
        APP.objects.ComplexVectorAbstract.apply(this, arguments);

        var coordinates = [];
        var points = this.points;
        var size = Math.round(this.size/2);
        points.forEach(function(point, index){
            var part = points.slice(0, index + 1);
            var calc = APP.core.MathFn.drawBezierCurve(new APP.core.Curve(part, size));
            coordinates = coordinates.concat(calc);
        });

        this.coordinatesLine = coordinates;

        this.calcCoordinates();
    };

    APP.objects.CurveComplexVectorAbstract.prototype = Object.create(APP.objects.ComplexVectorAbstract.prototype);
    APP.objects.CurveComplexVectorAbstract.prototype.constructor = APP.objects.CurveComplexVectorAbstract;

}(APP);