!function(APP){
    APP.namespace('APP.objects');
    var Curve = APP.Curve;
    var MathFn = APP.MathFn;
    var ComplexVector = APP.objects.ComplexVector;

    /**
     * Класс определяет по массиву контрольных точек
     * координаты кривых безье
     * */
    APP.objects.CurveVector = function (attributes){
        ComplexVector.apply(this, arguments);
    };

    APP.objects.CurveVector.prototype = Object.create(ComplexVector.prototype);
    APP.objects.CurveVector.prototype.constructor = APP.objects.CurveVector;
    APP.objects.CurveVector.prototype.getCoordinatesLine = function(){
        if (!this.coordinatesLine){
            var coordinates = [];
            var points = this.points;
            var size = Math.round(this.size/2);
            points.forEach(function(point, index){
                var part = points.slice(0, index + 1);
                var calc = MathFn.drawBezierCurve(new Curve(part, size));
                coordinates = coordinates.concat(calc);
            });
            this.coordinatesLine = coordinates;
        }
        return this.coordinatesLine;
    };
}(APP);