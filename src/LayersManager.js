!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').LayersManager = LayersManager;

    /**
     * @class LayersManager
     * @memberof CanvasEditor
     * @param appInstance
     * @param {HTMLCanvasElement} canvas
     * */
    function LayersManager(appInstance, canvas){

        this.canvas = canvas;

        /**
         * Каждый новый слой имеет свой номер, который инкрементируется начиная с дефолтового значения
         * @type {number}
         * */
        this._INDEX_DEFAULT = 0;

        /**
         * Объект Карта отвечает за информацию по соотношению каждого пикселя из карты к группе слоев
         * накладываемых друг на друга в определенном порядке
         * Карта отображения координаты пикселя в порядок слоев расположенных на нем
         * @type {Object}
         * */
        this._map = {};

        /**
         * Номер последнего слоя
         * @type {number}
         * */
        this._currentIndex = this._INDEX_DEFAULT;

        /**
         * Список слоев по номерам
         * @type {Object}
         * */
        this._regions = {};
    }

    /**
     * Метод для записи региона в карту пикселей
     * так как это новый регион, то индекс его становится выше всех, и его соответственно видно поверх всех
     * @param {CanvasEditor.RegionObject} regionObject
     * */
    LayersManager.prototype.addRegion = function(regionObject){
        // не забыть про смещение
        var offsetX = regionObject.offsetX;
        var offsetY = regionObject.offsetY;

        var newIndex = ++this._currentIndex;
        var coordinates = regionObject.getOriginalCoordinates();
        var coordinate;
        var coordinateX;
        var coordinateY;
        if (coordinates.length){
            for (var i = 0, len = coordinates.length; i < len; i += 1){
                coordinate = coordinates[i];
                coordinateX = coordinates[i][0];
                coordinateY = coordinates[i][1];

                this._addRecord(coordinateX + offsetX, coordinateY + offsetY, newIndex);
            }
        }
        this._regions[newIndex] = regionObject;
    };

    /**
     * Удаляет регион с холста
     * Отрисовывает те слои которые распологаются под ним
     * @param {CanvasEditor.RegionObject} removedRegion
     * */
    LayersManager.prototype.removeRegion = function(removedRegion){
        var relationCoordinates = removedRegion.getRelationCoordinate();
        var removedRegionIndex = this._findIndexOfRegion(removedRegion);
        var coordinate;
        var coordinateX;
        var coordinateY;

        // отсортировать каждый пиксел области по индексу слоя
        var sort = {};

        var ctx = this.canvas.getContext('2d');

        // незабываем подчистить связь региона и индекса
        delete this._regions[removedRegionIndex];

        for (var i = 0, len = relationCoordinates.length; i < len; i++){
            coordinate = relationCoordinates[i];
            coordinateX = coordinate[0];
            coordinateY = coordinate[1];

            // для каждого пиксела удаляем запись об удаляемом регионе
            this._removeRecord(coordinateX, coordinateY, removedRegionIndex);

            // находим последний регион для этого пиксела
            var region = this._getRegionByPx(coordinateX, coordinateY);

            if (region){
                var index = this._findIndexOfRegion(region);

                if (!sort[index]) sort[index] = [];

                sort[index].push(coordinate);

                ctx.clearRect(coordinateX, coordinateY, 1, 1); // -1 смещение

            } else {
                ctx.clearRect(coordinateX, coordinateY, 1, 1); // -1 смещение
            }

        }

        for( var key in sort){
            region = this._regions[key];
            relationCoordinates = sort[key];
            region.drawPixelsAtCanvas(this.canvas, relationCoordinates);
        }
    };

    /**
     * Метод поиска региона по карте пикселей с определенной координатой
     * @param {number} x — Координата X
     * @param {number} y — Координата Y
     * @param {number} [offset=0] — Смещение по истории
     * */
    LayersManager.prototype._getRegionByPx = function(x, y, offset){
        offset = offset || 0;
        if (this._map[x] && this._map[x][y] ){
            var history = this._map[x][y];
            var lastRecordIndex = history.length - 1 + offset;

            return this._regions[history[lastRecordIndex]];
        }
    };

    /**
     * Определение номера региона
     * @param {CanvasEditor.RegionObject} regionObject
     * */
    LayersManager.prototype._findIndexOfRegion = function(regionObject){
        var index;

        for (var key in this._regions){
            if (this._regions[key] === regionObject){
                index = parseInt(key, 10);
            }
        }

        return index;
    };

    /**
     * Метод пополнения карты новыми данными
     * @param {number} x — Координата X
     * @param {number} y — Координата Y
     * @param {number} record — индекс
     * */
    LayersManager.prototype._addRecord = function(x, y, record){
        //console.log(coordinateX, coordinateY, record)
        if (!this._map[x])
            this._map[x] = {};

        if (!this._map[x][y]){
            this._map[x][y] = []; // <- история индексов для пиксела
        }

        this._map[x][y].push(record);
    };

    /**
     * Метод удаления данных из карты
     * */
    LayersManager.prototype._removeRecord = function(x, y, record){
        if ( this._map[x] && this._map[x][y] ){
            var index = this._map[x][y].indexOf(record);
            if (index !== -1){
                var removedRecord = this._map[x][y].splice(index, 1)[0];
            }
        }

        return removedRecord;
    };

    LayersManager.prototype.dropLayersData = function(){
        this._regions = {};
        this._map = {};
        this._currentIndex = this._INDEX_DEFAULT;
    };

    return LayersManager;

}(CanvasEditor);