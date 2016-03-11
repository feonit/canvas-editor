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
            this.coordinatesLine = MathFn.drawBezierCurve(new Curve(this.points, Math.round(this.size/2)));
            //console.log(this.coordinatesLine.length)
        }
        return this.coordinatesLine;
    }

}(CanvasEditor);