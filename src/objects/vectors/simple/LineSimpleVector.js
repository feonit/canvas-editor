!function(APP){
    APP.namespace('APP.objects');
    var MathFn = APP.MathFn;

    APP.objects.LineSimpleVector = function (attributes){
        APP.objects.SimpleVector.apply(this, arguments);
        this.coordinatesLine = MathFn.bline(this.x0, this.y0, this.x1, this.y1);
        this.calcCoordinates();

    };

    APP.objects.LineSimpleVector.prototype = Object.create(APP.objects.SimpleVector.prototype);
    APP.objects.LineSimpleVector.prototype.constructor = APP.objects.LineSimpleVector;

}(APP);