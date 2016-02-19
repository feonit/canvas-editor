!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').Point = Point;
    CanvasEditor.namespace('CanvasEditor').Curve = Curve;

    /**
     * Точка
     * @class Point
     * @memberof CanvasEditor
     * @param {number} x
     * @param {number} y
     * */
    function Point(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * Кривая линия
     * @class Curve
     * @memberof CanvasEditor
     * @param points
     * @param {HTMLCanvasElement} radius
     * */
    function Curve(points, radius){
        this.x = [];
        this.y = [];
        this.radius = radius || 10;

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

}(CanvasEditor);