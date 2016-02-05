/**
 * @class RegionTool
 * @param {HTMLCanvasElement} canvas — канвас
 * @arg searchMode — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo
 * */
function RegionTool(canvas){

    this.canvas = canvas;

    this.regions = [];

    /**{Uint8ClampedArray}*/
    var beforeActivatingRegionCanvasImageData = null;
    
    var that = this;

    var ctx = canvas.getContext('2d');
    var dndStartPositionX;
    var dndStartPositionY;
    var imageData = null;

    /** @type {ImageData} */
    var beforeDndDataImage = null;
    var selectedRegionObject;
    var movedImage;

    // объявляет начало и конец переноса
    var processDnD = false;

    // символизирует знак готовности данных для процесса переноса
    var prepared = false;

    var currentOffsetX;
    var currentOffsetY;
    var savedOffsetX;
    var savedOffsetY;

    function mousedown(event){

        // выделяем объект левой
        if (event.which == 1){

            // возьмем за правило, что если выделяемый пиксель имеет цвет фона холста ( прозрачный по дефолту ) то сбрасываем событие
            var data = ctx.getImageData(event.layerX, event.layerY, 1, 1).data;
            if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 0){
                return false;
            }

            // если не выделен, выделяем
            if (!selectedRegionObject){
                beforeActivatingRegionCanvasImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                 //пробуем найти регион по индексовой карте (поиск по слою)
                selectedRegionObject = pxRegion.getRegionByPx(event.layerX, event.layerY);

                // пробуем найти регион волшебной палочкой (поиск по цвету)
                //selectedRegionObject = that.createRegionByPointAtCanvas(event.layerX, event.layerY, canvas);



                selectedRegionObject.activate();


                // считать с холста данные и подготовить прослойку для видимого переноса
                // !!! для ускорения переброса
                // !!! но последовательный код тормозит интерфейс, поэтому выполняем в следующем потоке
                // а замыкание чтобы регион не занулился после mouseout
                setTimeout((function(region){
                    movedImage = region.makeLayoutFromCanvas(canvas);
                    console.log('READY');
                }).bind(this, selectedRegionObject), 0);
            }

            // начало процесса перемещения
            processDnD = true;

            // запоминаем исходную позицию
            dndStartPositionX = event.layerX;
            dndStartPositionY = event.layerY;
            currentOffsetX = 0;
            currentOffsetY = 0;
            savedOffsetX = selectedRegionObject.offsetX;
            savedOffsetY = selectedRegionObject.offsetY;

        // снимаем выделение средней и правой кнопкой
        } else if (event.which == 2 || event.which == 3){

            // если не пусто, значит какой то объект выделен
            if (selectedRegionObject){

                // убираем выделение путем восстанавления первоначального состояния
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.putImageData(beforeActivatingRegionCanvasImageData, 0, 0);
                beforeActivatingRegionCanvasImageData = null;
                selectedRegionObject = null;
            }
        }

        // по одиночному клику инициализацию данных не производим
        prepared = false;
    }

    function mousemove(event){
        if (processDnD){
            // если данные для переноса не подготовлены
            if (!prepared){

                // считать с холста данные и подготовить прослойку для видимого переноса
                movedImage = selectedRegionObject.makeLayoutFromCanvas(canvas);

                // стереть объект
                selectedRegionObject.cleanFromCanvas(canvas);

                // запомнить как выглядит канвас без объекта
                beforeDndDataImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

                prepared = true;
            }
            currentOffsetX = event.layerX - dndStartPositionX;
            currentOffsetY = event.layerY - dndStartPositionY;

            selectedRegionObject.offsetX = savedOffsetX + currentOffsetX;
            selectedRegionObject.offsetY = savedOffsetY + currentOffsetY;

            console.log(selectedRegionObject.offsetY);
            that._redrawRegion(selectedRegionObject, beforeDndDataImage);
        }
    }

    function mouseup(event){
        if (processDnD){

            currentOffsetX = event.layerX - dndStartPositionX;
            currentOffsetY = event.layerY - dndStartPositionY;

            selectedRegionObject.offsetX = savedOffsetX + currentOffsetX;
            selectedRegionObject.offsetY = savedOffsetY + currentOffsetY;

            if (prepared){
                that._redrawRegion(selectedRegionObject, beforeDndDataImage);

                // сначало удаляем записи из таблицы о регионе
                pxRegion.removeRegion(selectedRegionObject);

                // save final offset
                selectedRegionObject.saveRecordOffset();

                // затем добавляем запись как о новом регионе
                pxRegion.addRegion(selectedRegionObject);
            }

            // заканчиваем процесс
            processDnD = false;

            // сброс данных
            prepared = false;

            selectedRegionObject = null;
            beforeDndDataImage = null;
            movedImage = null;
        }
    }

    this.start = function(){
        canvas.addEventListener('mousedown', mousedown, false);
        canvas.addEventListener('mousemove', mousemove, false);
        canvas.addEventListener('mouseup', mouseup, false);

        beforeActivatingRegionCanvasImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //var that = this;
        //function runTest(){
        //    var start;
        //    var find;
        //    var end;
        //    var diff = 0;
        //    var center = 0;
        //    var i = 1;
        //
        //    var id = setInterval(function(){
        //
        //        start = +new Date();
        //        find = that.searchPoints(100, 100, beforeActivatingRegionCanvasImageData, canvas.width, canvas.height);
        //        end =  +new Date();
        //        diff = end - start;
        //
        //        center += diff;
        //
        //        console.log('TIME: ', diff, 'CENTER: ', parseInt(center/i++, 10));
        //
        //        if (i == 30){
        //            clearInterval(id);
        //        }
        //    }, 500);
        //}
        //runTest();
        
    };
    this.stop = function(){
        canvas.removeEventListener('mousedown', mousedown);
        canvas.removeEventListener('mousemove', mousemove);
        canvas.removeEventListener('mouseup', mouseup);
    };
}

