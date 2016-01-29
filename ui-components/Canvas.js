/**
 * Custom HTMLCanvasElement
 * */
function Canvas(options, canvas, ctx){
    options = options || {};
    canvas = document.createElement('canvas');
    canvas.width  = options.width || 400;
    canvas.height = options.height || 250;
    canvas.style.border   = "1px solid";
    ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = '#333';

    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.stroke();

    return canvas;
}

