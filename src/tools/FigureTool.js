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

        this.SQUARE_TYPE = 'SQUARE_TYPE';
        this.CIRCLE_TYPE = 'CIRCLE_TYPE';
        this.RECTANGLE_TYPE = 'RECTANGLE_TYPE';
        this.ELLIPSE_TYPE = 'ELLIPSE_TYPE';

        this.currentType = 'RECTANGLE_TYPE';
        this.sizeWidth = 2;
        this.colorLine = 'red';
    }

    FigureTool.prototype.figureStart = function(x, y, color, width){
        if (color){
            this.colorLine = color;
        }
        if (width){
            this.sizeWidth = width;
        }
        this.startPoint = [x, y];
        var ctx = this.canvas.getContext("2d");
        ctx.lineWidth = this.sizeWidth;
        ctx.strokeStyle = this.colorLine;
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
        ctx.stroke();

    };

}(App);