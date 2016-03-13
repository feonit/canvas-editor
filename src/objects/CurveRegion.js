!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').CurveRegion = CurveRegion;

    var Curve = CanvasEditor.Curve;
    var MathFn = CanvasEditor.MathFn;
    var RegionObject = CanvasEditor.RegionObject;

    function CurveRegion(options){
        options = options || {};
        RegionObject.apply(this, arguments);
        this.points = options.points;
        this.size = options.size;
        this.color = options.color;
    }

    CurveRegion.prototype = Object.create(CanvasEditor.RegionObject.prototype);
    CurveRegion.prototype.constructor = CurveRegion;

    CurveRegion.prototype.getCoordinatesLine = function(){
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