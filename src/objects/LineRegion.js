!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').LineRegion = LineRegion;

    var RegionObject = CanvasEditor.RegionObject;

    function LineRegion(options){
        options = options || {};
        RegionObject.apply(this, arguments);
        this.x0 = options.x0;
        this.y0 = options.y0;
        this.x1 = options.x1;
        this.y1 = options.y1;
        this.size = options.size;
        this.color = options.color;
    }

    LineRegion.prototype = Object.create(RegionObject.prototype);
    LineRegion.prototype.constructor = LineRegion;

    LineRegion.prototype.getCoordinatesLine = function(){
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
            };
            this.coordinatesLine = bline(this.x0, this.y0, this.x1, this.y1);
        }
        return this.coordinatesLine;
    }

}(CanvasEditor);