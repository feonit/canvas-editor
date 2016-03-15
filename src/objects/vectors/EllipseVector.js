!function(APP){
    APP.namespace('APP');
    var VectorRegion = APP.VectorRegion;
    APP.EllipseVector = function (options){
        options = options || {};
        VectorRegion.apply(this, arguments);
        this.x0 = options.x0;
        this.y0 = options.y0;
        this.x1 = options.x1;
        this.y1 = options.y1;
        this.size = options.size;
        this.color = options.color;
    };
    APP.EllipseVector.prototype = Object.create(VectorRegion.prototype);
    APP.EllipseVector.prototype.constructor = APP.EllipseVector;
    APP.EllipseVector.prototype.getCoordinatesLine = function(){
        if (!this.coordinatesLine){
            function plotEllipseRect(x0, y0, x1, y1){
                var px = [];
                function setPixel(x,y){px.push([x,y])}

                var a = Math.abs(x1-x0), b = Math.abs(y1-y0), b1 = b&1; /* values of diameter */
                var dx = 4*(1-a)*b*b, dy = 4*(b1+1)*a*a; /* error increment */
                var err = dx+dy+b1*a*a, e2; /* error of 1.step */

                if (x0 > x1) { x0 = x1; x1 += a; } /* if called with swapped points */
                if (y0 > y1) y0 = y1; /* .. exchange them */
                y0 += (b+1)/2; y1 = y0-b1;   /* starting pixel */
                a *= 8*a; b1 = 8*b*b;

                // возникают половинки
                y0 = Math.round(y0);

                do {
                    setPixel(x1, y0); /*   I. Quadrant */
                    setPixel(x0, y0); /*  II. Quadrant */
                    setPixel(x0, y1); /* III. Quadrant */
                    setPixel(x1, y1); /*  IV. Quadrant */
                    e2 = 2*err;
                    if (e2 <= dy) { y0++; y1--; err += dy += a; }  /* y step */
                    if (e2 >= dx || 2*err > dy) { x0++; x1--; err += dx += b1; } /* x step */
                } while (x0 <= x1);

                while (y0-y1 < b) {  /* too early stop of flat ellipses a=1 */
                    setPixel(x0-1, y0); /* -> finish tip of ellipse */
                    setPixel(x1+1, y0++);
                    setPixel(x0-1, y1);
                    setPixel(x1+1, y1--);
                }

                return px;
            }
            this.coordinatesLine = plotEllipseRect(this.x0, this.y0, this.x1, this.y1);
        }
        return this.coordinatesLine;
    };
}(APP);