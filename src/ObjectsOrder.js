!function(APP) {
    APP.namespace('APP');
    var RegionObject = APP.RegionObject;
    /**
     * Класс представляет собой коллекцию объектов в определенной последовательности и 
     * предоставляет методы по работе с ней
     * @class
     * @param {Object} [options] — опции
     * @param {Object[]} options.objects — коллекция объектов
     * */
    APP.ObjectsOrder = function(options){
        options = options || {};

        /**
         * @prop {RegionObject[]} objects Список объектов
         * */
        this.objects = [];

        if (options.objects){
            var that = this;
            options.objects.forEach(function(arg){
                that.addObject(new RegionObject(arg['RegionObject']));
            })
        }
    };

    /** @lends ObjectsOrder.prototype */
    APP.ObjectsOrder.prototype = {
        constructor: APP.ObjectsOrder,
        /**
         * Добавить объект в конец
         * @param {RegionObject} obj — объект
         * */
        addObject : function(obj){
            this.objects.push(obj);
        },
        /**
         * Получить по индексу
         * @param {number} index — индекс обекта
         * @return {RegionObject}
         * */
        getObject : function(index){
            return this.objects[index];
        },
        /**
         * Получить индекс определенного объекта
         * @param {RegionObject} obj — объект
         * @return {number} индекс объекта
         * */
        getIndex : function(obj){
            var index = this.objects.indexOf(obj);
            return index == -1 ? false : index;
        },
        /**
         * Найти и удалить объект из списка
         * @param {RegionObject} obj — объект
         * @return {boolean} false, если объект не найден
         * */
        removeObject : function(obj){
            var index = this.objects.indexOf(obj);
            return (index !== -1) && !!this.objects.splice(index, 1).length;
        },
        /**
         * Переместить объект в конец списка
         * @param {RegionObject} obj — объект
         * @return {boolean} true, если объект успешно перемещен
         * */
        moveToTop : function(obj){
            // поменять с последним
            var indexOfLast = this.objects.length - 1;
            var indexOfCurrent = this.objects.indexOf(obj);

            if (indexOfCurrent !== -1){
                // уже находится в конце
                if (indexOfLast === indexOfCurrent ){
                    return false;
                }
                // вытащить из последовательности
                this.objects.splice(indexOfCurrent, 1);
                // а после, добавить в конец
                this.objects.push(obj);

                return true;
            }
            return false;
        },
        /**
         * Получить коллекцию обхектов
         * @return {RegionObject[]}
         **/
        getObjects : function(){
            return this.objects;
        }
    }
}(APP);
