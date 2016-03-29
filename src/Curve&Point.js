!function(APP){
    APP.namespace('APP');
    /**
     * Точка
     * @class
     * @memberof APP.core
     * @param {number} x
     * @param {number} y
     * */
    APP.core.Point = function (x, y){
        this.x = x;
        this.y = y;
    }
}(APP);

!function(APP){
    APP.namespace('APP');
    /**
     * Кривая линия
     * @class
     * @memberof APP.core
     * @param points
     * */
    APP.core.Curve = function (points){
        this.x = [];
        this.y = [];

        var i = points.length, n;

        // для первой точки или прямой (соответственно для 1 или 2х точек)
        if ( i < 3 ) {
            for ( n = i; n > 0; n -=1 ) {
                this.x.push(points[n - 1].x);
                this.y.push(points[n - 1].y);
            }
            // последующие идут как кривые, берём последние 3 точки
        } else {
            for ( n = 0; n < 3 ; n += 1 ) {
                this.x.push(points[i - n - 1].x);
                this.y.push(points[i - n - 1].y);
            }
        }
    }
}(APP);