!function(APP){

    APP.CursorCircleView = function(options){
        this.canvas = options.canvas;
        this.x = options.x;
        this.y = options.y;
        this.size = options.size;
        this.color = options.color;

        var canvas = this.canvas;
        /**
         * Курсор скрывается за пределами холста
         * */
        //this.cursorOut = function (){
        //    appInstance.regionManager.redrawLayers();
        //};

        this.drawCursor = function(){
            appInstance.regionManager.redrawLayers();

            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
            ctx.stroke();
        };

        var cursor;
        var strokeStyleOriginal;

        this.enable = function (){
            cursor = canvas.style.cursor;
            var ctx = canvas.getContext("2d");
            strokeStyleOriginal = ctx.strokeStyle;
            canvas.style.cursor = "none";
        };

        this.disable = function (){
            canvas.style.cursor = cursor;
            var ctx = canvas.getContext("2d");
            ctx.strokeStyle = strokeStyleOriginal;
        };

        this.drawCursor();
    }

}(APP);