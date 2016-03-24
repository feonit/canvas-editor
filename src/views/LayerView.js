!function(APP){
    APP.namespace('APP.views');
    var MathFn = APP.MathFn;
    /**
     * Отвечает за отображение информации
     * */
    APP.views.LayerView = function(options){
        options = options || {};
        this.height = options.height;
        this.width = options.width;
        this.color = options.color;
        this.borderCoordinates = options.borderCoordinates;

        var layer = document.createElement('canvas');
        layer.height = options.height;
        layer.width = options.width;

        this.layer = layer;
    };

    APP.views.LayerView.prototype.drawBorder = function(){
        if (this.__storedBorderImageData){
            this.layer.getContext('2d').putImageData(this.__storedBorderImageData, 0, 0);
            return;
        }

        this.__originalLayoutImageData = this.layer.getContext('2d').getImageData(0, 0, this.width, this.height);

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
        this.__storedBorderImageData = this.layer.getContext('2d').getImageData(0, 0, this.width, this.height);
    };

    APP.views.LayerView.prototype.eraserBorder = function(){
        this.layer.getContext('2d').clearRect(0, 0, this.width, this.height);
        this.layer.getContext('2d').putImageData(this.__originalLayoutImageData, 0, 0);
    };

}(APP);