/**
 * Custom HTMLCanvasElement
 * */
function Canvas(options, canvas, ctx){
    options = options || {};
    canvas = document.createElement('canvas');
    canvas.width  = options.width || 800;
    canvas.height = options.height || 400;
    //canvas.style.border   = "1px solid";
    ctx = canvas.getContext("2d");

    canvas.setAttribute('oncontextmenu', 'return false;');

    ctx.fillStyle = '#333';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(50,50,2,2);
    //
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,1,1);

    //ctx.arc(15, 15, 5, 0, 2 * Math.PI, false);
    //ctx.fillStyle = 'rgb(0,0,255)';
    //ctx.fill();

    window.ctx = ctx;
    window.canvas = canvas;
    return canvas;
}

