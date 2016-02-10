/**
 * @class DraggingTool
 * @param {HTMLCanvasElement} canvas — канвас
 * @arg searchMode — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo
 * */
function DraggingTool(canvas){

    this.canvas = canvas;

    /** @type {ImageData} данные холста до переноса */
    this.beforeDndDataImage = null;

    /** @type {number} */
    this.dndStartPositionX = null;

    /** @type {number} */
    this.dndStartPositionY = null;

    /** @type {number} */
    this.offsetXBeforeDnd = null;

    /** @type {number} */
    this.offsetYBeforeDnd = null;

    /**
     * Текущий переносимый регион
     * */
    this.selectedRegionObject = null;

    var that = this;

    var ctx = canvas.getContext('2d');

    // объявляет начало и конец переноса
    var processDnD = false;

    function mousedown(event){

        // выделяем объект левой
        if (event.which == 1){

            // возьмем за правило, что если выделяемый пиксель имеет цвет фона холста ( прозрачный по дефолту ) то сбрасываем событие
            var data = ctx.getImageData(event.layerX, event.layerY, 1, 1).data;
            if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 0){
                return false;
            }

            // если не выделен, выделяем
            if (!that.selectedRegionObject){

                 //пробуем найти регион по индексовой карте (поиск по слою)
                that.selectedRegionObject = layersManager._getRegionByPx(event.layerX, event.layerY);

                // пробуем найти регион волшебной палочкой (поиск по цвету)
                //selectedRegionObject = RegionObject.createRegion(event.layerX, event.layerY, canvas);

                // стереть объект
                layersManager.removeRegion(that.selectedRegionObject);

                // запомнить как выглядит канвас без объекта
                that.beforeDndDataImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

                that._drawLayout();
            }

            // начало процесса перемещения
            processDnD = true;

            // запоминаем исходную позицию
            that.offsetXBeforeDnd = 0;
            that.offsetYBeforeDnd = 0;

            that.dndStartPositionX = event.layerX;
            that.dndStartPositionY = event.layerY;
            that.offsetXBeforeDnd = that.selectedRegionObject.offsetX;
            that.offsetYBeforeDnd = that.selectedRegionObject.offsetY;

        }// снимаем выделение средней и правой кнопкой
        else if (event.which == 2 || event.which == 3){

            // если не пусто, значит какой то объект выделен
            if (that.selectedRegionObject){

                // убираем выделение путем восстанавления первоначального состояния
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                that.selectedRegionObject = null;
            }
        }
    }

    function mousemove(event){
        if (processDnD){

            that.selectedRegionObject.offsetX = that.offsetXBeforeDnd + event.layerX - that.dndStartPositionX;
            that.selectedRegionObject.offsetY = that.offsetYBeforeDnd + event.layerY - that.dndStartPositionY;

            that._drawLayout();
        }
    }

    function mouseup(event){
        if (processDnD){

            that.selectedRegionObject.offsetX = that.offsetXBeforeDnd + event.layerX - that.dndStartPositionX;
            that.selectedRegionObject.offsetY = that.offsetYBeforeDnd + event.layerY - that.dndStartPositionY;

            that._drawLayout();

            //layersManager.removeRegion(that.selectedRegionObject);

            // save final offset
            that.selectedRegionObject.saveRecordOffset();

            // затем добавляем запись как о новом регионе
            layersManager.addRegion(that.selectedRegionObject);

            // заканчиваем процесс
            processDnD = false;

            // сброс данных
            that.selectedRegionObject = null;
            that.beforeDndDataImage = null;
        }
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
    };
}

DraggingTool.prototype = Object.create(Tool);
DraggingTool.prototype.constructor = DraggingTool;


/**
 * Имитация переноса.
 * Перерисовывает на холсте фейковое изображение на заданные отступы.
 * */
DraggingTool.prototype._drawLayout = function (){
    var ctx = this.canvas.getContext('2d');

    // очищаем холст
    ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

    // возвращаем в исходное состояние до переноса но уже без самого региона
    ctx.putImageData(this.beforeDndDataImage, 0, 0);

    // кладем буфер региона на холст добавляя смещение
    ctx.drawImage(this.selectedRegionObject.getLayout(), this.selectedRegionObject.offsetX, this.selectedRegionObject.offsetY);
};