!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').RectangleRegion = RectangleRegion;

    var RegionObject = CanvasEditor.RegionObject;

    function RectangleRegion(options){
        options = options || {};
        RegionObject.apply(this, arguments);
        this.x0 = options.x0;
        this.y0 = options.y0;
        this.x1 = options.x1;
        this.y1 = options.y1;
        this.size = options.size;
        this.color = options.color;
    }

    RectangleRegion.prototype = Object.create(RegionObject.prototype);
    RectangleRegion.prototype.constructor = RectangleRegion;

    RectangleRegion.prototype.getCoordinatesLine = function(){
        if (!this.coordinatesLine){
            function rectangle(x0, y0, x1, y1){
                var px = [[x0, y0], [x0, y1], [x1, y0], [x1, y1]];
                var dx,dy,x,y,len,i;

                dx = x1>x0? 1 : -1;
                dy = y1>y0? 1 : -1;

                for (x = x0, i = 0, len = Math.abs(x1-x0) - 1; i < len; i++){
                    x = x + dx;
                    px.push([x, y0]);
                    px.push([x, y1]);
                }

                for (y = y0, i = 0, len = Math.abs(y1-y0) - 1; i < len; i++){
                    y = y + dy;
                    px.push([x0, y]);
                    px.push([x1, y]);
                }

                return px;
            }
            this.coordinatesLine = rectangle(this.x0, this.y0, this.x1, this.y1);
        }
        return this.coordinatesLine;
    }

}(CanvasEditor);