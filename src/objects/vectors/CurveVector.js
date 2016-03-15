!function(APP){
    APP.namespace('APP.objects');
    var Curve = APP.Curve;
    var MathFn = APP.MathFn;
    var VectorRegion = APP.VectorRegion;

    APP.objects.CurveVector = function (options){
        options = options || {};
        VectorRegion.apply(this, arguments);
        this.points = options.points;
        this.size = options.size;
        this.color = options.color;
    };
    APP.objects.CurveVector.prototype = Object.create(VectorRegion.prototype);
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