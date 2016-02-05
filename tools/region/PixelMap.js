/**
 * Объект Карта отвечает за информацию по соотношению каждого пикселя из карты к группе слоев
 * накладываемых друг на друга в определенном порядке
 * @param {number} width — Длина холста
 * @param {number} height — Высота холста
 * */
function PixelMap(width, height){

    /**
     * Каждый новый слой имеет свой номер, который инкрементируется начиная с дефолтового значения
     * @type {number}
     * */
    this._INDEX_DEFAULT = 0;

    /**
     * Номер последнего слоя
     * @type {number}
     * */
    this._currentIndex = this._INDEX_DEFAULT;

    /**
     * Кол-во пикселей по горизонтали
     * @type {number}
     * */
    this._width = width;

    /**
     * Кол-во пикселей по вертикали
     * @type {number}
     * */
    this._height = height;

    /**
     * Карта отображения координаты пикселя в порядок слоев расположенных на нем
     * @type {Object}
     * */
    this._map = {};

    /**
     * Список слоев по номерам
     * @type {Object}
     * */
    this._regions = {};

    // инициализация карты
    //this._resetMap();
}

/**
 * Метод для записи региона в карту пикселей
 * так как это новый регион, то индекс его становится выше всех, и его соответственно видно поверх всех
 * @param {RegionObject} regionObject
 * */
PixelMap.prototype.addRegion = function(regionObject){
    // не забыть про смещение
    var offsetX = regionObject.offsetX;
    var offsetY = regionObject.offsetY;

    var newIndex = ++this._currentIndex;
    var coordinates = regionObject.coordinates;
    var coordinate;
    var coordinateX;
    var coordinateY;
    if (regionObject.coordinates){
        for (var i = 0, len = regionObject.coordinates.length; i < len; i += 1){
            coordinate = coordinates[i];
            coordinateX = coordinates[i][0];
            coordinateY = coordinates[i][1];

            this._addRecord(coordinateX + offsetX, coordinateY + offsetY, newIndex);
        }
    }
    this._regions[newIndex] = regionObject;
};

/**
 * Метод поиска региона по карте пикселей с определенной координатой
 * @param {number} x — Координата X
 * @param {number} y — Координата Y
 * */
PixelMap.prototype.getRegionByPx = function(x, y){
    if (this._map[x] && this._map[x][y] ){
        var history = this._map[x][y];
        var lastRecordIndex = history.length - 1;

        return this._regions[history[lastRecordIndex]];
    }
};

/**
 * Метод удаления информации о регионе из карты пикселей и порядка слоев на них
 * старый индекс региона удаляется изо всех точек, история будет потеряна
 * @param {RegionObject} regionObject
 * */
PixelMap.prototype.removeRegion = function(regionObject){

    // подчищаем связь пиксела и индекса
    var record = this._findIndexOfRegion(regionObject);

    // из истории каждого пиксела убираем этот индекс
    this._removeRecordFromMap(record);

    // незабываем подчистить связь региона и индекса
    delete this._regions[record];
};

/**
 * Определение номера региона
 * @param {RegionObject} regionObject
 * */
PixelMap.prototype._findIndexOfRegion = function(regionObject){
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
 * */
PixelMap.prototype._addRecord = function(coordinateX, coordinateY, record){
    //console.log(coordinateX, coordinateY, record)
    if (!this._map[coordinateX])
        this._map[coordinateX] = {};

    if (!this._map[coordinateX][coordinateY]){
        this._map[coordinateX][coordinateY] = []; // <- история индексов для пиксела
    }

    this._map[coordinateX][coordinateY].push(record);
};

PixelMap.prototype._removeRecordFromMap = function(record){
    var map = this._map;
    var historyIndexArr;

    var recordIndex;

    var mapKeyX;

    for (var keyX in map){
        mapKeyX = map[keyX];

        for (var keyY in mapKeyX){
            historyIndexArr = mapKeyX[keyY];

            if (historyIndexArr){
                recordIndex = historyIndexArr.indexOf(record);

                if (recordIndex !== -1){
                    historyIndexArr.splice(recordIndex, 1);
                }
            } else {
                throw '';
            }
        }
    }


}