!function(App){

    App.namespace('App.tools').FigureTool = FigureTool;

    function FigureTool(app, canvas){

        /** @type {HTMLCanvasElement}*/
        this.canvas = canvas;

        /** @type {number[][]|null}*/
        this.startPoint = null;

        /** @type {number[][]|null}*/
        this.currentPoint = null;

        this.canvasDataImage = null;

        //this.SQUARE_TYPE = 'SQUARE_TYPE';
        //this.CIRCLE_TYPE = 'CIRCLE_TYPE';
        this.RECTANGLE_TYPE = 'RECTANGLE_TYPE';
        this.ELLIPSE_TYPE = 'ELLIPSE_TYPE';

        this.currentType = 'ELLIPSE_TYPE' || 'RECTANGLE_TYPE';
        this.sizeWidth = 2;
        this.colorLine = 'red';
    }

    FigureTool.prototype.figureStart = function(x, y, color, width, figureType){
        this.startPoint = [x, y];
        var ctx = this.canvas.getContext("2d");

        ctx.lineWidth = width || this.sizeWidth;
        ctx.strokeStyle = color || this.colorLine;
        ctx.lineJoin = "miter";
        ctx.lineCap = "butt";

        this.currentType = figureType || 'RECTANGLE_TYPE';

        this.canvasDataImage = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    };
    FigureTool.prototype.figureContinue = function(x, y){
        this.currentPoint = [x, y];
        this.drawFigure();
    };
    FigureTool.prototype.figureEnd = function(x, y){
        if (!this.currentPoint) return;
        this.drawFigure();

        App.newEvent('CREATED_REGION', [x, y, this.canvas]); //todo!

        this.startPoint = null;
        this.currentPoint = null;
        this.canvasDataImage = null;
    };

    FigureTool.prototype.drawFigure = function(){
        var ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, this.canvas.height);
        ctx.putImageData(this.canvasDataImage, 0, 0);

        if (this.currentType === this.RECTANGLE_TYPE){
            ctx.rect(this.startPoint[0],this.startPoint[1],this.currentPoint[0] - this.startPoint[0],this.currentPoint[1] - this.startPoint[1]);
        }

        else if (this.currentType === this.ELLIPSE_TYPE){
            var y2 = this.currentPoint[1] - this.startPoint[1];
            var x2 = this.currentPoint[0] - this.startPoint[0];
            var radius = Math.round( Math.sqrt( Math.pow(y2, 2) + Math.pow(x2, 2) ) );

            ctx.ellipse((this.startPoint[0] + this.currentPoint[0])/2, (this.startPoint[1] + this.currentPoint[1])/2, Math.abs(x2/2), Math.abs(y2/2), 0, 0, 2*Math.PI);
        }

        ctx.stroke();

    };

}(App);