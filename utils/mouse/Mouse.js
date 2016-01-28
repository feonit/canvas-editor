
/**
 * Метод обработки событий мыши
 * В зависимости от активного инструмента, поведение программы будет различным
 * */




/**
 * @class MouseManager Курсор, позволяет определить координату курсора над холстом
 * координата X,
 * координата Y
 * */

/**
 * Метод привязки непрерывного отслеживания положения курсора над холстом
 * */

/**
 * Метод отвязки непрерывного отслеживания положения курсора над холстом
 * */


function Mouse(canvas){
    var ctx = canvas.getContext("2d");
    var process = false;

    function mousedown(){
        process = true;onMouse.apply(this,arguments)
    }
    function mousemove(event){
        if (event.layerX > canvas.width || event.layerY > canvas.height || event.layerX < 0 || event.layerY < 0 ){
            process = false;
        }

        if(process) onMouse.apply(this,arguments)
    }
    function mouseup(){
        process = false;onMouse.apply(this,arguments)
    }

    function onMouse(event){
        circleDrow(event.layerX, event.layerY)
    }

    function circleDrow(x, y){
        ctx.beginPath();
        ctx.arc(x, y,3,0,2*Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    }

    this.start = function(){
        canvas.addEventListener('mousedown', mousedown, false);
        canvas.addEventListener('mousemove', mousemove, false);
        canvas.addEventListener('mouseup', mouseup, false);
    };

    this.stop = function(){
        canvas.removeEventListener('mousedown', mousedown);
        canvas.removeEventListener('mousemove', mousemove);
        canvas.removeEventListener('mouseup', mouseup);
    }
}