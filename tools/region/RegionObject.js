/**
 * @class RegionObject
 * @param {HTMLCanvasElement} canvas — холст, к которому принадлежит объект
 * @param {number[][]} coordinates — массив координат пикселей объекта на холсте
 * @param {}
 * */
function RegionObject(canvas, coordinates, etalonPointImageData, borderCoordinates){
    this.canvas = canvas;
    this.coordinates = coordinates;
    this.borderCoordinates = borderCoordinates;
    this.etalonPointImageData = etalonPointImageData;
    this.layout = null;
}

/**
 * Метод создания подцветки
 * */
RegionObject.prototype.activate = function(){
    //var ctx = this.canvas.getContext('2d');
    //this.canvasBeforeActivate = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    //this.coordinates.forEach((function(arr){
    //    ctx.fillStyle = 'yellow';
    //    ctx.fillRect( arr[0], arr[1]-1 , 1, 1 ); // -1 смещение
    //}).bind(this));


    // обновить переносимую картинку
    //var canvas = document.createElement('canvas');
    //canvas.width = this.canvas.width;
    //canvas.height = this.canvas.height;
    //var ctx = canvas.getContext('2d');
    //ctx.drawImage(this.layout, 0, 0);
    //this.borderCoordinates.forEach((function(arr){
    //    ctx.fillStyle = 'yellow';
    //    ctx.fillRect( arr[0], arr[1]-1 , 1, 1 ); // -1 смещение
    //}).bind(this));
    //var image = new Image();
    //image.height = canvas.height;
    //image.width = canvas.width;
    //this.layout = image;
};

/**
 * Метод удаления подцветки
 * */
RegionObject.prototype.deactivate = function(){};

/**
 * Метод стирающий регион с холста
 * Стирает каждый пиксел
 * */
RegionObject.prototype.clean = function(){
    var ctx = canvas.getContext('2d');
    var coordinates = this.coordinates;
    for (var i = 0, len = coordinates.length; i < len; i++){
        ctx.clearRect(coordinates[i][0], coordinates[i][1] - 1, 1, 1); // -1 смещение
    }
};

RegionObject.prototype.getCopyLayout = function(){
    if (this.layout)
        return this.layout;

    var coordinates = this.coordinates;
    var height = this.canvas.height;
    var width = this.canvas.width;
    var layoutCanvas = document.createElement('canvas');
    var ctx = layoutCanvas.getContext('2d');
    var coordinate;
    var i, len;

    var layoutImage = new Image();
    layoutCanvas.height = height;
    layoutCanvas.width = width;

    // проверено drawImage в этом случае работает раза в 4 быстрее чем putImageData
    // создаю картинку размером в 1 пиксел

    // todo вот тут нужно использовать уже готовый лейаут
    // нужен оптимизирующий алгаритм для работы drawImage, чтобы избежать попиксельную обработку, основанный на том
    // факте, что цвета соседних пикселей одинаковы

    var px = new Image();
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var imageData = ctx.createImageData(1,1);
    var data = imageData.data;
    var etalon = this.etalonPointImageData;
    data[0] = etalon[0];
    data[1] = etalon[1];
    data[2] = etalon[2];
    data[3] = etalon[3];

    px.height = 1;
    px.width = 1;
    canvas.height = 1;
    canvas.width = 1;
    context.putImageData(imageData, 0, 0);
    px.src = canvas.toDataURL('image/png');

    for (i = 0, len = coordinates.length; i < len; i++){
        coordinate = coordinates[i];
        ctx.drawImage(px, coordinate[0], coordinate[1]);
    }

    layoutCanvas.getContext('2d').getImageData(0, 0, layoutCanvas.width, layoutCanvas.height);
    layoutImage.src = layoutCanvas.toDataURL('image/png');

    return this.layout = layoutImage;
};