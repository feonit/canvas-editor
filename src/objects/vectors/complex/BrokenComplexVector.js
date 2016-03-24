!function(APP){
    APP.namespace('APP.objects');
    var MathFn = APP.MathFn;
    var ComplexVector = APP.objects.ComplexVector;

    /**
     * Класс определяет по массиву контрольных точек
     * координаты ломанной линии
     * @class BrokenComplexVector
     * @memberof APP.objects
     * */
    APP.objects.BrokenComplexVector = function (attributes){
        ComplexVector.apply(this, arguments);

        var coordinates = [];
        var points = this.points;
        points.forEach(function(point, index){
            // начинаем со второго элемента
            if (!index) return;

            if (points[index + 1]){
                coordinates = coordinates.concat(MathFn.bline(point[0], point[1], points[index + 1][0], points[index + 1][1]));
            }

        });
        this.coordinatesLine = coordinates;
        this.calcCoordinates();

    };

    APP.objects.CurveComplexVector.prototype = Object.create(ComplexVector.prototype);
    APP.objects.CurveComplexVector.prototype.constructor = APP.objects.CurveComplexVector;

}(APP);