RegionTool.prototype = Object.create(Tool);
RegionTool.prototype.constructor = RegionTool;

/**
 * Метод поиска фигуры по координате (Поиск осуществляется либо по цвету, либо по слоям)
 * @param {number} x — Координата X
 * @param {number} y — Координата Y
 * @return {RegionObject} объект фигуры
 */
RegionTool.prototype.createRegionByPointAtCanvas = function(x, y, canvas){
    var start = +new Date();
    var result = this._searchPoints(x, y, canvas);

    var findCoordinates = result[0];
    var etalonPointImageData = result[1];
    var borderCoordinates = result[2];

    var end =  +new Date();
    var diff = end - start;
    console.log('TIME: ', diff);

    return new RegionObject({
        coordinates: findCoordinates,
        borderCoordinates: borderCoordinates,
        etalonPointImageData: etalonPointImageData
    });
};

/**
 * Имитация переноса.
 * Перерисовывает на холсте фейковое изображение на заданные отступы.
 * @param {RegionObject} regionObject — регион
 * @param {ImageData} imageData — данные холста без переносимой композиции
 * */
RegionTool.prototype._redrawRegion = function (regionObject, imageData){
    var layoutCanvas = regionObject.layoutCanvas;
    var ctx = this.canvas.getContext('2d');

    // очищаем холст
    ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

    // возвращаем в исходное состояние до переноса но уже без самого региона
    ctx.putImageData(imageData, 0, 0);

    // кладем буфер региона на холст добавляя смещение
    ctx.drawImage(layoutCanvas, regionObject.offsetX, regionObject.offsetY);

    document.body.appendChild(layoutCanvas);
};

RegionTool.prototype.addRegion = function(regionObject){
    this.regions.push(regionObject);
};

// сделать мерже, который бы не перебивал прозрачными пикселями
RegionTool.prototype.mergeCanvasToCanvas = function(){}