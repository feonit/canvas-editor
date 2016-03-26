!function(APP){
    APP.CursorCircleView = function(options){
        this.x = options.x;
        this.y = options.y;
        this.size = options.size;
        this.color = options.color;

        var layer = document.createElement('canvas');
        layer.height = options.height;
        layer.width = options.width;

        var ctx = layer.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.stroke();

        this.layer = layer;
    }
}(APP);