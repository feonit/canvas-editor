!function(APP){
    APP.namespace('APP.objects');

    APP.objects.ArrowSimpleVector = function (attributes){
        APP.objects.SimpleVector.apply(this, arguments);

        // Повернуть точку относительно другой на заданный радиан
        function turn(x0, y0, relx, rely, rad){
            rad = rad || Math.PI/2;
            relx = relx || 0;
            rely = rely || 0;
            x0 = x0 - relx;
            y0 = y0 - rely;
            var x = x0 * parseFloat(Math.cos(rad).toFixed(10)) - y0 * parseFloat(Math.sin(rad).toFixed(10));
            var y = x0 * parseFloat(Math.sin(rad).toFixed(10)) + y0 * parseFloat(Math.cos(rad).toFixed(10));
            x = Math.round(x) + relx;
            y = Math.round(y) + rely;
            return [x, y];
        }

        //todo добавлено из lineObject
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

        var ARROW_RADIAN = Math.PI/6;
        var ARROW_LENGTH = 0.3;
        var coordinates = bline(this.x0, this.y0, this.x1, this.y1);
        var halfX = Math.round(this.x1 - (this.x1-this.x0)*ARROW_LENGTH);
        var halfY = Math.round(this.y1 - (this.y1-this.y0)*ARROW_LENGTH);
        var coorLine1 = turn(halfX, halfY, this.x1, this.y1, -ARROW_RADIAN);
        var line1 = bline(this.x1, this.y1, coorLine1[0], coorLine1[1]);
        var coorLine2 = turn(halfX, halfY, this.x1, this.y1, ARROW_RADIAN);
        var line2 = bline(this.x1, this.y1, coorLine2[0], coorLine2[1]);

        coordinates = coordinates.concat(line1);
        coordinates = coordinates.concat(line2);

        this.coordinatesLine = coordinates;
        this.calcCoordinates();

    };

    APP.objects.ArrowSimpleVector.prototype = Object.create(APP.objects.SimpleVector.prototype);
    APP.objects.ArrowSimpleVector.prototype.constructor = APP.objects.ArrowSimpleVector;
}(APP);