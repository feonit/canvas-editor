function OptionsView(appInstance){

    this.nodeElement = null;

    var wrapper = document.createElement('div');
    wrapper.className = 'options-bar';
    var name = document.createElement('div');
    name.innerHTML = 'Options Bar';
    var label, text;

    var colorComponent = InputColorComponent(appInstance.options.drawingColor);
    label = document.createElement('label');
    text = document.createElement('span');
    text.innerHTML = 'Цвет:';
    label.appendChild(text);
    label.appendChild(colorComponent);
    wrapper.appendChild(label);


    var sliderComponent = InputSliderComponent(appInstance.options.drawingSize);
    label = document.createElement('label');
    text = document.createElement('span');
    text.innerHTML = 'Ширина: ';
    label.appendChild(text);
    label.appendChild(sliderComponent);
    wrapper.appendChild(label);



    sliderComponent.addEventListener("userSelectWidth", function(data){
        appInstance.options.drawingSize = data.detail.width;
    }, false);

    colorComponent.addEventListener("userSelectColor", function(data){
        appInstance.options.drawingColor = data.detail.color;
    }, false);

    this.nodeElement = wrapper;
}