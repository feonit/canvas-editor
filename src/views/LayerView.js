!function(APP){
    APP.namespace('APP.views');
    var MathFn = APP.MathFn;
    /**
     * Класс Слой Вид. Отвечает за отображение информации о слое.
     * @memberof APP.views
     * @param {Object} attributes — атрибуты
     * @param {number} attributes.width — высота слоя
     * @param {number} attributes.height — длина слоя
     * @param {number[]} attributes.color — цвет объекта на слое
     * @param {number[]} attributes.borderCoordinates — координаты краевых точек объекта
     * */
    APP.views.LayerView = function(attributes){
        var layer = document.createElement('canvas');
        layer.height = attributes.height;
        layer.width = attributes.width;

        this.color = attributes.color;
        this.borderCoordinates = attributes.borderCoordinates;
        this.layer = layer;

        this.__originalLayoutImageData = null;
        this.__storedBorderImageData = null;
    };
    /**
     * Добавить обводку контуру
     * */
    APP.views.LayerView.prototype.drawBorder = function(){
        if (this.__storedBorderImageData){
            this.layer.getContext('2d').putImageData(this.__storedBorderImageData, 0, 0);
            return;
        }

        this.__originalLayoutImageData = this.layer.getContext('2d').getImageData(0, 0, this.layer.width, this.layer.height);

        // отрисовать бордер
        var imageData = this.layer.getContext('2d').createImageData(1, 1);
        for (var i=0, len = this.borderCoordinates.length; i < len; i++){
            var colorData = MathFn.getRandomColorData();

            imageData.data[0] = colorData[0];
            imageData.data[1] = colorData[1];
            imageData.data[2] = colorData[2];
            imageData.data[3] = colorData[3];

            this.layer.getContext('2d').putImageData(imageData, this.borderCoordinates[i][0], this.borderCoordinates[i][1]);
        }

        // сохраненная версия обводки для объекта
        this.__storedBorderImageData = this.layer.getContext('2d').getImageData(0, 0, this.layer.width, this.layer.height);
    };
    /**
     * Убрать обводку c контура
     * */
    APP.views.LayerView.prototype.eraserBorder = function(){
        this.layer.getContext('2d').clearRect(0, 0, this.layer.width, this.height);
        this.layer.getContext('2d').putImageData(this.__originalLayoutImageData, 0, 0);
    };
}(APP);