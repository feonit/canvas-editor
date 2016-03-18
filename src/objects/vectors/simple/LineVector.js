!function(APP){
    APP.namespace('APP.objects');

    APP.objects.LineVector = function (attributes){
        APP.objects.SimpleVector.apply(this, arguments);
    };

    APP.objects.LineVector.prototype = Object.create(APP.objects.SimpleVector.prototype);
    APP.objects.LineVector.prototype.constructor = APP.objects.LineVector;
    APP.objects.LineVector.prototype.getCoordinatesLine = function(){
        if (!this.coordinatesLine){
            function bline(x0, y0, x1, y1) {
                var px = [];
                function setPixel(x,y){px.push([x,y])}

                var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
                var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
                var err = (dx>dy ? dx : -dy)/2;

                while (true) {
                    setPixel(x0,y0);

                    if (x0 === x1 && y0 === y1) break;
                    var e2 = err;
                    if (e2 > -dx) {
                        err -= dy;
                        x0 += sx;
                    }
                    if (e2 < dy) {
                        err += dx;
                        y0 += sy;
                    }
                }
                return px;
            }
            this.coordinatesLine = bline(this.x0, this.y0, this.x1, this.y1);
        }
        return this.coordinatesLine;
    };
}(APP);