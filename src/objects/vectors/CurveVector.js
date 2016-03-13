!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').CurveVector = CurveVector;

    var Curve = CanvasEditor.Curve;
    var MathFn = CanvasEditor.MathFn;
    var VectorRegion = CanvasEditor.VectorRegion;

    function CurveVector(options){
        options = options || {};
        VectorRegion.apply(this, arguments);
        this.points = options.points;
        this.size = options.size;
        this.color = options.color;
    }

    CurveVector.prototype = Object.create(CanvasEditor.VectorRegion.prototype);
    CurveVector.prototype.constructor = CurveVector;

    CurveVector.prototype.getCoordinatesLine = function(){
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
    }

}(CanvasEditor);