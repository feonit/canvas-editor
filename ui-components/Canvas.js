/**
 * Custom HTMLCanvasElement
 * */
function Canvas(options, canvas, ctx){
    options = options || {};
    canvas = document.createElement('canvas');
    canvas.width  = options.width || 1200;
    canvas.height = options.height || 850;
    canvas.style.border   = "1px solid";
    ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = '#333';

    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.stroke();

    return canvas;
}

