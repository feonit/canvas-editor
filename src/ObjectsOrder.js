!function(CanvasEditor) {

    CanvasEditor.namespace('CanvasEditor').ObjectsOrder = ObjectsOrder;

    /**
     * Класс хранит в себе последовательность объектов, и предоставляет методы по работе с ней
     * @param {Object} options
     * @param {Object[]} options.order
     * */
    function ObjectsOrder(options){
        options = options || {};

        /**
         * Список объектов
         * */
        this.order = [];

        if (options.order){
            var that = this;
            options.order.forEach(function(arg){
                that.addObject(new CanvasEditor.RegionObject(arg['RegionObject']));
            })
        }

    }

    /**
     * Добавить объект в конец
     * @param {Object} obj
     * */
    ObjectsOrder.prototype.addObject = function(obj){
        return this.order.push(obj);
    };

    /**
     * Передать по индексу
     * */
    ObjectsOrder.prototype.getObject = function(index){
        return this.order[index];
    };

    /**
     * Определить индекс
     * */
    ObjectsOrder.prototype.getIndex = function(obj){
        var index = this.order.indexOf(obj);
        return index == -1 ? false : index;
    };

    /**
     * Найти и удалить объект из списка
     * @param {Object} obj
     * */
    ObjectsOrder.prototype.removeObject = function(obj){
        var index = this.order.indexOf(obj);
        return (index !== -1) && this.order.splice(index, 1);
    };

    /**
     * Переместить объект в конец списка
     * @param {Object} obj
     * */
    ObjectsOrder.prototype.moveToTop = function(obj){
        // поменять с последним
        var indexOfLast = this.order.length - 1;
        var indexOfCurrent = this.order.indexOf(obj);

        if (indexOfCurrent !== -1){

            if (indexOfLast === indexOfCurrent ){
                return false;
            }

            // вытащить из последовательности
            this.order.splice(indexOfCurrent, 1);

            // а после, добавить в конец
            this.order.push(obj);

            return true;
        }
        return false;
    };

    ObjectsOrder.prototype.getObjects = function(obj){
        return this.order;
    };

}(CanvasEditor);