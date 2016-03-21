!function(APP){
    APP.namespace('APP.objects');
    var MathFn = APP.MathFn;
    var ComplexVector = APP.objects.ComplexVector;

    /**
     * Класс определяет по массиву контрольных точек
     * координаты кривых безье
     * */
    APP.objects.BrokenVector = function (attributes){
        ComplexVector.apply(this, arguments);
    };

    APP.objects.CurveVector.prototype = Object.create(ComplexVector.prototype);
    APP.objects.CurveVector.prototype.constructor = APP.objects.CurveVector;
    APP.objects.CurveVector.prototype.getCoordinatesLine = function(){
        if (!this.coordinatesLine){
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
        }
        return this.coordinatesLine;
    };
}(APP);