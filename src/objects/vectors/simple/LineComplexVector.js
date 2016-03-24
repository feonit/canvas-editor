!function(APP){
    APP.namespace('APP.objects');
    var MathFn = APP.MathFn;

    APP.objects.LineComplexVector = function (attributes){
        APP.objects.SimpleVector.apply(this, arguments);
        this.coordinatesLine = MathFn.bline(this.x0, this.y0, this.x1, this.y1);
        this.calcCoordinates();

    };

    APP.objects.LineComplexVector.prototype = Object.create(APP.objects.SimpleVector.prototype);
    APP.objects.LineComplexVector.prototype.constructor = APP.objects.LineComplexVector;

}(APP);