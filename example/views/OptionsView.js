function OptionsView(appInstance){

    this.nodeElement = null;

    var wrapper = document.createElement('div');
    var colorComponent = InputColorComponent(appInstance.options.lineColor);

    var label1 = document.createElement('label');

    var text = document.createElement('span');
    text.textContent = 'Цвет:';
    label1.appendChild(text);
    label1.appendChild(colorComponent);

    wrapper.appendChild(label1);


    colorComponent.addEventListener("userSelectColor", function(data){
        //that.color = data.detail.color;

        appInstance.options.lineColor = data.detail.color;

    }, false);


    var label2 = document.createElement('label');
    var sliderComponent = InputSliderComponent(appInstance.options.lineWidth);
    var text2 = document.createElement('span');
    text2.textContent = 'Ширина: ';
    label2.appendChild(text2);
    label2.appendChild(sliderComponent);

    wrapper.appendChild(label2);


    sliderComponent.addEventListener("userSelectWidth", function(data){
        //that.width = data.detail.width;

        appInstance.options.lineWidth = data.detail.width;

    }, false);

    this.nodeElement = wrapper;
}