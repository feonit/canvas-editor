!function(APP) {
    APP.namespace('APP');
    var RegionObject = APP.RegionObject;
    /**
     * Класс представляет собой коллекцию объектов в определенной последовательности и 
     * предоставляет методы по работе с ней
     * @class
     * @param {Object} [options] — опции
     * @param {Object[]} options.order — список идентификаторов объектов
     * */
    APP.ObjectsOrder = function(options){
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

        var that = this;

        Object.defineProperty(this, '_objects', {
            value: {},
            enumerable: false,
            writable: true
        });

        var obj;
        if (options.arrows){
            options.arrows.forEach(function(options){
                obj = new APP.objects.ArrowVector(options);
                that.arrows.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.background){
            options.background.forEach(function(options){
                obj = new APP.objects.BackgroundRaster(options);
                that.background.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.curves){
            options.curves.forEach(function(options){
                obj = new APP.objects.CurveVector(options);
                that.curves.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.ellipses){
            options.ellipses.forEach(function(options){
                obj = new APP.objects.EllipseVector(options);
                that.ellipses.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.lines){
            options.lines.forEach(function(options){
                obj = new APP.objects.LineVector(options);
                that.lines.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.rects){
            options.rects.forEach(function(options){
                obj = new APP.objects.RectangleVector(options);
                that.rects.push(obj);
                that._objects[obj.id] = obj;
            });
        }
        if (options.rasters){
            options.rasters.forEach(function(options){
                obj = new APP.RasterRegion(options);
                that.rasters.push(obj);
                that._objects[obj.id] = obj;
            });
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

            switch (obj.constructor){
                case APP.objects.ArrowVector:
                    this.arrows.push(obj); break;

                case APP.objects.BackgroundRaster:
                    this.background.push(obj); break;

                case APP.objects.CurveVector:
                    this.curves.push(obj); break;

                case APP.objects.EllipseVector:
                    this.ellipses.push(obj); break;

                case APP.objects.LineVector:
                    this.lines.push(obj); break;

                case APP.objects.RectangleVector:
                    this.rects.push(obj); break;

                case APP.RasterRegion:
                    this.rasters.push(obj); break;

                default:
                    //
            }

            this._objects[obj.id] = obj;

            this.order.push(obj.id);
        },
        /**
         * Найти и удалить объект из списка
         * @param {RegionObject} obj — объект
         * @return {boolean} false, если объект не найден
         * */
        removeObject : function(obj){
            var index = this.order.indexOf(obj.id);
            var subIndex;
            switch (obj.constructor){
                case APP.objects.ArrowVector:
                    subIndex = this.arrows.indexOf(obj);
                    subIndex > 0 && this.arrows.splice(subIndex, 1); break;

                case APP.objects.BackgroundRaster:
                    subIndex = this.background.indexOf(obj);
                    subIndex > 0 && this.background.splice(subIndex, 1); break;

                case APP.objects.CurveVector:
                    subIndex = this.curves.indexOf(obj);
                    subIndex > 0 && this.curves.splice(subIndex, 1); break;

                case APP.objects.EllipseVector:
                    subIndex = this.ellipses.indexOf(obj);
                    subIndex > 0 && this.ellipses.splice(subIndex, 1); break;

                case APP.objects.LineVector:
                    subIndex = this.lines.indexOf(obj);
                    subIndex > 0 && this.lines.splice(subIndex, 1); break;

                case APP.objects.RectangleVector:
                    subIndex = this.rects.indexOf(obj);
                    subIndex > 0 && this.rects.splice(subIndex, 1); break;

                case APP.RasterRegion:
                    subIndex = this.rasters.indexOf(obj);
                    subIndex > 0 && this.rasters.splice(subIndex, 1); break;

                default:
                //
            }

            delete this._objects[obj.id];

            return (index !== -1) && !!this.order.splice(index, 1).length;
        },
        /**
         * Получить по индексу
         * @param {number} index — индекс обекта
         * @return {RegionObject}
         * */
        getObjectByIndex : function(index){
            return this._objects[this.order[index]];
        },
        /**
         * Получить индекс определенного объекта
         * @param {RegionObject} obj — объект
         * @return {number} индекс объекта
         * */
        getIndex : function(obj){
            var obj = this._objects[obj.id];
            return obj ? this.order.indexOf(obj.id) : false;
        },
        /**
         * Переместить объект в конец списка
         * @param {RegionObject} obj — объект
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
         * @return {RegionObject[]}
         **/
        getObjects : function(){
            var that = this;
            return this.order.map(function(id){
                return that._objects[id];
            });
        }
    }
}(APP);
