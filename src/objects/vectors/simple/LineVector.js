!function(APP){
    APP.namespace('APP.objects');
    var MathFn = APP.MathFn;

    APP.objects.LineVector = function (attributes){
        APP.objects.SimpleVector.apply(this, arguments);
    };

    APP.objects.LineVector.prototype = Object.create(APP.objects.SimpleVector.prototype);
    APP.objects.LineVector.prototype.constructor = APP.objects.LineVector;
    APP.objects.LineVector.prototype.getCoordinatesLine = function(){
        if (!this.coordinatesLine){
            this.coordinatesLine = MathFn.bline(this.x0, this.y0, this.x1, this.y1);
        }
        return this.coordinatesLine;
    };
}(APP);