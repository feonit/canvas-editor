//namespace('CanvasEditor.tools');

!function(CanvasEditor){
    //used layersManager

    CanvasEditor.namespace('CanvasEditor.Tool').DraggingTool = DraggingTool;

    /**
     * @class DraggingTool
     * @memberof CanvasEditor.Tool
     * @param {CanvasEditor} appInstance
     * @param {HTMLCanvasElement} canvas — канвас
     * @arg searchMode — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo
     * */
    function DraggingTool(appInstance, canvas){

        this.appInstance = appInstance;
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

        // объявляет начало и конец переноса
        this.processDnD = false;
    }

    DraggingTool.prototype.draggingStart = function(x, y){
        // если не выделен, выделяем
        if (!this.selectedRegionObject){

            // берем объект
            this.selectedRegionObject = this.appInstance.layersManager.searchRegionByCoordinate(x, y);

            // активизируем
            this.selectedRegionObject.activate(canvas);

            // стереть объект
            this.appInstance.layersManager.removeRegion(this.selectedRegionObject);//?????

            // запомнить как выглядит канвас без объекта
            this.beforeDndDataImage = this.canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

            this._drawLayout();
        }

        // начало процесса перемещения
        this.processDnD = true;

        // запоминаем исходную позицию
        this.offsetXBeforeDnd = 0;
        this.offsetYBeforeDnd = 0;

        this.dndStartPositionX = x;
        this.dndStartPositionY = y;
        this.offsetXBeforeDnd = this.selectedRegionObject.offsetX;
        this.offsetYBeforeDnd = this.selectedRegionObject.offsetY;
    };

    DraggingTool.prototype.draggingContinue = function(x, y){
        if (this.processDnD){
            this.selectedRegionObject.offsetX = this.offsetXBeforeDnd + x - this.dndStartPositionX;
            this.selectedRegionObject.offsetY = this.offsetYBeforeDnd + y - this.dndStartPositionY;
            this._drawLayout();
        }
    };
    DraggingTool.prototype.draggingEnd = function(x, y){
        if (this.processDnD){
            this.selectedRegionObject.deactivate();

            // save final offset
            this.selectedRegionObject.saveRecordOffset();

            // затем добавляем запись как о новом регионе
            this.appInstance.layersManager.addRegion(this.selectedRegionObject);

            // заканчиваем процесс
            this.processDnD = false;

            // сброс данных
            this.selectedRegionObject = null;
            this.beforeDndDataImage = null;
        }
    };

    DraggingTool.prototype.removeSelection = function(){
        var ctx = this.canvas.getContext('2d');
        // если не пусто, значит какой то объект выделен
        if (this.selectedRegionObject){
            // убираем выделение путем восстанавления первоначального состояния
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.selectedRegionObject = null;
        }
    };

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

        this.appInstance.layersManager.drawRegion(this.selectedRegionObject);
    };

    return DraggingTool;
}(CanvasEditor);