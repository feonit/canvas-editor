!function(CanvasEditor){
    CanvasEditor.namespace('CanvasEditor.Tool').DraggingTool = DraggingTool;

    /**
     * @class DraggingTool
     * @memberof CanvasEditor.Tool
     * @param {CanvasEditor} appInstance
     * @param {HTMLCanvasElement} canvas — канвас
     * @arg searchMode — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo
     * */
    function DraggingTool(appInstance, canvas){
        Object.defineProperty(this, 'appInstance', {value: appInstance});
        Object.defineProperty(this, 'canvas', {value: canvas});

        /**
         * Координата начала переноса
         * @type {number[]}
         * */
        this.coordinateStart = [];

        /**
         * Исходное смещение региона до начала переноса
         * @type {number[]}
         * */
        this.firstOffset = [];

        /**
         * Текущий переносимый регион
         * @type {RegionObject}
         * */
        this.selectedRegionObject = null;

        /**
         * Определяет начало и конец переноса
         * @type {boolean}
         * */
        this.processing = false;

        /**
         * Определяет был ли перенос
         * @type {boolean}
         * */
        this.moved = false;
    }

    DraggingTool.prototype.draggingStart = function(x, y){
        // если не выделен, выделяем
        if (!this.selectedRegionObject){

            // пробуем найти объект
            var regionObject = this.appInstance.layersManager.searchRegionByCoordinate(x, y);

            // все таки там пусто
            if (!regionObject)
                return;

            this.selectedRegionObject = regionObject;
        }

        // 1 активизируем
        this.appInstance.layersManager.drawActivateRegion(this.selectedRegionObject);

        // 2 поднять объект
        this.appInstance.layersManager.drawToTopRegion(this.selectedRegionObject);

        // начало процесса перемещения
        this.processing = true;
        this.moved = false;

        // запоминаем начальную координату
        this.coordinateStart = [x, y];

        // запоминаем исходное смещение объекта
        this.firstOffset[0] = this.selectedRegionObject.offset[0];
        this.firstOffset[1] = this.selectedRegionObject.offset[1];
    };

    DraggingTool.prototype.draggingContinue = function(x, y){
        if (this.processing){
            this.selectedRegionObject.offset[0] = this.firstOffset[0] + x - this.coordinateStart[0];
            this.selectedRegionObject.offset[1] = this.firstOffset[1] + y - this.coordinateStart[1];
            this.appInstance.layersManager.redrawLayers();
            this.moved = true;
        }
    };

    DraggingTool.prototype.draggingEnd = function(x, y){
        if (this.processing){

            // 1 деактивизируем
            this.appInstance.layersManager.drawDeactivateRegion(this.selectedRegionObject);

            // 2
            this.appInstance.layersManager.redrawLayers();

            // 3 save final offset
            if (this.moved){
                this.appInstance.layersManager.applyOtherOffset(this.selectedRegionObject);
            }

            // заканчиваем процесс
            this.processing = false;

            // сброс данных
            this.selectedRegionObject = null;
        }
    };

    DraggingTool.prototype.removeSelection = function(){
        var ctx = this.canvas.getContext('2d');
        // если не пусто, значит какой то объект выделен
        if (this.selectedRegionObject){
            // убираем выделение путем восстанавления первоначального состояния
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.selectedRegionObject = null;
        }
    };

    return DraggingTool;
}(CanvasEditor);