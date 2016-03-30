!function(APP){
    APP.namespace('APP.objects');

    /**
     * Класс определяет по массиву контрольных точек
     * координаты ломанной линии
     * @class
     * @memberof APP.objects
     * */
    APP.objects.BrokenComplexVectorAbstract = function (attributes){
        APP.objects.ComplexVectorAbstract.apply(this, arguments);

        var coordinates = [];
        var points = this.points;
        points.forEach(function(point, index){
            if (points[index + 1]){
                coordinates = coordinates.concat(APP.core.MathFn.bline(point[0], point[1], points[index + 1][0], points[index + 1][1]));
            }

        });
        this.coordinatesLine = coordinates;
        this.calcCoordinates();

    };

    APP.objects.BrokenComplexVectorAbstract.prototype = Object.create(APP.objects.ComplexVectorAbstract.prototype);
    APP.objects.BrokenComplexVectorAbstract.prototype.constructor = APP.objects.BrokenComplexVectorAbstract;

}(APP);