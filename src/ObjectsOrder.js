!function(APP) {
    APP.namespace('APP.core');
    /**
     * Класс представляет собой коллекцию объектов в определенной последовательности и 
     * предоставляет методы по работе с ней
     * @class
     * @memberof APP.core
     * @param {Object} [options] — опции
     * @param {Object[]} options.order — список идентификаторов объектов
     * */
    APP.core.ObjectsOrder = function(options){
        options = options || {};

        /**
         * @prop {number[]} order Список идентификаторов объектов
         * */
        this.order = options.order || [];

        this.arrows = [];
        this.background = [];
        this.curves = [];
        this.ellipses = [];
        this.lines = [];
        this.rects = [];
        this.rasters = [];
        this.broken = [];

        var that = this;

        Object.defineProperty(this, '_objects', {
            value: {},
            enumerable: false,
            writable: true
        });

        var obj;
        //todo background первый! так как индекс 0
        if (options.background){
            options.background.forEach(function(options){
                obj = new APP.objects.LayerBackground(options);
                that.background.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.arrows){
            options.arrows.forEach(function(options){
                obj = new APP.objects.ArrowSimpleVectorAbstract(options);
                that.arrows.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.curves){
            options.curves.forEach(function(options){
                obj = new APP.objects.CurveComplexVectorAbstract(options);
                that.curves.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.ellipses){
            options.ellipses.forEach(function(options){
                obj = new APP.objects.EllipseSimpleVectorAbstract(options);
                that.ellipses.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.lines){
            options.lines.forEach(function(options){
                obj = new APP.objects.LineSimpleVectorAbstract(options);
                that.lines.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.rects){
            options.rects.forEach(function(options){
                obj = new APP.objects.RectangleSimpleVectorAbstract(options);
                that.rects.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.rasters){
            options.rasters.forEach(function(options){
                obj = new APP.objects.SimpleRaster(options);
                that.rasters.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.broken){
            options.broken.forEach(function(options){
                obj = new APP.objects.BrokenComplexVector(options);
                that.broken.push(obj);
                that._objects[obj.id] = obj;
            });
        }
    };

    /** @lends ObjectsOrder.prototype */
    APP.core.ObjectsOrder.prototype = {
        constructor: APP.core.ObjectsOrder,
        /**
         * Добавить объект в конец
         * @param {LayerObject} obj — объект
         * */
        addObject : function(obj){

            switch (obj.constructor){
                case APP.objects.ArrowSimpleVectorAbstract:
                    this.arrows.push(obj); break;

                case APP.objects.LayerBackground:
                    this.background.push(obj); break;

                case APP.objects.CurveComplexVectorAbstract:
                    this.curves.push(obj); break;

                case APP.objects.EllipseSimpleVectorAbstract:
                    this.ellipses.push(obj); break;

                case APP.objects.LineSimpleVectorAbstract:
                    this.lines.push(obj); break;

                case APP.objects.RectangleSimpleVectorAbstract:
                    this.rects.push(obj); break;

                case APP.objects.SimpleRaster:
                    this.rasters.push(obj); break;

                case APP.objects.BrokenComplexVector:
                    this.broken.push(obj); break;

                default:
                    throw 'Не опознанная фигура'
            }

            this._objects[obj.id] = obj;

            this.order.push(obj.id);
        },
        /**
         * Найти и удалить объект из списка
         * @param {LayerObject} obj — объект
         * @return {boolean} false, если объект не найден
         * */
        removeObject : function(obj){
            var index = this.order.indexOf(obj.id);
            var subIndex;
            switch (obj.constructor){
                case APP.objects.ArrowSimpleVectorAbstract:
                    subIndex = this.arrows.indexOf(obj);
                    subIndex > 0 && this.arrows.splice(subIndex, 1); break;

                case APP.objects.LayerBackground:
                    subIndex = this.background.indexOf(obj);
                    subIndex > 0 && this.background.splice(subIndex, 1); break;

                case APP.objects.CurveComplexVectorAbstract:
                    subIndex = this.curves.indexOf(obj);
                    subIndex > 0 && this.curves.splice(subIndex, 1); break;

                case APP.objects.EllipseSimpleVectorAbstract:
                    subIndex = this.ellipses.indexOf(obj);
                    subIndex > 0 && this.ellipses.splice(subIndex, 1); break;

                case APP.objects.LineSimpleVectorAbstract:
                    subIndex = this.lines.indexOf(obj);
                    subIndex > 0 && this.lines.splice(subIndex, 1); break;

                case APP.objects.RectangleSimpleVectorAbstract:
                    subIndex = this.rects.indexOf(obj);
                    subIndex > 0 && this.rects.splice(subIndex, 1); break;

                case APP.objects.RasterLayer:
                    subIndex = this.rasters.indexOf(obj);
                    subIndex > 0 && this.rasters.splice(subIndex, 1); break;

                case APP.objects.BrokenComplexVector:
                    subIndex = this.broken.indexOf(obj);
                    subIndex > 0 && this.broken.splice(subIndex, 1); break;

                default:
                    throw 'Не опознанная фигура'
            }

            delete this._objects[obj.id];

            return (index !== -1) && !!this.order.splice(index, 1).length;
        },
        /**
         * Получить по индексу
         * @param {number} index — индекс обекта
         * @return {LayerObject}
         * */
        getObjectByIndex : function(index){
            return this._objects[this.order[index]];
        },
        /**
         * Получить индекс определенного объекта
         * @param {LayerObject} obj — объект
         * @return {number} индекс объекта
         * */
        getIndex : function(obj){
            var obj = this._objects[obj.id];
            return obj ? this.order.indexOf(obj.id) : false;
        },
        /**
         * Переместить объект в конец списка
         * @param {LayerObject} obj — объект
         * @return {boolean} true, если объект успешно перемещен
         * */
        moveToTop : function(obj){
            // поменять с последним
            var indexOfLast = this.order.length - 1;
            var indexOfCurrent = this.order.indexOf(obj.id);

            if (indexOfCurrent !== -1){
                // уже находится в конце
                if (indexOfLast === indexOfCurrent ){
                    return false;
                }
                // вытащить из последовательности
                this.order.splice(indexOfCurrent, 1);
                // а после, добавить в конец
                this.order.push(obj.id);

                return true;
            }
            return false;
        },
        /**
         * Получить коллекцию обхектов
         * @return {LayerObject[]}
         **/
        getObjects : function(){
            var that = this;
            return this.order.map(function(id){
                return that._objects[id];
            });
        }
    }
}(APP);
