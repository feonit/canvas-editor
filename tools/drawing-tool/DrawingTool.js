function DrawingTool(canvas){

    var optionsDraw = {
        lineWidth: 20,
        //lineCap: 'square',
        //lineJoin: 'square',
        lineCap: 'round',
        lineJoin: 'round',
    };

    var points = null;
    var point;
    var ctx;
    var colorValue = 'red';

    ctx = canvas.getContext("2d");

ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

    this.lastLayout = null;
    this.lastLayoutExamplePoint = [];

    var canvasCopy;
    var canvasCopyCtx;
    var that = this;

    function createCopyOfCanvas(canvas){
        var context = canvas.getContext('2d');
        var copy = document.createElement('canvas');
        copy.height = canvas.height;
        copy.width = canvas.width;
        var copyCtx =  copy.getContext('2d');
        copyCtx.lineCap = "round";
        copyCtx.lineJoin = "round";
        copyCtx.lineWidth = optionsDraw.lineWidth;
        copyCtx.strokeStyle = context.strokeStyle;
        return copy;
    }

    function onMousedown(event){
        if (!points) {
            points = [];

            point = new Point(event.layerX, event.layerY, colorValue);
            points.push(point);

            that.lastLayoutExamplePoint[0] = event.layerX;
            that.lastLayoutExamplePoint[1] = event.layerY;

            ctx.strokeStyle = point.color;

            canvasCopy = createCopyOfCanvas(canvas);
            canvasCopyCtx = canvasCopy.getContext('2d');
            drawCurve(new Curve(points), ctx);
            drawCurve(new Curve(points), canvasCopyCtx);
        }
    }

    function onMousemove(event){
        if (points){
            point = new Point(event.layerX, event.layerY, colorValue);
            points.push(point);
            drawCurve(new Curve(points), ctx);
            drawCurve(new Curve(points), canvasCopyCtx);
        }
    }

    function onMouseup(event){
        point = new Point(event.layerX, event.layerY, colorValue);
        points.push(point);
        drawCurve(new Curve(points), ctx);
        drawCurve(new Curve(points), canvasCopyCtx);
        points = null;

        var image = new Image();
        image.height = canvasCopy.height;
        image.width = canvasCopy.width;
        image.src = canvasCopy.toDataURL('image/png');

        that.lastLayout = image;
    }


    function drawCurve(touches, ctx){
        if (!touches || !touches.x || typeof(touches.x[0])!=="number") {
            return false;
        }
        ctx.beginPath();
        ctx.moveTo(touches.x[0], touches.y[0]);

        if (touches.x.length < 2) {
            ctx.lineTo(touches.x[0] + 0.51, touches.y[0]);
        }
        else if (touches.x.length < 3) {
            ctx.lineTo(touches.x[1], touches.y[1]);
        }
        else {
            ctx.moveTo((touches.x[0] + touches.x[1]) * 0.5, (touches.y[0] + touches.y[1]) * 0.5);
            var i = 1;
            //while (++i < (touches.x.length - 1)) {
                //var abs1 = Math.abs(touches.x[i - 1] - touches.x[i]) + Math.abs(touches.y[i - 1] - touches.y[i])
                //    + Math.abs(touches.x[i] - touches.x[i + 1]) + Math.abs(touches.y[i] - touches.y[i + 1]);
                //var abs2 = Math.abs(touches.x[i - 1] - touches.x[i + 1]) + Math.abs(touches.y[i - 1] - touches.y[i + 1]);
                //if (abs1 > 10 && abs2 > abs1 * 0.8) {
                    ctx.quadraticCurveTo(touches.x[i], touches.y[i], (touches.x[i] + touches.x[i + 1]) * 0.5, (touches.y[i] + touches.y[i + 1]) * 0.5);
                //} else {
                //    ctx.lineTo((touches.x[i] + touches.x[i+1]) * 0.5, (touches.y[i] + touches.y[i+1]) * 0.5);
                //}
            //}
            //ctx.moveTo(touches.x[touches.x.length - 1] , touches.y[touches.y.length - 1] );
        }
        ctx.stroke();
        return ctx.closePath();
    }


    function Point(x, y, color){
        this.x = x;
        this.y = y;
        this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    function Curve(points){
        this.x = [];
        this.y = [];

        var i = points.length, n;

        // для первой точки или прямой (соответственно для 1 или 2х точек)
        if ( i < 3 ) {
            for ( n = i; n > 0; n -=1 ) {
                this.x.push(points[n - 1].x);
                this.y.push(points[n - 1].y);
            }
            // последующие идут как кривые, берём последние 3 точки
        } else {
            for ( n = 0; n < 3 ; n += 1 ) {
                this.x.push(points[i - n - 1].x);
                this.y.push(points[i - n - 1].y);
            }

        }
    }



    this.start = function(){
        ctx = canvas.getContext("2d");
        ctx.lineCap = optionsDraw.lineCap;
        ctx.lineJoin = optionsDraw.lineJoin;
        ctx.lineWidth = optionsDraw.lineWidth;
        ctx.strokeStyle = 'blue';

        canvas.addEventListener('mousedown', onMousedown, false);
        canvas.addEventListener('mousemove', onMousemove, false);
        canvas.addEventListener('mouseup', onMouseup, false);
    };

    this.stop = function(){
        canvas.removeEventListener('mousedown', onMousedown);
        canvas.removeEventListener('mousemove', onMousemove);
        canvas.removeEventListener('mouseup', onMouseup);
    }
}

DrawingTool.prototype = Object.create(Tool);
DrawingTool.prototype.constructor = DrawingTool;
