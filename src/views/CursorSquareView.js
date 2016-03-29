!function(APP){
    /**
     * Курсор в виде квадрата
     * @class
     * @memberof APP.views
     * */
    APP.views.CursorSquareView = function(options){
        this.x = options.x;
        this.y = options.y;
        this.size = options.size;

        var layer = document.createElement('canvas');
        layer.height = options.height;
        layer.width = options.width;

        var ctx = layer.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.stroke();

        this.layer = layer;
    }
}(APP);