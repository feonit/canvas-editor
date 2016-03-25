!function(APP){
    APP.namespace('APP.objects');
    var MathFn = APP.MathFn;
    var ComplexVectorAbstract = APP.objects.ComplexVectorAbstract;

    /**
     * Класс определяет по массиву контрольных точек
     * координаты ломанной линии
     * @class BrokenComplexVectorAbstract
     * @memberof APP.objects
     * */
    APP.objects.BrokenComplexVectorAbstract = function (attributes){
        ComplexVectorAbstract.apply(this, arguments);

        var coordinates = [];
        var points = this.points;
        points.forEach(function(point, index){
            if (points[index + 1]){
                coordinates = coordinates.concat(MathFn.bline(point[0], point[1], points[index + 1][0], points[index + 1][1]));
            }

        });
        this.coordinatesLine = coordinates;
        this.calcCoordinates();

    };

    APP.objects.BrokenComplexVectorAbstract.prototype = Object.create(ComplexVectorAbstract.prototype);
    APP.objects.BrokenComplexVectorAbstract.prototype.constructor = APP.objects.BrokenComplexVectorAbstract;

}(APP);