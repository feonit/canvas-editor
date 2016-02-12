function OptionsView(defaults){

    // hex
    this.color = '123456'; //default value
    this.width = 10; //default value

    this.nodeElement = null;
    var that = this;

    var wrapper = document.createElement('div');
    var colorComponent = InputColor(this.color);

    var label1 = document.createElement('label');

    var text = document.createElement('span');
    text.textContent = 'Изменить цвет для drawwingToll';
    label1.appendChild(text);
    label1.appendChild(colorComponent);

    wrapper.appendChild(label1);


    colorComponent.addEventListener("userSelectColor", function(data){
        that.color = data.detail.color;
    }, false);


    var label2 = document.createElement('label');
    var sliderComponent = InputSlider(5);
    var text2 = document.createElement('span');
    text2.textContent = 'Изменить толщину для drawwingToll';
    label2.appendChild(text2);
    label2.appendChild(sliderComponent);

    wrapper.appendChild(label2);


    sliderComponent.addEventListener("userSelectWidth", function(data){
        that.width = data.detail.width;
    }, false);

    this.nodeElement = wrapper;
}