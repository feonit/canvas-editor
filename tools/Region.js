/**
 * @class RegionManager
 * @param {Object} options — опции
 * @arg searchMode — Режим поиска фигуры по цвету или по слоям (COLOR_MODE or LAYER_MODE) todo
 * */
function RegionManager(options){

}
/**
 * Метод поиска фигуры по координате (Поиск осуществляется либо по цвету, либо по слоям)
 * @lends RegionManager.prototype
 * @param {Number} x — Координата X
 * @param {Number} y — Координата Y
 * @return {Region} объект фигуры
 */
RegionManager.prototype.createRegionByPoint = function(x, y){

    /**
     * @function Способ поиска области фигуры по координате в режиме поиска по цвету
     * К области фигуры относится та соседняя точка относительно найденной по координате, которая имеет тот же цвет
     * @arg Координаты точки
     * @return
     * */

    /**
     * @function Способ поиска области фигуры по координате в режиме поиска по слоям
     * К области фигуры относится та соседняя точка относительно найденной по координате, которая имеет тот же индекс
     * @arg Координаты точки
     * @return
     * */
};

/**
 * Метод стирающий регион с холста
 * @param {Region} region — регион
 * @param {HTMLCanvasElement} canvas — холст
 * */
RegionManager.prototype.removeRegionFromCanvas = function(region, canvas){};

/**
 * Метод отрисовки региона на холсте
 * @param {Region} region — регион
 * @param {HTMLCanvasElement} canvas — холст
 * */
RegionManager.prototype.renderRegionToCanvas = function(region, canvas){};

/**
 * @class Region Регион
 * @param {Number} coordinateX — Координата X определяет позицию опорной точки региона относительно холста
 * @param {Number} coordinateY — Координата Y определяет позицию опорной точки региона относительно холста
 * @param {Array} points Массив точек, относительно основной точки региона (Они должны полностью определять замкнутую фигуру)
 *
 * @arg {Boolean} isFocused — активный/не активный регион, подцвечен или нет
 * */

function Region(coordinateX, coordinateY, points){
    /**
     * функция сканирования массива точек на предмет определения ими замкнутой фигуры региона
     * @lends Region.prototype
     *
     * Замкнутая фигура - замкнутый набор точек, та, которая не имеет независимых, свободных точек
     * */
}

/**
 * Метод перемещения региона на канвасе, меняет позицию опорной точки
 * @lends Region.prototype
 *
 * @param {Number} y — смещение X
 * @param {Number} x — смещение Y
 * */
Region.prototype.setCoordinates = function(x, y){};


/**
 * Метод создания подцветки для региона
 * @lends Region.prototype
 *
 * @param Фигура или набор точек
 * @param Холст
 *
 * цвет выделения
 * другие параметры выделения/подцвечивания
 *
 * Метод удаления обводки с фигуры (самоудаление)
 *
 * 1/Алгоритм поиска всех точек находящихся на периметре фигуры
 * 2/Метод Окрашивание всех найденных точек в какой-либо цвет
 * 3/Метод получения всех точек периметра
 *
 * регистр точек
 * цвет
 *
 * @return объект Обводка
 * */

Region.prototype.addStroke = function(){
    /**
     * Алгоритм поиска всех точек находящихся на периметре региона
     * @param Фигура[массив точек]
     * @return массив точек периметра
     *
     * Найти любую точку, не имеющую хотя бы с одной стороны соприкасающуюся точку
     * Найти соседнюю точку, также не имеющую соприкосающуюся
     * */
};

/**
 * Метод удаления подцветки
 * */
Region.prototype.removeStroke = function(){};


/**
 * Метод перемещения
 * */