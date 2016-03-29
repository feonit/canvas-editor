!function(APP){
    APP.namespace('APP.objects');
    var Curve = APP.core.Curve;
    var MathFn = APP.core.MathFn;
    var ComplexVectorAbstract = APP.objects.ComplexVectorAbstract;

    /**
     * Класс определяет по массиву контрольных точек
     * координаты кривых безье
     * @class CurveComplexVectorAbstract
     * @memberof APP.objects
     * */
    APP.objects.CurveComplexVectorAbstract = function (attributes){
        ComplexVectorAbstract.apply(this, arguments);

        var coordinates = [];
        var points = this.points;
        var size = Math.round(this.size/2);
        points.forEach(function(point, index){
            var part = points.slice(0, index + 1);
            var calc = MathFn.drawBezierCurve(new Curve(part, size));
            coordinates = coordinates.concat(calc);
        });

        this.coordinatesLine = coordinates;

        this.calcCoordinates();
    };

    APP.objects.CurveComplexVectorAbstract.prototype = Object.create(ComplexVectorAbstract.prototype);
    APP.objects.CurveComplexVectorAbstract.prototype.constructor = APP.objects.CurveComplexVectorAbstract;

}(APP);