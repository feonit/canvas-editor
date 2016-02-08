/**
 * @class RegionObject
 * @param options
 * */
function RegionObject(options){
    options = options || {};

    /**
     * Массив координат пикселей объекта на холсте
     * @type {number[][]}
     * */
    this.coordinates = options.coordinates;

    /**
     * @type {ImageData.data}
     * */
    this.etalonPointImageData = options.etalonPointImageData;

    /**
     * Картинка с регионом размером с сам холст
     * @type {HTMLElementCanvas}
     * */
    this.layoutCanvas = options.layoutCanvas || null;

    /** не доделано */
    this.borderCoordinates = options.borderCoordinates;

    /**
     * Смещение слоя на главноем холсте после транспортировки
     * Первая запись гласит о нулевом смещении
     * @arg {number[][]}
     * */
    this.recordsOffset = [[0,0]];

    this.offsetX = 0;
    this.offsetY = 0;

    this.saveRecordOffset = function(){
        this.recordsOffset.push([this.offsetX, this.offsetY])
    }
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
    //ctx.drawImage(this.layoutCanvas, 0, 0);
    //this.borderCoordinates.forEach((function(arr){
    //    ctx.fillStyle = 'yellow';
    //    ctx.fillRect( arr[0], arr[1]-1 , 1, 1 ); // -1 смещение
    //}).bind(this));
    //var image = new Image();
    //image.height = canvas.height;
    //image.width = canvas.width;
    //this.layoutCanvas = image;
};

/**
 * Метод удаления подцветки
 * */
RegionObject.prototype.deactivate = function(){};

/**
 * Метод стирающий регион с холста
 * Стирает каждый пиксел
 * */
RegionObject.prototype.cleanFromCanvas = function(canvas){
    var offsetX = this.offsetX;
    var offsetY = this.offsetY;

    var ctx = canvas.getContext('2d');
    var coordinates = this.coordinates;
    var coordinate;
    var coordinateX;
    var coordinateY;
    var clearCoordinateX;
    var clearCoordinateY;
    for (var i = 0, len = coordinates.length; i < len; i++){
        coordinate = coordinates[i];
        coordinateX = coordinate[0];
        coordinateY = coordinate[1];
        clearCoordinateX = coordinateX + offsetX;
        clearCoordinateY = coordinateY + offsetY;
        ctx.clearRect(clearCoordinateX, clearCoordinateY, 1, 1); // -1 смещение
    }
};

RegionObject.prototype.makeLayoutFromCanvas = function(generalCanvas){
    if (this.layoutCanvas)
        return this.layoutCanvas;

    var height = generalCanvas.height;
    var width = generalCanvas.width;
    var layoutCanvas = document.createElement('canvas');
    var ctx;

    layoutCanvas.height = height;
    layoutCanvas.width = width;
    ctx = layoutCanvas.getContext('2d');
    // проверено drawImage в этом случае работает раза в 4 быстрее чем putImageData
    // создаю картинку размером в 1 пиксел

    // todo вот тут нужно использовать уже готовый лейаут
    // нужен оптимизирующий алгаритм для работы drawImage, чтобы избежать попиксельную обработку, основанный на том
    // факте, что цвета соседних пикселей одинаковы

    var canvas1px = document.createElement('canvas');
    var imageData = ctx.createImageData(1,1);
    var data = imageData.data;
    var etalon = this.etalonPointImageData;
    data[0] = etalon[0];
    data[1] = etalon[1];
    data[2] = etalon[2];
    data[3] = 255;// etalon[3]; !!!!!!!!!

    canvas1px.height = 1;
    canvas1px.width = 1;

    var canvas1pxCtx = canvas1px.getContext('2d');
    canvas1pxCtx.putImageData(imageData, 0, 0);

    var coordinates = this.coordinates;
    var coordinate;

    for (var i = 0, len = coordinates.length; i < len; i++){
        coordinate = coordinates[i];
        ctx.drawImage(canvas1px, coordinate[0], coordinate[1]);
    }

    //ctx.getImageData(0, 0, width, height);

    return this.layoutCanvas = layoutCanvas;
};