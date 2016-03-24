!function(APP){
    APP.namespace('APP.tools');
    /**
     * @class DraggingTool
     * @memberof APP.tools
     * @param {CanvasEditor} appInstance
     * @param {HTMLCanvasElement} canvas — канвас
     * @arg searchMode — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo
     * */
    APP.tools.DraggingTool = function (appInstance, canvas){
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
         * @type {LayerObject}
         * */
        this.selectedLayerObject = null;

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
    };

    APP.tools.DraggingTool.prototype = {
        constructor: APP.tools.DraggingTool,
        draggingStart : function(x, y){
            // если не выделен, выделяем
            if (!this.selectedLayerObject){

                // пробуем найти объект
                var layerObject = this.appInstance.regionManager.searchRegionByCoordinate(x, y);

                // все таки там пусто
                if (!layerObject)
                    return;

                this.selectedLayerObject = layerObject;
            }

            // 1 активизируем
            this.appInstance.regionManager.drawActivateRegion(this.selectedLayerObject);

            // 2 поднять объект
            this.appInstance.regionManager.drawToTopRegion(this.selectedLayerObject);

            // начало процесса перемещения
            this.processing = true;
            this.moved = false;

            // запоминаем начальную координату
            this.coordinateStart = [x, y];

            // запоминаем исходное смещение объекта
            this.firstOffset[0] = this.selectedLayerObject.offsetHistory.currentOffset[0];
            this.firstOffset[1] = this.selectedLayerObject.offsetHistory.currentOffset[1];
        },

        draggingContinue : function(x, y){
            if (this.processing){
                this.selectedLayerObject.offsetHistory.currentOffset[0] = this.firstOffset[0] + x - this.coordinateStart[0];
                this.selectedLayerObject.offsetHistory.currentOffset[1] = this.firstOffset[1] + y - this.coordinateStart[1];
                this.appInstance.regionManager.redrawLayers();
                this.moved = true;
            }
        },

        draggingEnd : function(x, y){
            if (this.processing){

                // 1 деактивизируем
                this.appInstance.regionManager.drawDeactivateRegion(this.selectedLayerObject);

                // 2
                this.appInstance.regionManager.redrawLayers();

                // 3 save final offset
                if (this.moved){
                    this.appInstance.regionManager.applyOtherOffset(this.selectedLayerObject);
                }

                // заканчиваем процесс
                this.processing = false;

                // сброс данных
                this.selectedLayerObject = null;
            }
        },

        removeSelection : function(){
            var ctx = this.canvas.getContext('2d');
            // если не пусто, значит какой то объект выделен
            if (this.selectedLayerObject){
                // убираем выделение путем восстанавления первоначального состояния
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.selectedLayerObject = null;
            }
        }
    }
}(APP);